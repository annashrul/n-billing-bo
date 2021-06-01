

import React from 'react'
import Link from 'next/link'

interface iWidget{
    title: string;
    link: string;
    icon: JSX.Element;
    isActive: boolean;
}

const Widget: React.FC<iWidget> = ({ title, link, icon, isActive }) => {
    const gaya=isActive?
                "inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                :"inline-flex items-center w-full text-sm font-semibold text-gray-400 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
    const target=title==="Unduh MoU"?'_blank':'_self';

    return (
        <li className="relative px-6 py-3">
            {isActive&&<span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true" />}
            <Link href={link}>
                <a className={gaya} target={target}>
                    {icon}
                    <span className="ml-4 ">{title}</span>
                </a>
            </Link>
        </li>
    );
}

export default Widget;

// NESTED

//  <li className="relative px-6 py-3">
//     <button className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"  aria-haspopup="true">
//     <span className="inline-flex items-center">
//         <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
//         <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
//         </svg>
//         <span className="ml-4">Pages</span>
//     </span>
//     <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
//         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//     </svg>
//     </button>
//     <template x-if="isPagesMenuOpen" />
// </li>