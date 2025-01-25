import { MdBlock } from 'notion-to-md/build/types';
import React, { useState } from 'react';
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/default-highlight';
import { LuCopy } from "react-icons/lu";
import { IoCopy } from "react-icons/io5";

type Props = {
    mdBlock: MdBlock;
    depth: number;
};

export default function Code(props: Props) {
    const { mdBlock } = props;
    const codeBlocks: string[] = mdBlock.parent.split('\n');
    let codeContent = '';
    for (let i = 1; i < codeBlocks.length - 1; i++) {
        codeContent += (i === 1 ? '' : '\n') + codeBlocks[i];
    }
    const language: string = codeBlocks[0].slice(3);

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // コピー状態を2秒後にリセット
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <div className='mb-2 mt-2 relative'>
            <div className='mb-0' style={{backgroundColor:"rgb(250,250,250)"}}>
                <p>
                    <span className='text-neutral-600 text-sm px-3 py-1 rounded' style={{background: "rgb(235, 235, 235)"}}>{language}</span>
                </p>
                <button
                    onClick={handleCopy}
                    className={'h-5 absolute top-1 right-2 px-2 text-sm rounded text-neutral-400 hover:text-neutral-500'}
                >
                    {copied ? <span className='flex'>copied ! <IoCopy size={24} /></span> : <LuCopy size={24} />}
                </button>
            </div>
            
            <SyntaxHighlighter style={atomOneLight} language={language}>
                {String(codeContent).replace(/\n$/, '')}
            </SyntaxHighlighter>
        </div>
    );
}
