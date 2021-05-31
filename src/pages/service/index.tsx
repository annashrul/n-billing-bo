import React, { useState, useEffect } from "react";
import "react-intl-tel-input/dist/main.css";
import Layout from 'Layouts'

import Helper from 'lib/helper';
import { Pagination } from '@windmill/react-ui'
import Api from 'lib/httpService';
import { NextPageContext } from 'next'
import { } from '@windmill/react-ui'
import nookies from 'nookies'
import {useRouter} from 'next/router'
import { handleDelete, handleGet } from "lib/handleAction";
import { iPagin, iService, iTenant } from "lib/interface";
import TableService from "components/service/table";
import { Menu } from 'antd';

import 'antd/dist/antd.css';
import PaginationQ from "helpers/pagination";





const IndexService: React.FC = () => {
  const router = useRouter()
    const [data,setData]= useState<Array<iService>>([]);
    const [pagin, setPagin] = useState<iPagin>();
    const [search, setSearch] = useState('');
    const [numPagin, setNumPagin] = useState(1);
    const [category, setCategory] = useState('0');

    const handleGets = async () => {
        let url: string = `management/service?page=${numPagin}&type=${category}&perpage=1`
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
            <div className="container grid  lg:px-6 mx-auto">
                <div className="flex justify-between">
                    <div>
                        <h2 className="mt-6 text-2xl align-middle font-semibold text-gray-700 dark:text-gray-200">
                            Service
                        </h2>
                    </div>
                </div>
                <br />
                <div className="flex mt-2 py-4 cursor-pointer">
					<div style={{borderBottom:category==="0"?"1px solid white":"none"}} onClick = {() => {
						setCategory("0")
					}}>	
						<h1 className="font-sans text-white text-center">
							Tenant
						</h1>
					</div>
					<div className="ml-8" style={{borderBottom:category==="1"?"1px solid white":"none"}} onClick = {() => {
						setCategory("1")
					}}>
						<h1 className="font-sans text-white text-center">
							Billing
						</h1>
					</div>
				</div>
                <br/>
                <div className="w-full rounded-lg">
                   <div className="flex flex-row justify-between mb-2">
                    <div className="flex relative w-72">
                        <input 
                            type="search"
                            className="dark:border-gray-600 dark:bg-gray-700 focus:outline-none dark:text-gray-300 w-full rounded px-3 py-2.5" 
                            placeholder="Search"
                            onChange={(event) => {
                                setSearch(event.target.value);
                            }}/>
                    </div>
                    <div className="flex items-center ">
                        <button className="rounded text-white bg-yellow-400 font-sans font-medium bg-orange1-main hover:bg-yellow-400 px-3 py-2.5" onClick={() => router.push({pathname:'/service/form', query: { type:category}},'service/add')}>Add Service</button>
                    </div>
                    </div>
                    <TableService
                        data={data}
                        onDelete={async (id) => await handleDelete(Api.apiClient + 'management/service/' + id, () => handleGets())}
                    />
                    <br />
                    <PaginationQ
                        count={ pagin?.per_page}
                        page={numPagin}
                        totalPage={pagin?.total}
                        onNext={()=>setNumPagin(numPagin + 1)}
                        onPrev={()=>setNumPagin(numPagin - 1)}
                        handlGotoPage={(pageN) => setNumPagin(pageN)}
                    />
                </div>
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