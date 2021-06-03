import React, { useState, useEffect } from "react";
import Layout from 'Layouts'
import Helper from 'lib/helper';
import Api from 'lib/httpService';
import { NextPageContext } from 'next'
import { } from '@windmill/react-ui'
import nookies from 'nookies'
import { handleDelete, handleGet } from "lib/handleAction";
import { iBilling, iPagin} from "lib/interface";
import TablePage from "components/Common/tablePage";
import { onlyDate, status, td, toCurrency } from "helpers/general";
import {useRouter} from 'next/router'
import {  MdNotInterested,MdCached } from 'react-icons/md';
import PaginationQ from "helpers/pagination";
import { isMobileOnly} from 'react-device-detect';
import 'antd/dist/antd.css';


const IndexBilling: React.FC = (datum:any) => {
    const [data,setData]= useState<Array<iBilling>>([]);
    const [pagin, setPagin] = useState<iPagin>();
    const [search, setSearch] = useState('');
    const [numPagin, setNumPagin] = useState(1);
    const router = useRouter()
    
    const handleGets = async () => {
        let url: string = `management/billing?page=${numPagin}`
        if (search !== '') url += `&q=${search}`;
        await handleGet(Api.apiClient + url, (data:any) => {
            setData(data.data===undefined?[]:data.data);
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
    let totAmounPerPage = 0;

    const dataHeader=[
                    {title:'Tenant',colSpan:1,rowSpan:1},
                    {title:'Period',colSpan:1,rowSpan:1},
                    {title:'Amount',colSpan:1,rowSpan:1},
                    {title:'Status',colSpan:1,rowSpan:1},
                    {title:'Due date',colSpan:1,rowSpan:1},
                    {title:'Created at',colSpan:2,rowSpan:1},
                ]
    return (
        <Layout title={router.pathname.replace("/","")}>
            <TablePage
                onChange={(event) => setSearch(event.target.value)}
                dataHeader={dataHeader}
                renderRow={
                     <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                        {
                            data.length > 0 ? data.map((val: any, key: number) => {
                                totAmounPerPage = totAmounPerPage + parseInt(val.amount, 10);
                                return (
                                    <tr key={key}>
                                        {td(val.tenant)}
                                        {td(val.period+' month')}
                                        {td(toCurrency(val.amount))}
                                        {td(status(val.status))}
                                        {td(onlyDate(val.due_date))}
                                        {td(onlyDate(val.created_at))}
                                        {td(
                                            <>
                                            <MdCached size={24} className="cursor-pointer mr-2" color={'#9E9E9E'} onClick={() => {
                                                router.push({ pathname: '/billing/detail', query: val, },'billing/edit')
                                            }} />
                                            <MdNotInterested size={24} className="cursor-pointer" color={'#9E9E9E'} onClick={async () => await handleDelete(Api.apiClient + 'management/billing/' + val.id, () => handleGets())} />
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
            {
                isMobileOnly ? (
                    <div className={`flex flex-col mb-2 mt-1 container mx-auto`}>
                        <div className="w-full">
                            <div className="flex flex-row">
                                <h1 className="w-1/2 font-normal text-gray-700 dark:text-gray-400">Total per page</h1>
                                <h1 className="w-1/2 font-normal text-gray-700 dark:text-gray-400">: {toCurrency(totAmounPerPage.toString())}</h1>
                            </div>
                            <div className="flex flex-row">
                                <h1 className="w-1/2 font-normal text-gray-700 dark:text-gray-400">Total all page</h1>
                                <h1 className="w-1/2 font-normal text-gray-700 dark:text-gray-400">: {toCurrency(datum.datum.total_amount)}</h1>
                            </div>
                        </div>
                        <div className="w-full">
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
                ) : (
                        <div className={`flex lg:flex-row lg:justify-between mb-2 mt-1 container lg:px-6 mx-auto`}>
                
                {
                   <div className="w-full">
                        <div className="flex flex-row">
                            <h1 className="lg:w-1/4 xs:w-1/2 font-normal text-gray-700 dark:text-gray-400">Total per page</h1>
                            <h1 className="lg:w-1/4 xs:w-1/2 font-normal text-gray-700 dark:text-gray-400">: {toCurrency(totAmounPerPage.toString())}</h1>
                        </div>
                        <div className="flex flex-row">
                            <h1 className="lg:w-1/4 xs:w-1/2 font-normal text-gray-700 dark:text-gray-400">Total all page</h1>
                            <h1 className="lg:w-1/4 xs:w-1/2 font-normal text-gray-700 dark:text-gray-400">: {toCurrency(datum.datum.total_amount)}</h1>
                        </div>
                    </div>
                }
                <div className="w-full">
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
                )
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
      const getData = await Api.get(Api.apiUrl +`management/billing?page=1`);
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

export default IndexBilling;