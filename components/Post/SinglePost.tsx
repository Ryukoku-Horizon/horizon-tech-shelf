import React from 'react';
import { PostMetaData } from "@/types/postMetaData";
import Link from 'next/link';
import Image from 'next/image';
import { tagStyle } from '@/styles/tag/tagStyle';

type Props = {
    postData:PostMetaData;
    isPagenationPage:boolean;
}

const SinglePost = (props:Props) => {
    const {title, tags, slug, icon} = props.postData;
    const isPagenationPage = props.isPagenationPage;
    return (
        <Link href={`/posts/post/${slug}`}>
            {isPagenationPage ? (
                <section className='bg-slate-50 mb-4 rounded-md p-3 shadow-2xl hover:shadow-none hover:translate-y-1 hover:bg-neutral-100 transition-all duration-300'>
                    <div className='flex w-auto h-9 my-1'>
                        {icon!=='' && <Image src={icon} alt={title} width={20} height={20} className='relative w-8 h-auto m-0 mr-1 bottom-1' />}
                        <h2 className='text-xl font-medium mb-2'>
                            {title}
                        </h2>
                    </div>
                    {tags.map((tag, i:number)=>(
                        <span style={tagStyle} key={i}>
                            {tag}
                        </span>
                    ))}
                </section>
            ) : (
                <section className='bg-slate-50 mb-4 mx-auto rounded-md p-3 shadow-2xl hover:shadow-none hover:translate-y-1 hover:bg-neutral-100 transition-all duration-300'>
                    <div className='flex w-auto h-9 my-1'>
                    {icon!=='' && <Image src={icon} alt={title} width={20} height={20} className='w-9 h-auto m-0 mr-1 relative bottom-1' />}
                        <h2 className='text-xl font-medium mb-2 mr-1'>
                            {title}
                        </h2>
                    </div>
                    {tags.map((tag, i:number)=>(
                        <span style={tagStyle} key={i}>
                            {tag}
                        </span>
                    ))}
                </section>
            )}
        </Link>
    )
}

export default SinglePost