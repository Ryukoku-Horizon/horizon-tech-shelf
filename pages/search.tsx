import Layout from "@/components/Layout/Layout";
import SinglePost from "@/components/Post/SinglePost";
import Tags from "@/components/tag/Tags";
import { HOME_NAV, SEARCH_NAV } from "@/constants/pageNavs";
import { createSearchQuery, searchByKeyWord } from "@/lib/searchKeyWord";
import { getAllPosts, getAllTags } from "@/lib/services/notionApiService";
import { PostMetaData } from "@/types/postMetaData";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  allTags:string[];
  posts:PostMetaData[];
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts:PostMetaData[] = await getAllPosts();
  const allTags:string[] = await getAllTags(allPosts);
  return {
    props:{
      allTags,
      posts:allPosts,
    },
    revalidate:600
  }
}

export default function SearchPage({allTags, posts}:Props) {
  const [matchPosts, setMatchPosts] = useState<PostMetaData[]>(posts);
  const router = useRouter();
  const query = router.query.search!==undefined ? router.query.search as string : undefined;
  useEffect(()=>{
    if(query!==undefined){
      const searchKeyWords = createSearchQuery(query);
      const result = searchByKeyWord(searchKeyWords,posts);
      setMatchPosts(result);
    }
  },[])
  
  return (
    <Layout headerProps={{pageNavs:[HOME_NAV,SEARCH_NAV],searchKeyWord:query,allTags}}>
      <div className="pt-20">
        <main className="w-full mt-16 px-8">
          <div>
            <Tags allTags={allTags} />
            {matchPosts.length!==0 && matchPosts.map((post,i)=>
              <SinglePost postData={post} isPagenationPage={false} key={i} />
            )}
            {matchPosts.length===0 && <div className="text-xl">カリキュラムが見つかりませんでした</div>}
          </div>
        </main>
      </div>
    </Layout>
  );
}
