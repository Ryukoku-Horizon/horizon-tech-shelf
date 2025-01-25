import UserIcon from '@/components/Layout/Header/UserInfo/userIcon';
import Link from 'next/link';
import React from 'react'
import SearchField from './searchField/searchField';
import HamburgerButton from './hamburgerButton./hamburgerButton';

type Props={
    searchKeyWord?:string;
    setOpenbar:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({searchKeyWord,setOpenbar}:Props){
    
  return (
    <header className='w-full pb-1 bg-white'>
        <div className=" text-white px-5 mb-0 flex justify-between items-center">
            <Link href="/posts" className="text-2xl mt-3 mb-0 font-medium text-neutral-400 rounded-md">
                HorizonAtlas
            </Link>
            <ul className="hidden md:flex items-center text-sm pt-2 duration-100">
                <li className="mr-4">
                    <SearchField searchKeyWord={searchKeyWord || ''} />
                </li>
                <li>
                    <UserIcon />
                </li>
            </ul>
            <ul className='flex md:hidden items-center text-sm pt-2'>
                <li>
                    <HamburgerButton setOpenSide={setOpenbar} />
                </li>
            </ul>
        </div>
        {/* <div className='block sm:hidden mt-0 px-5 w-full'>
            <SearchField searchKeyWord={searchKeyWord || ''} />
        </div> */}
    </header>
  )
}
