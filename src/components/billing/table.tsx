import { iBilling} from "lib/interface";
import React from "react";
import {useRouter} from 'next/router'
import {  MdDoneAll, MdClose, MdNotInterested,MdCached } from 'react-icons/md';


import 'antd/dist/antd.css';
import { onlyDate, toCurrency } from "helpers/general";

type Props<iBilling> = {
    data: Array<iBilling>;
    totalAmount: string;
    onDelete:(id:string) => void;
}


const TableBilling = (props: Props<iBilling>) => {
    
    const router = useRouter()
    let totAmounPerPage = 0;
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full relative text-left border-gray-boder whitespace-no-wrap">
                <thead className="w-full border-b border-gray-boder">
                    <tr>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} className="py-3 px-6 text-white font-normal">Tenant</th>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} className="py-3 px-6 text-white font-normal">Periode</th>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} className="py-3 px-6 text-white font-normal">Amount</th>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} className="py-3 px-6 text-white font-normal">Status</th>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} className="py-3 px-6 text-white font-normal">Due Date</th>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} className="py-3 px-6 text-white font-normal" colSpan={2}>Created at</th>
                        {/* <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} className="py-3 px-6 text-white font-normal"></th> */}
                    </tr>
            </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                    {
                        props.data.length > 0 && props.data.map((val: any, key) => {
                            totAmounPerPage = totAmounPerPage+parseInt(val.amount,10);
                            return (
                                <tr key={key}>
                                    <td className="py-3 px-6 whitespace-nowrap font-normal">{val.tenant}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-normal">{val.period} month</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-normal text-right">{toCurrency(val.amount)}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-normal">{val.status === 0 ? (
                                        <MdClose size={24} className="cursor-pointer" color={'#9E9E9E'}/>
                                    ) : (
                                        <MdDoneAll size={24} className="cursor-pointer" color={'#9E9E9E'}/>
                                    )}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-normal">{onlyDate(val.due_date)}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-normal">{onlyDate(val.created_at)}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-normal flex flex-row">
                                        <MdCached size={24} className="cursor-pointer mr-2" color={'#9E9E9E'} onClick={() => {
                                            router.push({ pathname: '/billing/detail', query: val, },'billing/edit')
                                        }} />
                                        <MdNotInterested size={24} className="cursor-pointer" color={'#9E9E9E'} onClick={()=>props.onDelete(val.id)} />
                                        
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
                <tfoot className="w-full border-b border-gray-boder">
                    <tr>
                        <th className="py-3 px-6 whitespace-nowrap font-normal text-white" colSpan={2}>Total Per Page</th>
                        <th className="py-3 px-6 whitespace-nowrap font-normal text-white text-right">{toCurrency(totAmounPerPage.toString())}</th>
                        <th className="py-3 px-6 whitespace-nowrap font-normal text-white" colSpan={4}/>
                    </tr>
                    <tr>
                        <th className="py-3 px-6 whitespace-nowrap font-normal text-white" colSpan={2}>Total All Page</th>
                        <th className="py-3 px-6 whitespace-nowrap font-normal text-white text-right">{toCurrency(props.totalAmount)}</th>
                        <th className="py-3 px-6 whitespace-nowrap font-normal text-white" colSpan={4}/>
                    </tr>
                </tfoot>
            </table>
        </div>
                       
    );
}


export default TableBilling;