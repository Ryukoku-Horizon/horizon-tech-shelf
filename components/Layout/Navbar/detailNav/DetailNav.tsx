import { pageNav } from '@/types/pageNav';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

type Props ={
  pageNav:pageNav[];
}

function DetailNav({pageNav}:Props) {
  const [isVisible, setIsVisible] = useState(false); 
  const toggleRef = useRef<HTMLDivElement>(null); // toggle要素への参照
  const toggleTargetRef = useRef<HTMLDivElement>(null); // toggleTarget要素への参照

  // ドキュメント全体のクリックを監視
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        toggleTargetRef.current &&
        !toggleTargetRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={toggleRef} className='mr-2 px-1 hover:bg-neutral-200'>
        <button onClick={(event) => {
                event.stopPropagation(); 
                setIsVisible((prev) => !prev); 
              }}
              className='text-neutral-500'>
          ...
        </button>
      </div>
      {isVisible && (
          <div
            id="toggleTarget" ref={toggleTargetRef}
            className="absolute bg-white p-2 rounded-xl translate-y-[45%] translate-x-[40%] shadow-2xl">
            {pageNav.map((nav,i)=>(
              <Link href={nav.id} className='z-50' key={i}>
                <p className='hover:bg-neutral-200 text-neutral-500 text-sm'>{nav.title}</p>
              </Link>
            ))}
        </div>)}
    </>
  )
}

export default DetailNav