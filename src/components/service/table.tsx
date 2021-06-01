import { iService} from "lib/interface";
import React from "react";
import { MdEdit,  MdDelete } from 'react-icons/md';
import Router from 'next/router'

import 'antd/dist/antd.css';

type Props<iTenant> = {
    data: Array<iTenant>;
    onDelete:(id:string) => void;
}


const TableService = (props: Props<iService>) => {
 
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full relative text-left border-gray-boder whitespace-no-wrap">
                <thead className="w-full border-b border-gray-boder">
                    <tr>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} className="py-3 px-6 text-white font-normal">Title</th>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} className="py-3 px-6 text-white font-normal">#</th>
                    </tr>
            </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                    {
                        props.data.length > 0 && props.data.map((val:any, key) => {
                            return (
                                <tr key={key}>
                                    <td className="cursor-pointer py-3 px-6 whitespace-nowrap font-normal">{val.title}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-normal flex flex-row">
                                        <MdEdit size={24} className="cursor-pointer" color={'#9E9E9E'} onClick={() => {
                                            Router.push(
                                                {
                                                    pathname: '/service/form',
                                                    query: val,
                                                },
                                                'service/edit'
                                            )
                                        }} />
                                        <MdDelete size={24} className="cursor-pointer ml-2" color={'#9E9E9E'} onClick={() => {
                                            props.onDelete(val.id);
                                        }} />
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>

            </table>
        </div>
                       
    );
}


export default TableService;