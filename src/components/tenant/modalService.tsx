import React, { useState,useEffect }  from 'react'
import Modal from 'antd/lib/modal/Modal';
import Api from 'lib/httpService';
import { handleGet } from 'lib/handleAction';
import { iPagin, iService } from 'lib/interface';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Pagination } from '@windmill/react-ui'


type propsService = {
    isShowModal: boolean;
    onAction: (isShow: boolean) => void;
    onSelect:(data:iService)=>void
}



const ServiceModals: React.FC<propsService> = (props) => {
    const [data,setData]= useState<Array<iService>>([]);
    const [pagin, setPagin] = useState<iPagin>();
    const [idx,setIdx]= useState<String>('');

    const handleGets = async (page:number) => {
        await handleGet(Api.apiClient + `management/service?page=${page}&type=0&perpage=2`, (res) => {
            setData(res.data);
            setPagin(res);
       },true);
    }
    useEffect(() => {
        handleGets(1);
    }, [])
   
    
    const handleChoose = (data:iService) => {
        setIdx(data.id);
        props.onSelect(data);

    }
   
	return (
			<Modal
				title="List Service"
				visible={props.isShowModal}
				onOk={() => {
                    props.onAction(false);
				}}
				onCancel={() => {
                    props.onAction(false);
				}}
				afterClose={() => { }}
				centered
				footer={[
					<button onClick={() => {props.onAction(false);}}className="py-2 px-5 rounded focus:outline-none bg-yellow-400 hover:bg-yellow-500 text-white">
						Save
					</button>,
				]}
			>
				<div className="flex flex-row justify-between gap-10">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full relative text-left border-gray-boder whitespace-no-wrap">
                        <tbody>
                         {
                            data.map((val, key) => {
                            return (
                                <tr className="border-b border-gray-boder" key={key}>
                                    <td onClick={()=>handleChoose(val)} className="cursor-pointer py-3  whitespace-nowrap font-sans font-normal">{val.title}</td>
                                    <td onClick={()=>handleChoose(val)} className="cursor-pointer py-3  whitespace-nowrap font-sans font-normal">
                                        {
                                            idx===val.id&&<AiOutlineCheckCircle size={20} className="cursor-pointer" color={'#9E9E9E'} onClick={() => {}} />
                                         }
                                    </td>
                                </tr>
                            );
                        })
                    }
                        </tbody>
                        </table>
                </div>
                
            </div>
            <div className="mt-10">
                <Pagination
                    totalResults={pagin===undefined?0:pagin.total}
                    resultsPerPage={pagin===undefined?0:pagin.per_page}
                    onChange={(val) => {
                        handleGets(val);
                    }}
                    label="Page navigation"
                />
            </div>
				
			</Modal>
		
	)
}

export default ServiceModals
