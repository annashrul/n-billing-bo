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
            <div className="mt-6 pt-3">
                    <h2 className="text-2xl inline-block align-middle font-semibold text-gray-700 dark:text-gray-200">
                        {page}
                    </h2>
                </div>
            <br />
            {
                props.renderHeader
            }
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="shadow-md rounded">
                    <HeaderPage
                        onChange={props.onChange}
                        pathForm={page}
                    />
                    <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8">
                        <div className="w-full text-left overflow-x-auto">
                            <table className="w-full">
                                    <thead className="w-full">
                                    <tr>
                                        {
                                            props.dataHeader.map((val: any, key: number) => {
                                                return <th key={key} style={{border:"1px solid rgba(26, 28, 35, 1)"}} className={`font-semibold  py-3 px-6 text-gray-700 dark:text-gray-200 whitespace-no-wrap ${val.className}`} rowSpan={val.rowSpan} colSpan={val.colSpan}>{val.title}</th>
                                            })
                                        }
                                    </tr>
                                    {
                                        props.dataColspan !== undefined && <tr>
                                            {
                                                props.dataColspan.map((val: any, key: number) => {
                                                    return <th key={key} style={{border:"1px solid rgba(26, 28, 35, 1)"}} className="font-semibold  py-3 px-6 text-gray-700 dark:text-gray-200 text-center whitespace-no-wrap">{val}</th>
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