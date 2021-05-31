import { iBilling} from "lib/interface";
import React from "react";
import {useRouter} from 'next/router'
import { MdEdit, MdDoneAll, MdClose, MdDelete,MdCached } from 'react-icons/md';
import moment from 'moment';


import 'antd/dist/antd.css';
import { onlyDate } from "helpers/general";

type Props<iBilling> = {
    data: Array<iBilling>;
    onDelete:(id:string) => void;
}


const TableBilling = <T extends {}>(props: Props<iBilling>) => {
   
    const router = useRouter()
   
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full relative text-left border-gray-boder whitespace-no-wrap">
                <thead className="w-full border-b border-gray-boder">
                    <tr>
                        <th className="py-3 px-6 text-white font-sans font-normal">Tenant</th>
                        <th className="py-3 px-6 text-white font-sans font-normal">Periode</th>
                         <th className="py-3 px-6 text-white font-sans font-normal">Amount</th>
                        <th className="py-3 px-6 text-white font-sans font-normal">Status</th>
                        <th className="py-3 px-6 text-white font-sans font-normal">Due Date</th>
                        <th className="py-3 px-6 text-white font-sans font-normal">Created at</th>
                        <th className="py-3 px-6 text-white font-sans font-normal"></th>
                    </tr>
            </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                    {
                        props.data.length>0&&props.data.map((val:any, key) => {
                            return (
                                <tr key={key}>
                                    <td className="py-3 px-6 whitespace-nowrap font-sans font-normal">{val.tenant}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-sans font-normal">{val.period} month</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-sans font-normal text-right">{val.amount}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-sans font-normal">{val.status === 0 ? (
                                        <MdClose size={24} className="cursor-pointer" color={'#9E9E9E'}/>
                                    ) : (
                                        <MdDoneAll size={24} className="cursor-pointer" color={'#9E9E9E'}/>
                                    )}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-sans font-normal">{onlyDate(val.due_date)}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-sans font-normal">{onlyDate(val.created_at)}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-sans font-normal flex flex-row">
                                        <MdCached size={24} className="cursor-pointer" color={'#9E9E9E'} onClick={() => {
                                            router.push({ pathname: '/billing/detail', query: val, },'billing/edit')
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


export default TableBilling;