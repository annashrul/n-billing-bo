import React from "react";
import {useRouter} from 'next/router'
import HeaderPage from "./headerPage";


type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    dataHeader: any;
    dataColspan?: any;
    renderRow: React.ReactNode;
    renderHeader?: React.ReactNode;
}


const TablePage = (props: Props) => {
    const router = useRouter()
    const page = router.pathname.replace("/", "");

    return (
        <div className="container grid  lg:px-6 mx-auto">
            <div className="flex justify-between">
                <div>
                    <h2 className="mt-6 text-2xl align-middle font-semibold text-gray-700 dark:text-gray-200">
                        {page}
                    </h2>
                </div>
            </div>
            <br />
            {
                props.renderHeader
            }
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="shadow-md rounded my-6">
                    <HeaderPage
                        onChange={props.onChange}
                        pathForm={page}
                    />
                    <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8">
                        <div className="w-full text-left overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                    <thead className="w-full border-b border-gray-boder">
                                    <tr>
                                        {
                                            props.dataHeader.map((val: any, key: number) => {
                                                return <th key={key} style={{border:"1px solid rgba(26, 28, 35, 1)"}} className={`py-3 px-6 text-white font-normal ${val.className}`} rowSpan={val.rowSpan} colSpan={val.colSpan}>{val.title}</th>
                                            })
                                        }
                                    </tr>
                                    {
                                        props.dataColspan !== undefined && <tr>
                                            {
                                                props.dataColspan.map((val: any, key: number) => {
                                                    return <th key={key} style={{border:"1px solid rgba(26, 28, 35, 1)"}} className="py-3 px-6 text-white font-normal text-center">{val}</th>
                                                })
                                            }
                                        </tr>
                                    }
                                </thead>
                                {
                                    props.renderRow
                                }
                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}


export default TablePage;