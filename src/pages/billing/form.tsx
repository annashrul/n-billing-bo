import React, {useEffect,useState} from "react";
import Layout from 'Layouts'
import { } from '@windmill/react-ui'
import {useRouter} from 'next/router'
import SubHeader from "helpers/subHeader";
 import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { handleGet, handlePost } from "lib/handleAction";
import Api from 'lib/httpService';
import { NextPageContext } from 'next'
import nookies from 'nookies'
import { btnSave, decode, rmDot, swalWithCallback, toCurrency} from "helpers/general";
import Select from 'react-select';
import { iSelect,  iTenant } from "lib/interface";
import 'antd/dist/antd.css';
import { getServiceOption } from "helpers/reusableService";

type InitialForm = {
    id_tenant: string;
    period: string;
    due_date: string;
    amount: string;
    service: string;
}


const TenantValidation = yup.object().shape({
	period: yup.number()
        .typeError("the number of months does not match")
        .positive("A period can't start with a minus")
        .integer("A period can't include a decimal point")
        .min(1)
        .required('A period is required')
        ,
	due_date: yup.string().required('due date is required'),
	amount: yup.string().required("Amount is required")
        .min(1)
})



const FormBilling: React.FC = () => {
    const history = useRouter();
    const [idTenant,setIdTenant]= useState('');
    const [dataTenant, setDataTenant] = useState([]);
    const [idService, setIdService] = useState('');
    const [dataService,setDataService]= useState([]);
    const { register, handleSubmit, errors, setValue, control, trigger, unregister, clearErrors, formState, getValues, reset, setError, watch } = useForm<InitialForm>({
		resolver: yupResolver(TenantValidation),
		shouldUnregister: true,
		criteriaMode: "all",
		mode: "all"
    });



    const handleGetTenant = async () => {
        let url: string = `management/tenant?page=1&perpage=50`
        await handleGet(Api.apiClient + url, (data:any) => {
            let tenant: any = [];
            if (data.data.length > 0) {
                data.data.map((val: iTenant, key: number) => {
                    console.log(key)
                    tenant.push({value:val.id,label:val.title})
                })
                handleChangeTenant({ value: data.data[0].id, label: data.data[0].title })
            }
            setDataTenant(tenant);
        },false)
    }

    const getService = async () => {
        await getServiceOption('1', (res) => {
            handleChangeService({ value: res[0].value, label: res[0].label })
            setDataService(res);
        })
    }

    

    useEffect(() => {
        handleGetTenant();
        getService();
    }, [])

  

    const onSubmit: SubmitHandler<InitialForm> = async (data:any) => {
        let url = Api.apiClient + `management/billing`;
        let parseData = {
            id_tenant: idTenant,
            period:data.period,
            due_date:data.due_date,
            amount:rmDot(data.amount),
            service:idService
        };
        await handlePost(url, parseData, (datum, msg) => {
            console.log(datum)
            swalWithCallback(msg, () => history.back())
        });
    }

    const handleChangeTenant = (res: any) => {
        setIdTenant(res.value);
    }
    const handleChangeService = (res: any) => {
        setIdService(res.value);
    }
   
    return (
        <Layout title={`Add Billing` }>
            
            <div className="container grid  lg:px-6 py-5 mx-auto">
                <div className="flex justify-between">
                    <SubHeader
                        title={`Billing / Add Billing`}
                        link
                        onClick={() => history.back()}
                    />
                </div>
                <br />
                <FormProvider
                    {...{
                        
                    register,
                    handleSubmit,
                    errors,
                    setValue,
                    control,
                    trigger,
                    unregister,
                    clearErrors,
                    formState,
                    getValues,
                    reset,
                    setError,
                    watch,
                    
                }}
                >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col lgap-5 pb-2">
                        <div className="flex flex-row w-full mb-9">
                            <label className="font-medium text-gray-200 w-1/4">
                                Tenant  <span className="text-red-600">*</span>
                            </label>
                            <div className="flex flex-col w-3/4">
                                    <Select
                                    className="text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none dark:text-gray-300"
                                    name="tenant"
                                    options={dataTenant}
                                    onChange={handleChangeTenant}
                                    getProp={(key:any) => {
                                        console.log('ce',key)
                                    }}
                                    value={
                                        dataTenant.find((op:iSelect) => {
                                            return op.value === idTenant
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mb-9">
                            <label className="font-medium text-gray-200 w-1/4">
                                Due Date  <span className="text-red-600">*</span>
                            </label>
                            <div className="flex flex-col w-3/4">
                                <input name="due_date" onChange={(e) => {setValue('due_date', e.target.value)  }} ref={register} type="date" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                                <span className="text-red-700">{errors.due_date?.message}</span>
                            </div>
                        </div>
                        <div className="flex flex-row w-full mb-9">
                            <label className="font-medium text-gray-200 w-1/4">
                                Periode ( month ) <span className="text-red-600">*</span>
                            </label>
                            <div className="flex flex-col w-3/4">
                                <input name="period" onChange={(e) => {
                                    if (parseInt(e.target.value) > 12) {
                                        setError('period',{type:'digit',message:'value must be 1 - 12'})
                                    }
                                    setValue('period', e.target.value)
                                }} ref={register} type="number" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                                <span className="text-red-700">{errors.period?.message}</span>
                            </div>
                        </div>
                        <div className="flex flex-row w-full mb-9">
                            <label className="font-medium text-gray-200 w-1/4">
                                Amount <span className="text-red-600">*</span>
                            </label>
                            <div className="flex flex-col w-3/4">
                                <input name="amount" onChange={(e) => {setValue('amount', toCurrency(e.target.value))  }} ref={register} type="text" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                                <span className="text-red-700">{errors.amount?.message}</span>
                            </div>
                        </div>
                        <div className="flex flex-row w-full mb-9">
                            <label className="font-medium text-gray-200 w-1/4">
                                Service  <span className="text-red-600">*</span>
                            </label>
                            <div className="flex flex-col w-3/4">
                                <Select
                                    name="service"
                                    options={dataService}
                                    onChange={handleChangeService}
                                    value={
                                        dataService.find((op:iSelect) => {
                                            return op.value === idService
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end w-full" style={{ marginTop: 16}}>
                            <div className="flex flex-row">
                               {btnSave((!formState.isDirty || !formState.isValid),``)}
                        </div>
                    </div>
                </form>
                </FormProvider>
            </div>
        </Layout>
    );
}
export async function getServerSideProps(ctx: NextPageContext) {
    const cookies = nookies.get(ctx)
   
    if(!cookies._nbilling){
        return {redirect: {destination: '/auth/login',permanent: false}}
    } else {
        Api.axios.defaults.headers.common["Authorization"] = decode(cookies._nbilling);
    }
    return { 
        props:{}
    }
}
export default FormBilling;