import { iService, iTenant } from "lib/interface";
import React, { useState, useEffect } from "react";
import { MdEdit, MdDoneAll, MdClose, MdDelete } from 'react-icons/md';
import Router, { withRouter } from 'next/router'

import 'antd/dist/antd.css';

type Props<iTenant> = {
    data: Array<iTenant>;
    onDelete:(id:string) => void;
}


const TableService = <T extends {}>(props: Props<iService>) => {
 
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full relative text-left border-gray-boder whitespace-no-wrap">
                <thead className="w-full border-b border-gray-boder">
                    <tr>
                        <th className="py-3 px-6 text-white font-sans font-normal">Title</th>
                        <th className="py-3 px-6 text-white font-sans font-normal">#</th>
                    </tr>
            </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                    {
                        props.data.length > 0 && props.data.map((val:any, key) => {
                            return (
                                <tr key={key}>
                                    <td className="cursor-pointer py-3 px-6 whitespace-nowrap font-sans font-normal">{val.title}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-sans font-normal flex flex-row">
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