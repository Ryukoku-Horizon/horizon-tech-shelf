import { pageNav } from '@/types/pageNav';
import Link from 'next/link';
import React from 'react';
import DetailNav from './detailNav/DetailNav';

type Props ={
    pageNavs:pageNav[];
}

function Navbar(props:Props) {
    const {pageNavs} = props;

    return (
        <>
            <nav className='pl-4 bg-white duration-100 pt-1'>
                {pageNavs.length>3 && <div className='flex'>
                    {/* {setOpenSide && openSide!==undefined && <div className='md:hidden relative top-1 mr-4'>
                        <HamburgerButton setOpenSide={setOpenSide} />
                    </div>} */}
                    <div className='flex'>
                        <Link href={pageNavs[0].id} className='pr-2 hover:bg-neutral-200 text-neutral-500'>
                            {pageNavs[0].title}
                        </Link>
                        <p className='cursor-default text-neutral-500'>/</p>
                        <DetailNav pageNav={pageNavs.slice(1,-2)} />
                        <p className='cursor-default text-neutral-500'>/</p>
                        <Link href={pageNavs[pageNavs.length - 2].id} className='px-2 hover:bg-neutral-200 text-neutral-500'>
                            {pageNavs[pageNavs.length - 2].title.slice(0,8)}
                            {pageNavs[pageNavs.length - 2].title.length>8 &&<span>...</span>}
                        </Link>
                        <p className='cursor-default text-neutral-500'>/</p>
                        <Link href={pageNavs[pageNavs.length - 1].id} className='px-2 hover:bg-neutral-200 text-neutral-500'>
                            {pageNavs[pageNavs.length - 1].title.slice(0,8)}
                            {pageNavs[pageNavs.length - 1].title.length>8 &&<span>...</span>}
                        </Link>
                    </div>
                </div>}
                {pageNavs.length<=3 && <div className='flex'>
                    {pageNavs.map((nav, i)=>(
                        <div className='flex gap-1.5' key={i}>
                            <Link href={nav.id} className='px-2 hover:bg-neutral-200 text-neutral-500'>
                                {nav.title.slice(0,9)}
                                {nav.title.length>9 &&<span>...</span>}
                            </Link>
                            {i + 1<pageNavs.length && <p className='cursor-default text-neutral-500'>/</p>}
                        </div>
                        )
                    )}
                </div>}
            </nav>
        </>
    )
}

export default Navbar;