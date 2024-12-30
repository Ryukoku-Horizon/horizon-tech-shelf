import Navbar from '@/components/Navbar/navbar';
import MdBlockComponent from '@/components/mdBlocks/mdBlock';
import { BASIC_NAV, HOME_NAV } from '@/constants/pageNavs';
import { getAllPosts, getSinglePost } from '@/lib/dataAccess/notionApiGateway';
import { pageNav } from '@/types/pageNav';
import { PostMetaData } from '@/types/postMetaData';
import { GetStaticProps } from 'next';
import { MdBlock } from 'notion-to-md/build/types';
import React from 'react';

type Props = {
  mdBlocks:MdBlock[];
  pageNavs:pageNav[];
};

type pagePath = {
  params: { slug:string, childId:string[] }
}

export const getStaticPaths = async () => {
  const allPosts: PostMetaData[] = await getAllPosts();
  const paths: pagePath[] = (
    await Promise.all(
      allPosts.map(async (post) => {
        const postData = await getSinglePost(post.slug);
        const childPages = postData.mdBlocks.filter((block)=>block.type==='child_page')
        return childPages.map((child) => ({
          params: {
            slug: post.slug,
            childId: [child.blockId],
          },
        }));
      })
    )
  ).flat();

  return {
    paths,
    fallback: 'blocking', // ISRを有効化
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
    const currentSlug = context.params?.slug as string;
    const childparam = (context.params?.childId as string[]) || [];
    const post = await getSinglePost(currentSlug);

    let currentchild = post.mdBlocks;
    const pageNavs:pageNav[] = post.metadata.is_basic_curriculum ?
      [HOME_NAV,BASIC_NAV,{title:post.metadata.course,id:`/posts/course/${post.metadata.course}/1`,child:false},{title:post.metadata.title,id:post.metadata.slug,child:true}]
      : [HOME_NAV,{title:post.metadata.course,id:`/posts/course/${post.metadata.course}/1`,child:false},{title:post.metadata.title,id:post.metadata.slug,child:true}];
    for (let i = 0; i < childparam.length; i++) {
        const childpages = currentchild.filter((block)=>block.type==='child_page');
        const child = childpages.filter((block)=>block.blockId===childparam[i]);
        if(child[0]!==undefined){
            pageNavs.push({title:child[0].parent.replace("## ",""), id:child[0].blockId,child:true});
            currentchild = child[0].children;
        }
    }

    return {
        props: {
            mdBlocks:currentchild,
            pageNavs
        },
        revalidate: 50, // ISR
    };
};

const PostChildPage = ( props : Props) => {
    const {mdBlocks, pageNavs} = props;
    return (
        <>
            <Navbar pageNavs={pageNavs} />
            <section className="container lg:px-10 px-20 mx-auto my-20">
                <h2 className='my-2 font-bold text-3xl'>{pageNavs[pageNavs.length - 1].title}</h2>
                <div>
                    {mdBlocks.map((mdBlock, i)=>(
                        <MdBlockComponent mdBlock={mdBlock} depth={0} key={i} />
                    ))}
                </div>
            </section>
        </>
    );
};
export default PostChildPage;