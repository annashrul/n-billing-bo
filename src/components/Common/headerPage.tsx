import React from "react";
import {useRouter} from 'next/router'

type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    pathForm:string;
}


const HeaderPage = (props: Props) => {
     const router = useRouter()
    
    return (
        <div className="flex flex-row justify-between mb-2">
            <div className="flex relative w-72">
                <input 
                    type="search"
                    className="dark:border-gray-600 dark:bg-gray-700 focus:outline-none dark:text-gray-300 w-full rounded px-3 py-2.5" 
                    placeholder="Search"
                    onChange={props.onChange}/>
            </div>
            <div className="flex items-center ">
                <button className="rounded text-white bg-yellow-400 font-medium bg-orange1-main hover:bg-yellow-400 px-3 py-2.5" onClick={() => router.push({pathname:`/${props.pathForm}/form`,query: { keyword: 'add' }},`${props.pathForm}/add`)}>Add {props.pathForm}</button>
            </div>
        </div>
    );
}


export default HeaderPage;