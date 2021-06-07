import React, { useState, useEffect } from "react";
import Layout from 'Layouts'
import Helper from 'lib/helper';
import Api from 'lib/httpService';
import { NextPageContext } from 'next'
import { } from '@windmill/react-ui'
import nookies from 'nookies'
import {useRouter} from 'next/router'
import { handleDelete, handleGet } from "lib/handleAction";
import { iPagin, iTenant } from "lib/interface";
import PaginationQ from "helpers/pagination";
import TablePage from "components/Common/tablePage";
import { btnDelete, btnEdit, status, td } from "helpers/general";
import { Drawer} from 'antd';
import { isMobileOnly,isTablet } from 'react-device-detect';
import { MdClose } from "react-icons/md";
import parse from 'html-react-parser';
import 'antd/dist/antd.css';

const tempDetail = (title:string, desc:any) => {
    return (
         <tr>
            <th className="py-2 font-normal" style={{width:"30%"}}>{title}</th>
            <th className="py-2 font-normal ">:</th>
            <th className="py-2 font-normal">{desc}</th>
        </tr>
    );
}

const titleHeader = (title: string) => {
    return <thead className="w-full "><tr><th colSpan={3}><h1 className="text-white w-full text-lg font-bold">{title}</h1> </th></tr></thead>
}




const IndexTenant: React.FC = (datum: any) => {
    const limit = 0;
    const router = useRouter()
    const [data,setData]= useState<Array<iTenant>>([]);
    const [pagin, setPagin] = useState<iPagin>();
    const [search, setSearch] = useState('');
    const [numPagin, setNumPagin] = useState(1);
    const [visible,setVisible]= useState<boolean>(false);
    const [idx,setIdx]= useState<number>(limit);
    
    const handleGets = async () => {
        let url: string = `management/tenant?page=${numPagin}`
        if (search !== '') url += `&q=${search}`;
        await handleGet(Api.apiClient + url, (data:any) => {
            setData(data.data);
            setPagin(data);
        },false)
    }
   
    useEffect(() => {
        if (search !== ''||numPagin>1) {
             handleGets()
         }
         else {
            setSearch('')
            setData(datum.datum.data);
            setPagin(datum.datum);
         }
    }, [search, numPagin])
    console.log(isMobileOnly)
    const onCloseDrawer = () => {
        setVisible(false)
        setIdx(limit);
    }
    const dataHeader=[
                    {title:'Tenant',colSpan:1,rowSpan:2},
                    {title:'Service',colSpan:1,rowSpan:2},
                    {title:'Server name',colSpan:1,rowSpan:2},
                    {title:'Monthly billing',colSpan:1,rowSpan:2},
                    {title:'Billing active',colSpan:1,rowSpan:2},
                    {title:'Storage',colSpan:2,rowSpan:1,className:"text-center"},
                    {title:'#',colSpan:1,rowSpan:2,className:"text-center"},
                ]
    return (
        <Layout title="Tenant">
            <TablePage
                onChange={(event) => setSearch(event.target.value)}
                dataHeader={dataHeader}
                dataColspan={['Folder','Database']}
                renderRow={
                     <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                        {
                            data.length > 0 ? data.map((val: any, key: number) => {
                                return (
                                    <tr key={key} className={`${idx===key&&(visible&&'bg-black')}`}>
                                        {td(val.title,"cursor-pointer",()=>{setIdx(key);setVisible(true)})}
                                        {td(val.service,"cursor-pointer",()=>{setIdx(key);setVisible(true)})}
                                        {td(val.server_name,"cursor-pointer",()=>{setIdx(key);setVisible(true)})}
                                        {td(status(val.monthly_billing.toString()),"cursor-pointer",()=>{setIdx(key);setVisible(true)})}
                                        {td(val.billing_active,"cursor-pointer",()=>{setIdx(key);setVisible(true)})}
                                        {td(val.storage_used,"cursor-pointer",()=>{setIdx(key);setVisible(true)})}
                                        {td(val.usage_db,"cursor-pointer",()=>{setIdx(key);setVisible(true)})}
                                        {td(
                                            <>
                                            {btnEdit(()=>router.push({pathname: '/tenant/form', query: { keyword: val.id }},'tenant/edit'))}
                                            {btnDelete(async () => await handleDelete(Api.apiClient + 'management/tenant/' + val.id, () => handleGets()))}
                                            </>,
                                            "flex flex-row"
                                        )}
                                    </tr>
                                );
                            }):<tr><td  className="py-3 px-6 whitespace-nowrap font-normal text-center" colSpan={dataHeader.length+1}>Empty data</td></tr>
                        }
                    </tbody>
                }
            />

            <div className="container grid  lg:px-6 mx-auto">
                <PaginationQ
                    count={ pagin?.per_page}
                    page={numPagin}
                    totalPage={Math.ceil((pagin===undefined?0:pagin.total)/(pagin===undefined?0:pagin.per_page))}
                    onNext={()=>setNumPagin(numPagin + 1)}
                    onPrev={()=>setNumPagin(numPagin - 1)}
                    handlGotoPage={(pageN) => setNumPagin(pageN)}
                />
            </div>
            {
                data.length > 0 && 
                    
                        <Drawer
                    className="text-gray-400"
                width={isMobileOnly||isTablet?'auto':'800'}
                    title={
                        <div className={`flex flex-row justify-between`}>
                            <div className="text-white font-bold">{data[idx].title}</div>
                            <MdClose size={24} className="cursor-pointer" onClick={()=>onCloseDrawer()}/>
                        </div>
                    }
                placement="right"
                closable={false}
                onClose={()=>onCloseDrawer()}
                visible={visible}
                
            >
            <h1 className="text-white text-lg font-bold">Contact detail</h1>
            <table className="w-full relative text-left whitespace-no-wrap">
                <thead className="w-full ">
                    {tempDetail('responsible', data[idx].responsible)}
                    {tempDetail('Phone number', data[idx].telp)}
                    {tempDetail('Email', data[idx].email)}
                    {tempDetail('Address', data[idx].address)}
                </thead>
                        {titleHeader('Service detail')}
                <thead className="w-full">
                    {tempDetail('Service', data[idx].service)}
                    {tempDetail('Server name', data[idx].server_name)}
                    {tempDetail('Databases', data[idx].databases)}
                    {tempDetail('Monthly billing',status(data[idx].monthly_billing))}
                    {tempDetail('Billing active', data[idx].billing_active)}
                    {tempDetail('Api',data[idx].api)}
                            {tempDetail('Back office', <a href={data[idx].backoffice} target="_blank">{data[idx].backoffice}</a>)}
                    {tempDetail('Front end', data[idx].frontend)}
                        </thead>
{titleHeader('Usage detail')}
                <thead className="w-full">
                    {tempDetail('Folder', data[idx].storage_used)}
                    {tempDetail('Database', data[idx].usage_db)}
                        </thead>
            </table>
                    <h1 className="text-white text-lg font-bold">Note</h1>
                    {parse(data[idx].note)}
            </Drawer>
                    

            }
        </Layout>
    );
}
export async function getServerSideProps(ctx:NextPageContext) {
    const cookies = nookies.get(ctx)
    if(!cookies._nbilling){
        return {redirect: {destination: '/auth/login',permanent: false}}
    }else{
        Api.axios.defaults.headers.common["Authorization"] = Helper.decode(cookies._nbilling);
    }
    let datum: any = [];
    try {
      const getData = await Api.get(Api.apiUrl +`management/tenant?page=1`);
        if(getData.status===200){
            datum = getData.data.result;
        }else{
            datum=[];
        }
    } catch (err) {}
    return { 
        props:{datum}
    }
}

export default IndexTenant;