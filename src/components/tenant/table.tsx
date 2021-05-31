import { iTenant } from "lib/interface";
import React, { useState, useEffect } from "react";
import {useRouter} from 'next/router'
import { MdEdit,MdDoneAll,MdClose,MdDelete } from 'react-icons/md';
import 'antd/dist/antd.css';
import { Drawer, Button} from 'antd';
import { handleDelete } from "lib/handleAction";
import Api from 'lib/httpService';

type Props<iTenant> = {
    data: Array<iTenant>;
    onDelete:(id:string) => void;
}

const tempDetail = (title:string, desc:any) => {
    return (
         <tr>
            <th className="py-2 font-sans font-normal">{title}</th>
            <th className="py-2 font-sans font-normal">:</th>
            <th className="py-2 font-sans font-normal">{desc}</th>
        </tr>
    );
}

const TableTenant = <T extends {}>(props: Props<iTenant>) => {
    const [visible,setVisible]= useState<boolean>(false);
    const [idx,setIdx]= useState<number>(0);
    const router = useRouter()
    
    // const deleted = async (id: string) => {
    //     await handleDelete(Api.apiClient + 'management/tenant/' + id);
    //     // const history = useRouter();
    //     history.push('/tenant');
    // }
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full relative text-left border-gray-boder whitespace-no-wrap">
                <thead className="w-full border-b border-gray-boder">
                    <tr>
                        <th className="py-3 px-6 text-white font-sans font-normal">Tenant</th>
                        <th className="py-3 px-6 text-white font-sans font-normal">Service</th>
                        <th className="py-3 px-6 text-white font-sans font-normal">Monthly billing</th>
                         <th className="py-3 px-6 text-white font-sans font-normal">Phone number</th>
                        <th className="py-3 px-6 text-white font-sans font-normal">Email</th>
                        <th className="py-3 px-6 text-white font-sans font-normal">Responsible</th>
                        <th className="py-3 px-6 text-white font-sans font-normal">#</th>
                    </tr>
            </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                    {
                        props.data.length>0&&props.data.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td onClick={()=>{setIdx(key);setVisible(true)} } className="cursor-pointer py-3 px-6 whitespace-nowrap font-sans font-normal">{val.title}</td>
                                    <td onClick={()=>{setIdx(key);setVisible(true)} } className="cursor-pointer py-3 px-6 whitespace-nowrap font-sans font-normal">{val.service}</td>
                                    <td onClick={() => { setIdx(key); setVisible(true) }} className="cursor-pointer py-3 px-6 whitespace-nowrap font-sans font-normal">{val.monthly_billing === 0 ? (
                                        <MdClose size={24} className="cursor-pointer" color={'#9E9E9E'}/>
                                    ) : (
                                        <MdDoneAll size={24} className="cursor-pointer" color={'#9E9E9E'}/>
                                    )}</td>
                                    <td onClick={()=>{setIdx(key);setVisible(true)} } className="cursor-pointer py-3 px-6 whitespace-nowrap font-sans font-normal">{val.telp}</td>
                                    <td onClick={()=>{setIdx(key);setVisible(true)} } className="cursor-pointer py-3 px-6 whitespace-nowrap font-sans font-normal">{val.email}</td>
                                    <td onClick={()=>{setIdx(key);setVisible(true)} } className="cursor-pointer py-3 px-6 whitespace-nowrap font-sans font-normal">{val.responsible}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-sans font-normal flex flex-row">
                                        <MdEdit size={24} className="cursor-pointer" color={'#9E9E9E'} onClick={() => {
                                            router.push({ pathname: '/tenant/form', query: { keyword: val.id }, },'tenant/edit')
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
            {

             props.data.length>0&&<Drawer
                title={`Detail Tenant ${props.data[idx].title}`}
                // title={`Detail Tenant`}
                width={720}
                placement={'right'}
                closable={false}
                onClose={()=>setVisible(false)}
                visible={visible}
                key={'right'}
                bodyStyle={{ paddingBottom: 80 }}

                footer={
            <div style={{textAlign: 'right'}} >
            <Button onClick={() => { setVisible(false);}} style={{ marginRight: 8 }}>
                Close
              </Button>
            </div>
          }
            >
            <table className="w-full relative text-left border-gray-boder whitespace-no-wrap">
                <thead className="w-full border-b border-gray-boder">
                    {tempDetail('Service', props.data[idx].title)}
                    {tempDetail('Storage', props.data[idx].storage_used)}
                    {tempDetail('Monthly billing',props.data[idx].monthly_billing===0?(<MdClose size={24} className="cursor-pointer" color={'#9E9E9E'}/>):( <MdDoneAll size={24} className="cursor-pointer" color={'#9E9E9E'}/>))}
                    {tempDetail('Phone number',props.data[idx].telp)}
                    {tempDetail('Email',props.data[idx].email)}
                    {tempDetail('Responsible',props.data[idx].responsible)}
                    {tempDetail('Api',props.data[idx].api)}
                    {tempDetail('Back office',props.data[idx].backoffice)}
                    {tempDetail('Front end',props.data[idx].frontend)}
                    {tempDetail('Server name',props.data[idx].server_name)}
                    {tempDetail('Address',props.data[idx].address)}
                </thead>
                    </table>
                    <div dangerouslySetInnerHTML={{ __html: props.data[idx].note.replace(/\n/g, '<br/>')}}></div>
        </Drawer>
            }
       
        </div>
                       
    );
}


export default TableTenant;