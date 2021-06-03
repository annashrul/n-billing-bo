import React, {useEffect,useState} from "react";
import Layout from 'Layouts'
import { } from '@windmill/react-ui'
import {useRouter} from 'next/router'
import SubHeader from "helpers/subHeader";
 import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { handlePost } from "lib/handleAction";
import Api from 'lib/httpService';
import { NextPageContext } from 'next'
import nookies from 'nookies'
import helper from "lib/helper";
import { btnSave, rmDot, toCurrency} from "helpers/general";
import Select from 'react-select';
import { iSelect, iService, iTenant } from "lib/interface";
import 'antd/dist/antd.css';

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



const FormBilling: React.FC = (props: any) => {
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

   
    useEffect(() => {
       
        let tenant: any = [];
        let service: any = [];

        if (props.tenant.data.length > 0) {
            props.tenant.data.map((val: iTenant, key: number) => {
                console.log(key)
                tenant.push({value:val.id,label:val.title})
            })
            handleChangeTenant({ value: props.tenant.data[0].id, label: props.tenant.data[0].title })
        }
        setDataTenant(tenant);
        if (props.service.data.length > 0) {
            props.service.data.map((val: iService, key: number) => {
                 console.log(key)
                service.push({value:val.id,label:val.title})
            })
            handleChangeService({ value: props.service.data[0].id, label: props.service.data[0].title })
        }
        setDataService(service);
        
        
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
            helper.mySwalWithCallback(msg, () => history.back())
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
                                    name="tenant"
                                    options={dataTenant}
                                    onChange={handleChangeTenant}
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
    }else{
        Api.axios.defaults.headers.common["Authorization"] = helper.decode(cookies._nbilling);
    }
    
    let tenant: any = [];
    let service: any = [];
    try {
      const getData = await Api.get(Api.apiUrl +`management/tenant?page=1&perpage=50`);
        if(getData.status===200){
            tenant = getData.data.result;
        }else{
            tenant=[];
        }
    } catch (err) { }
    try {
      const getData = await Api.get(Api.apiUrl +`management/service?page=1&perpage=50&type=1`);
        if(getData.status===200){
            service = getData.data.result;
        }else{
            service=[];
        }
    } catch (err) { }
    // console.log('tenant', tenant)
    // console.log('service', service)
    return { 
        props:{tenant,service}
    }
}
export default FormBilling;