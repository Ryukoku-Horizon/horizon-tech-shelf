import Link from 'next/link';
import { MdBlock } from 'notion-to-md/build/types';
import React, { useEffect, useState } from 'react';

type Props = {
  mdBlock: MdBlock;
  depth: number;
};

type ogImage = {
  url?: string;
  type?: string;
};
  
type ogData = {
    ogUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogSiteName?: string;
    ogImage?: ogImage[];
    favicon?:string;
};

export default function Bookmark(props: Props) {
  const { mdBlock } = props;
  const match = mdBlock.parent.match(/\((.*?)\)/g);
  const [ogpData, setOgpData] = useState<ogData>();

  useEffect(() => {
    const fetchOgpData = async () => {
      if (match) {
        const url = match[0].slice(1, -1);
        console.log("url",url);
        const res = await fetch(`/api/getOgp?url=${url}`);
        if(res.ok){
            const {result} = await res.json();
            const { ogUrl,ogTitle,ogDescription,ogSiteName,ogImage, favicon } = result;
            const ogData = {ogUrl, ogTitle, ogDescription, ogSiteName, ogImage, favicon};
            setOgpData(ogData);
        }
        }
    };
    fetchOgpData();
  }, []);

    if (!match) {
        return null;
    }

  return (
    <div className="my-2 rounded-sm border-2 border-neutral-200 hover:bg-neutral-100">
        {ogpData !==undefined && (
            <Link href={ogpData.ogUrl || match[0].slice(1, -1)}>
                <div className="flex">
                    <div className='m-3'>
                        <p className='text-neutral-800 line-clamp-1'>{ogpData.ogTitle}</p>
                        <p className='text-neutral-500 text-sm line-clamp-2'>{ogpData.ogDescription}</p>
                        <div className='flex mb-0 mt-2'>
                            {ogpData.favicon!==undefined && 
                              <img src={ogpData.favicon} className='w-auto max-h-4 rounded-full m-0 mr-2' alt={'pageIcon'} />}
                            <span className='text-neutral-600 text-xs line-clamp-1'>
                              {ogpData.ogUrl!==undefined ? ogpData.ogUrl : match[0].slice(1, -1) }
                            </span>
                        </div>
                    </div>
                    {ogpData.ogImage !==undefined && ogpData.ogImage[0].url!==undefined && (
                    <div className='p-0 m-0' style={{ lineHeight: 0 }}>
                        <img src={ogpData.ogImage[0].url} className='w-96 h-28 rounded-sm lg:w-72' alt={'pageImage'} />
                    </div>
                    )}
                </div>
            </Link>
        )}
    </div>
  );
}
