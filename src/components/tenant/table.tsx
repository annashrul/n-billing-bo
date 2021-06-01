import { iTenant } from "lib/interface";
import React, { useState} from "react";
import {useRouter} from 'next/router'
import { MdEdit,MdDoneAll,MdClose,MdDelete } from 'react-icons/md';
import 'antd/dist/antd.css';
import { Drawer, Button} from 'antd';


type Props<iTenant> = {
    data: Array<iTenant>;
    onDelete:(id:string) => void;
}

const tempDetail = (title:string, desc:any) => {
    return (
         <tr>
            <th className="py-2 font-normal" style={{width:"30%"}}>{title}</th>
            <th className="py-2 font-normal ">:</th>
            <th className="py-2 font-normal">{desc}</th>
        </tr>
    );
}

const TableTenant = (props: Props<iTenant>) => {
    const [visible,setVisible]= useState<boolean>(false);
    const [idx,setIdx]= useState<number>(0);
    const router = useRouter()
   
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full relative text-left border-gray-boder whitespace-no-wrap">
                <thead className="w-full border-b border-gray-boder">
                    <tr>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} rowSpan={2} className="py-3 px-6 text-white font-normal">Tenant</th>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} rowSpan={2} className="py-3 px-6 text-white font-normal">Service</th>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} rowSpan={2} className="py-3 px-6 text-white font-normal">Server name</th>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} rowSpan={2} className="py-3 px-6 text-white font-normal">Monthly billing</th>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} rowSpan={2} className="py-3 px-6 text-white font-normal">Billing active</th>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} colSpan={2} className="py-3 px-6 text-white font-normal text-center">Storage</th>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} rowSpan={2} className="py-3 px-6 text-white font-normal text-center">#</th>
                    </tr>
                    <tr>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} className="py-3 px-6 text-white font-normal">Folder</th>
                        <th style={{border:"1px solid rgba(26, 28, 35, 1)"}} className="py-3 px-6 text-white font-normal">Database</th>
                    </tr>
            </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                    {
                        props.data.length>0&&props.data.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td onClick={()=>{setIdx(key);setVisible(true)} } className="cursor-pointer py-3 px-6 whitespace-nowrap font-normal">{val.title}</td>
                                    <td onClick={()=>{setIdx(key);setVisible(true)} } className="cursor-pointer py-3 px-6 whitespace-nowrap font-normal">{val.service}</td>
                                    <td onClick={()=>{setIdx(key);setVisible(true)} } className="cursor-pointer py-3 px-6 whitespace-nowrap font-normal">{val.server_name}</td>
                                    <td onClick={() => { setIdx(key); setVisible(true) }} className="cursor-pointer py-3 px-6 whitespace-nowrap font-normal">{val.monthly_billing === 0 ? (
                                        <MdClose size={24} className="cursor-pointer" color={'#9E9E9E'}/>
                                    ) : (
                                        <MdDoneAll size={24} className="cursor-pointer" color={'#9E9E9E'}/>
                                    )}</td>
                                    <td onClick={()=>{setIdx(key);setVisible(true)} } className="cursor-pointer py-3 px-6 whitespace-nowrap font-normal">{val.billing_active}</td>
                                    <td onClick={()=>{setIdx(key);setVisible(true)} } className="cursor-pointer py-3 px-6 whitespace-nowrap font-normal">{val.storage_used}</td>
                                    <td onClick={()=>{setIdx(key);setVisible(true)} } className="cursor-pointer py-3 px-6 whitespace-nowrap font-normal">{val.usage_db}</td>
                                    <td className="py-3 px-6 whitespace-nowrap font-normal flex flex-row">
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
                title={props.data[idx].title}
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
            <h1 className="text-lg font-bold">Contact detail</h1>
            <table className="w-full relative text-left whitespace-no-wrap">
                <thead className="w-full ">
                    {tempDetail('responsible', props.data[idx].responsible)}
                    {tempDetail('Phone number', props.data[idx].telp)}
                    {tempDetail('Email', props.data[idx].email)}
                    {tempDetail('Address', props.data[idx].address)}
                </thead>
                <thead className="w-full "><tr><th colSpan={3}><hr/></th></tr></thead>
                <h1 className="w-full text-lg font-bold">Service detail</h1>
                <thead className="w-full">
                    {tempDetail('Service', props.data[idx].service)}
                    {tempDetail('Server name', props.data[idx].server_name)}
                    {tempDetail('Databases', props.data[idx].databases)}
                    {tempDetail('Monthly billing',props.data[idx].monthly_billing===0?(<MdClose size={24} className="cursor-pointer" color={'#9E9E9E'}/>):( <MdDoneAll size={24} className="cursor-pointer" color={'#9E9E9E'}/>))}
                    {tempDetail('Billing active', props.data[idx].billing_active)}
                    {tempDetail('Api',props.data[idx].api)}
                    {tempDetail('Back office',props.data[idx].backoffice)}
                    {tempDetail('Front end', props.data[idx].frontend)}
                        </thead>
                       <thead className="w-full "><tr><th colSpan={3}><hr/></th></tr></thead>
                        <h1 className="w-full text-lg font-bold">Usage detail</h1>
                <thead className="w-full">
                    {tempDetail('Folder', props.data[idx].storage_used)}
                    {tempDetail('Database', props.data[idx].usage_db)}
                        </thead>
                        <thead className="w-full "><tr><th colSpan={3}><hr/></th></tr></thead>
            </table>
            <h1 className="text-lg font-bold">Note</h1>
            <div dangerouslySetInnerHTML={{ __html: props.data[idx].note.replace(/\n/g, '<br/>')}}></div>
        </Drawer>
            }
       
        </div>
                       
    );
}


export default TableTenant;