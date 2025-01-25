import React, { useState } from 'react'
import {IoIosSearch} from 'react-icons/io'
import router from 'next/router'

type Props={
    searchKeyWord:string;
}

function SearchField({searchKeyWord}:Props) {
    const [keyWord, setKeyWord] = useState<string>(searchKeyWord);
    const [isComposing, setIsComposing] = useState<boolean>(false);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (isComposing) {
            return;
          }
        if (event.key === 'Enter') {
          router.push({pathname:"/search", query:{search:keyWord}});
        }
      };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyWord(event.target.value);
    };
    const handleButton =()=>{
        router.push({pathname:"/search",query:{search:keyWord}})
    }

    return (
        <section className="flex bg-white rounded-md mt-1" >
            <input
                value={keyWord}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                type="text"
                className="w-full py-1 rounded text-neutral-600 bg-neutral-100 px-2 focus:outline-none focus:bg-slate-100 duration-300"
                placeholder="キーワードで検索"/>
            <button onClick={handleButton}>
                <IoIosSearch size={25} className='text-white bg-neutral-300 w-10 h-8 rounded-r py-0.5' />
            </button>
        </section>
    )
}

export default SearchField;