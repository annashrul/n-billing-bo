import React, { useState, useEffect } from "react";
import "react-intl-tel-input/dist/main.css";
import Layout from 'Layouts'
import Helper from 'lib/helper';
import Api from 'lib/httpService';
import { NextPageContext } from 'next'
import { } from '@windmill/react-ui'
import nookies from 'nookies'
import TableTenant from "components/tenant/table";
import {useRouter} from 'next/router'
import { handleDelete, handleGet } from "lib/handleAction";
import { iPagin, iTenant } from "lib/interface";
import PaginationQ from "helpers/pagination";





const IndexTenant: React.FC = (datum:any) => {
  const router = useRouter()
    const [data,setData]= useState<Array<iTenant>>([]);
    const [pagin, setPagin] = useState<iPagin>();
    const [search, setSearch] = useState('');
    const [numPagin, setNumPagin] = useState(1);

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
    }, [search,numPagin])
    return (
        <Layout title="Tenant">
            <div className="container grid  lg:px-6 mx-auto">
                <div className="flex justify-between">
                    <div>
                        <h2 className="mt-6 text-2xl align-middle font-semibold text-gray-700 dark:text-gray-200">
                            Tenant
                        </h2>
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
                        <button className="rounded text-white bg-yellow-400 font-medium bg-orange1-main hover:bg-yellow-400 px-3 py-2.5" onClick={() => router.push({pathname:'/tenant/form',query: { keyword: 'add' },},'tenant/add')}>Add Tenant</button>
                    </div>
                    </div>
                    <TableTenant
                        data={data===undefined?[]:data}
                        onDelete={async (id) => await handleDelete(Api.apiClient + 'management/tenant/' + id, () => handleGets())}
                    />
                    <br />
                    <PaginationQ
                       count={ pagin?.per_page}
                        page={numPagin}
                        totalPage={Math.ceil((pagin===undefined?0:pagin.total)/(pagin===undefined?0:pagin.per_page))}
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