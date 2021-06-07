import React, { useState, useEffect } from "react";
import Layout from 'Layouts'
import Api from 'lib/httpService';
import { NextPageContext } from 'next'
import { } from '@windmill/react-ui'
import nookies from 'nookies'
import {useRouter} from 'next/router'
import { handleDelete, handleGet } from "lib/handleAction";
import { iPagin, iService} from "lib/interface";
import PaginationQ from "helpers/pagination";
import TablePage from "components/Common/tablePage";
import { btnDelete, btnEdit, decode, td } from "helpers/general";





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
    
    
    const dataHeader=[
                    {title:'Title',colSpan:1,rowSpan:1},
                    {title:'#',colSpan:1,rowSpan:1},
                ]
           
    return (
        <Layout title="Service">
            <TablePage
                renderHeader={
                    <div className="flex mb-3 cursor-pointer">
                        <div className={category==='0'?`border-b-4 border-yellow-400`:''} onClick = {() => setCategory("0")}>	
                            <h1 className="text-gray-700 dark:text-gray-400 font-bold text-center">
                                Tenant
                            </h1>
                        </div>
                        <div className={`ml-8 ${category==='1'?`border-b-4 border-yellow-400`:''}`} onClick = {() => setCategory("1")}>
                            <h1 className="text-gray-700 dark:text-gray-400 font-bold text-center">
                                Billing
                            </h1>
                        </div>
                    </div>
                }
                onChange={(event) => setSearch(event.target.value)}
                dataHeader={dataHeader}
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
                            }):<tr><td  className="py-3 px-6 whitespace-nowrap font-normal text-center" colSpan={dataHeader.length}>Empty data</td></tr>
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
        Api.axios.defaults.headers.common["Authorization"] = decode(cookies._nbilling);
    }
   
    return { 
        props: {}
    }
}

export default IndexService;