import { MdBlock } from 'notion-to-md/build/types';
import React from 'react';
import Image from 'next/image';

type Props={
    mdBlock:MdBlock
    depth:number
}

export default function ImageBlock(props:Props) {
    const {mdBlock} = props;
    const match = mdBlock.parent.match(/\!\[([^\]]+)\]\(([^\)]+\))/);
      if(match){
        const url = match[2][-1]==')' ? match[2].slice(0,-1) : match[2];
        return (
            <div>
                <Image height={400} width={400} src={url.slice(0,-1)} alt={'image_block'} style={{
                        width: 'auto',
                        height: '100%',
                        display: 'block', 
                        maxHeight:'400px'
                    }} />
            </div>
        )
      }
}
