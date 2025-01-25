import { tagStyle } from '@/styles/tag/tagStyle';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Props = {
    allTags:string[];
}

function Tags(props:Props) {
  const [visible, setVisible] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if(window!==undefined){
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      // イベントリスナーを登録
      window.addEventListener('resize', handleResize);
  
      // 初期値を設定
      handleResize();
  
      // クリーンアップ関数
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

  }, []);

  const {allTags} = props;
  return (
      <section className='bg-slate-50 rounded-md p-5'>
          <div className='font-medium mb-4'>タグ検索</div>
          {!visible && <>
            <div className='flex flex-wrap gap-3'>
              {allTags.slice(0,Math.trunc(windowWidth / 100)).map((tag,i:number)=>(
                  <span className="cursor-pointer" style={tagStyle} key={i}>
                      <Link href={`/posts/tag/${tag}/1`}>{tag}</Link>
                  </span>
              ))}
            </div>
            {Math.trunc(windowWidth / 100) <allTags.length && <div className='flex justify-end'>
              <button className='text-neutral-500' onClick={()=>setVisible(true)}>view more...</button>
            </div>}
          </>}
          {visible && <>
            <div className='flex flex-wrap gap-3'>
              {allTags.map((tag,i:number)=>(
                  <span className="cursor-pointer" style={tagStyle} key={i}>
                      <Link href={`/posts/tag/${tag}/1`}>{tag}</Link>
                  </span>
              ))}
            </div>
            <div className='flex justify-end'>
              <button className='text-neutral-500' onClick={()=>setVisible(false)}>view less</button>
            </div>
          </>}
      </section>
  )
}

export default Tags;
