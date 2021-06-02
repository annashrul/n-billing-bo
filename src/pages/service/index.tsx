import React, { useState, useEffect } from "react";
import "react-intl-tel-input/dist/main.css";
import Layout from 'Layouts'

import Helper from 'lib/helper';
import Api from 'lib/httpService';
import { NextPageContext } from 'next'
import { } from '@windmill/react-ui'
import nookies from 'nookies'
import {useRouter} from 'next/router'
import { handleDelete, handleGet } from "lib/handleAction";
import { iPagin, iService} from "lib/interface";

import 'antd/dist/antd.css';
import PaginationQ from "helpers/pagination";
import TablePage from "components/Common/tablePage";
import { btnDelete, btnEdit, td } from "helpers/general";





const IndexService: React.FC = () => {
  const router = useRouter()
    const [data,setData]= useState<Array<iService>>([]);
    const [pagin, setPagin] = useState<iPagin>();
    const [search, setSearch] = useState('');
    const [numPagin, setNumPagin] = useState(1);
    const [category, setCategory] = useState('0');

    const handleGets = async () => {
        let url: string = `management/service?page=${numPagin}&type=${category}`
        if (search !== '') url += `&q=${search}`;
        await handleGet(Api.apiClient + url, (data: any) => {
            setData(data.data !== undefined ? data.data : []);
            setPagin(data);
        },false)
    }
   
    useEffect(() => {
        handleGets()
    }, [search, numPagin,category])
    
    

           
    return (
        <Layout title="Service">
            <TablePage
                renderHeader={
                    <div className="flex py-4 cursor-pointer">
                        <div style={{borderBottom:category==="0"?"1px solid white":"none"}} onClick = {() => {
                            setCategory("0")
                        }}>	
                            <h1 className=" text-white text-center">
                                Tenant
                            </h1>
                        </div>
                        <div className="ml-8" style={{borderBottom:category==="1"?"1px solid white":"none"}} onClick = {() => {
                            setCategory("1")
                        }}>
                            <h1 className=" text-white text-center">
                                Billing
                            </h1>
                        </div>
                    </div>
                }
                onChange={(event) => setSearch(event.target.value)}
                dataHeader={[
                    {title:'Title',colSpan:1,rowSpan:1},
                    {title:'#',colSpan:1,rowSpan:1},
                ]}
                renderRow={
                     <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                        {
                            data.length > 0 ? data.map((val: any, key: number) => {
                                return (
                                    <tr key={key}>
                                        {td(val.title)}
                                        {td(
                                            <>
                                            {btnEdit(()=>router.push({pathname: '/service/form', query: { keyword: val.id }},'service/edit'))}
                                            {btnDelete(async () => await handleDelete(Api.apiClient + 'management/service/' + val.id, () => handleGets()))}
                                            </>,
                                            "flex flex-row"
                                        )}
                                    </tr>
                                );
                            }):<tr><td  className="py-3 px-6 whitespace-nowrap font-normal text-center" colSpan={7}>Empty data</td></tr>
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
   
    return { 
        props: {
            datum:[]
        }
    }
}

export default IndexService;