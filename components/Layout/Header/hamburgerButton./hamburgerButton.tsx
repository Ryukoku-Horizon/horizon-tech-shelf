import React, { Dispatch, SetStateAction } from 'react'

type Props ={
  setOpenSide: Dispatch<SetStateAction<boolean>>;
}

function HamburgerButton({setOpenSide}:Props) {
  return (
    <>
      <button onClick={()=>setOpenSide(true)} 
      className="flex flex-col gap-1.5 w-7 h-7 mt-2"
      >
          <span className="border border-neutral-500 w-7"></span>
          <span className="border border-neutral-500 w-7"></span>
          <span className="border border-neutral-500 w-7"></span>
      </button>
    </>

  )
}

export default HamburgerButton;