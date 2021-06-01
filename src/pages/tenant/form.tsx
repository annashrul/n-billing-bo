import React, {useEffect,useState} from "react";
import "react-intl-tel-input/dist/main.css";
import Layout from 'Layouts'
import { } from '@windmill/react-ui'
import {useRouter} from 'next/router'
import SubHeader from "helpers/subHeader";
 import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Radio} from 'antd';
import 'antd/dist/antd.css';
import { handlePost, handlePut } from "lib/handleAction";
import Api from 'lib/httpService';
import { NextPageContext } from 'next'
import { iService } from "lib/interface";
import nookies from 'nookies'
import helper from "lib/helper";
import Select from 'react-select';
import CKEditor from "react-ckeditor-component";
import { btnSave, rmDot, toCurrency } from "helpers/general";

type InitialForm = {
    title: string;
    server_name: string;
    databases: string;
    backoffice: string;
    api: string;
    frontend: string;
    service: string;
    email: string;
    telp: string;
    monthly_billing: string;
    address: string;
    note: string;
    responsible: string;
    period: string;
    due_date: string;
    amount: string; 
    service_billing: string; 
}






const FormTenant: React.FC = (datum:any) => {
   
    const history = useRouter();
    const [monthlyBilling, setMonthlyBilling] = useState('1');
    const [note, setNote] = useState('');
    const [idService, setIdService] = useState('');
    const [idServiceBilling, setIdServiceBilling] = useState('');
    const [service,setService]= useState([]);
    const [serviceBilling,setServiceBilling]= useState([]);
    const [isService, setIsService] = useState(true);
    
    let TenantValidation = yup.object().shape({
        title: yup.string().required("title is required"),
        server_name: yup.string().required("server name is required"),
        databases: yup.string().required("databases is required"),
        backoffice: yup.string().required("backoffice is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        telp: yup
            .string()
            .required("Phone number is required")
            .matches(/^[0-9]{1,14}$/, "Phone number is invalid")
            .min(10, 'Phone number must be between 10 and 13')
            .max(14, 'Phone number must be between 10 and 13'),
        address: yup.string().required("address is required"),
        responsible: yup.string().required("responsible is required"),
    });
    

    const { register, handleSubmit, errors, setValue, control, trigger, unregister, clearErrors, formState, getValues, reset, setError, watch } = useForm<InitialForm>({
		resolver: yupResolver(TenantValidation),
		shouldUnregister: true,
		criteriaMode: "all",
		mode: "all"
    });
    const onSubmit: SubmitHandler<InitialForm> = async (data:any) => {
        let url = Api.apiClient + `management/tenant`;
        let parseData = {
            title: data.title,
            server_name: data.server_name,
            databases: data.databases,
            backoffice: data.backoffice,
            api: data.api,
            frontend: data.frontend,
            service: idService,
            email: data.email,
            telp: data.telp,
            monthly_billing: monthlyBilling,
            address: data.address,
            note: note,
            responsible: data.responsible,
            billing: {
                period: monthlyBilling==="1"&&history.query.keyword==='add'?data.period:'',
                due_date: monthlyBilling==="1"&&history.query.keyword==='add'?data.due_date:'',
                amount:  monthlyBilling==="1"&&history.query.keyword==='add'?rmDot(data.amount):'', 
                service: idServiceBilling, 
            }
        }
        
        
        if (history.query.keyword === 'add') {
            await handlePost(url, parseData, (datum,msg) => {
                helper.mySwalWithCallback(msg, () => history.back())
            });
        }
        else {
            await handlePut(url + '/' + history.query.keyword,parseData, (datum,msg) => {
                helper.mySwalWithCallback(msg, () => history.back())
            })
        }
        
    }

    useEffect(() => {
        if (datum.edit.id !== undefined) {
            let data = datum.edit;
            setValue('title',data.title)
            setValue('server_name',data.server_name)
            setValue('databases',data.databases)
            setValue('backoffice',data.backoffice)
            setValue('api',data.api)
            setValue('frontend',data.frontend)
            setValue('email',data.email)
            setValue('telp',data.telp)
            setValue('address',data.address)
            setValue('responsible', data.responsible)
            setMonthlyBilling(`${data.monthly_billing}`);
            handleChangeService({ value: data.id_service, label: data.service })
            setNote(data.note)
            
        }
    }, [isService&&idService])

    useEffect(() => {
         if (monthlyBilling === '0') {
            setValue('period', '');
            setValue('due_date', '');
            setValue('amount', '');
        }
    }, [monthlyBilling])

    useEffect(() => {
        let dataServiceTenant:any = [];
        let dataServiceBilling:any = [];
        datum.datum.data.map((val:iService, key:number) => {
            dataServiceTenant.push({ value: val.id, label: val.title });
        })
        setService(dataServiceTenant);
        handleChangeService({value: dataServiceTenant[0].value, label: dataServiceTenant[0].label})
       
        if (history.query.keyword === 'add') {
            datum.serviceBilling.data.map((val:iService, key:number) => {
                dataServiceBilling.push({ value: val.id, label: val.title });
            })
            setServiceBilling(dataServiceBilling);
            handleChangeServiceBilling({value: dataServiceBilling[0].value, label: dataServiceBilling[0].label})
       }
    }, [])
    
    
    
    const handleChangeService = (val: any) => {
        setIdService(val.value)
    }
    const handleChangeServiceBilling = (val: any) => {
        setIdServiceBilling(val.value)
    }
     const  onChange = (evt:any) => {
         var newContent = evt.editor.getData();
         setNote(newContent);
    }

   
    return (
        <Layout title={`Form ${history.query.keyword==='add'?'Add':'Edit'} Tenant` }>
            
            <div className="container grid  lg:px-6 py-5 mx-auto">
                <div className="flex justify-between">
                    <SubHeader
                        title={`Tenant / ${history.query.keyword==='add'?'Add':'Edit'} Tenant`}
                        link
                        onClick={() => history.push('/tenant')}
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
                            Title  <span className="text-red-600">*</span>
                        </label>
                        <div className="flex flex-col w-3/4">
                            <input name="title" onChange={(e) => { setValue('title', e.target.value) }} ref={register} type="text" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none dark:text-gray-300 form-input"/>
                            <span className="text-red-700">{errors.title?.message}</span>
                        </div>
                    </div>
                    <div className="flex flex-row w-full mb-9">
                        <label className=" font-medium text-gray-200 w-1/4">
                            Server Name  <span className="text-red-600">*</span>
                        </label>
                        <div className="flex flex-col w-3/4">
                            <input name="server_name" onChange={(e) => { setValue('server_name', e.target.value) }} ref={register} type="text" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                            <span className="text-red-700">{errors.server_name?.message}</span>
                        </div>
                    </div>
                    <div className="flex flex-row w-full mb-9">
                        <label className=" font-medium text-gray-200 w-1/4">
                           Databases  <span className="text-red-600">*</span>
                        </label>
                        <div className="flex flex-col w-3/4">
                            <input name="databases" onChange={(e) => { setValue('databases', e.target.value) }} ref={register} type="text" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                            <span className="text-red-700">{errors.databases?.message}</span>
                        </div>
                    </div>
                    <div className="flex flex-row w-full mb-9">
                        <label className=" font-medium text-gray-200 w-1/4">
                           Back Office  <span className="text-red-600">*</span>
                        </label>
                                <div className="flex flex-col w-3/4">
                                    <input name="backoffice" onChange={(e) => { setValue('backoffice', e.target.value) }} ref={register} type="text" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                            <span className="text-red-700">{errors.backoffice?.message}</span>
                        </div>
                    </div>
                    <div className="flex flex-row w-full mb-9">
                        <label className=" font-medium text-gray-200 w-1/4">
                           Api
                        </label>
                                <div className="flex flex-col w-3/4">
                                    <input name="api" onChange={(e) => { setValue('api', e.target.value) }} ref={register} type="text" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                            <span className="text-red-700">{errors.api?.message}</span>
                        </div>
                    </div>
                    <div className="flex flex-row w-full mb-9">
                        <label className=" font-medium text-gray-200 w-1/4">
                           Front End
                        </label>
                                <div className="flex flex-col w-3/4">
                                    <input name="frontend" onChange={(e) => { setValue('frontend', e.target.value) }} ref={register} type="text" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                            <span className="text-red-700">{errors.frontend?.message}</span>
                        </div>
                    </div>
                    <div className="flex flex-row w-full mb-9">
                        <label className=" font-medium text-gray-200 w-1/4">
                           Service  <span className="text-red-600">*</span>
                        </label>
                        <div className="flex flex-col w-3/4">
                            <Select
                                name="service"
                                options={service}
                                onMenuOpen={()=>setIsService(false)}
                                onChange={handleChangeService}
                                value={
                                    service.find((op:any) => {
                                        return op.value === idService
                                    })
                                }
                            />
                        </div>
                    </div>
                     <div className="flex flex-row w-full mb-9">
                        <label className=" font-medium text-gray-200 w-1/4">
                           Email  <span className="text-red-600">*</span>
                        </label>
                                <div className="flex flex-col w-3/4">
                                     <input name="email" onChange={(e) => { setValue('email', e.target.value) }} ref={register} type="text" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                            <span className="text-red-700">{errors.email?.message}</span>
                        </div>
                    </div>
                     <div className="flex flex-row w-full mb-9">
                        <label className=" font-medium text-gray-200 w-1/4">
                           Phone Number  <span className="text-red-600">*</span>
                        </label>
                        <div className="flex flex-col w-3/4">
                            <input name="telp" onChange={(e) => { if (e.target.value.length > 13) setValue('telp', e.target.value.substr(0, 13))  }} ref={register} type="number" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                            <span className="text-red-700">{errors.telp?.message}</span>
                        </div>
                    </div>
                     <div className="flex flex-row w-full mb-9">
                        <label className=" font-medium text-gray-200 w-1/4">
                           Address  <span className="text-red-600">*</span>
                        </label>
                        <div className="flex flex-col w-3/4">
                            <textarea name="address" onChange={(e) => { setValue('address', e.target.value) }} ref={register} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none dark:text-gray-300 form-input"/>
                            <span className="text-red-700">{errors.address?.message}</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-row w-full mb-9">
                        <label className=" font-medium text-gray-200 w-1/4">
                           Responsible  <span className="text-red-600">*</span>
                        </label>
                        <div className="flex flex-col w-3/4">
                            <input type="text"  name="responsible" onChange={(e) => { setValue('responsible', e.target.value) }} ref={register} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none dark:text-gray-300 form-input"/>
                             <span className="text-red-700">{errors.responsible?.message}</span>
                        </div>
                            </div>
                    <div className="flex flex-row w-full mb-9">
                        <label className=" font-medium text-gray-200 w-1/4">
                           Monthly Billing  <span className="text-red-600">*</span>
                        </label>
                        <div className="flex flex-col w-3/4">
                            <Radio.Group defaultValue="1" value={monthlyBilling} buttonStyle="solid" name="monthly_billing" ref={register} onChange={(e) => {
                                        setMonthlyBilling(e.target.value)
                                        
                            }}>
                                <Radio.Button value="1">Active</Radio.Button>
                                <Radio.Button value="0">Non Active</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                    {monthlyBilling==='1'&&history.query.keyword==='add'&&(<div className="flex flex-row w-full mb-9">
                        <label className=" font-medium text-gray-200 w-1/4">
                           Periode  <span className="text-red-600">*</span>
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
                    </div>)}
                    {monthlyBilling==='1'&&history.query.keyword==='add'&&(<div className="flex flex-row w-full mb-9">
                        <label className=" font-medium text-gray-200 w-1/4">
                           Due Date  <span className="text-red-600">*</span>
                        </label>
                        <div className="flex flex-col w-3/4">
                            <input name="due_date" onChange={(e) => {setValue('due_date', e.target.value)  }} ref={register} type="date" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                                                <span className="text-red-700">{errors.due_date?.message}</span>

                                </div>
                    </div>)}
                    {monthlyBilling==='1'&&history.query.keyword==='add'&&(<div className="flex flex-row w-full mb-9">
                <label className=" font-medium text-gray-200 w-1/4">
                    Amount  <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-col w-3/4">
                    <input name="amount" onChange={(e) => {setValue('amount', toCurrency(e.target.value))  }} ref={register} type="text" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                                                               <span className="text-red-700">{errors.amount?.message}</span>

                                </div>
                </div>)}
                    {monthlyBilling === '1' && history.query.keyword === 'add' && (<div className="flex flex-row w-full mb-9">
                                
                        <label className=" font-medium text-gray-200 w-1/4">
                           Service  <span className="text-red-600">*</span>
                        </label>
                        <div className="flex flex-col w-3/4">
                            <Select
                                name="serviceBilling"
                                options={serviceBilling}
                                onChange={handleChangeServiceBilling}
                                value={
                                    serviceBilling.find((op:any) => {
                                        return op.value === idServiceBilling
                                    })
                                }
                            />
                        </div>
                    </div>)}
                    <div className="mt-2">
                                <CKEditor
                        activeClass="p10"
                        content={note}
                        events={{
                            "change": onChange
                        }}
                    />
                    </div>
                </div>
                <div className="flex justify-end w-full" style={{ marginTop: 16 }}>
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
    
    let datum: any = [];
    let edit: any = [];
    let serviceBilling: any = [];
    if (ctx.query.keyword !== 'add') {
        try {
            const getData = await Api.get(Api.apiUrl + `management/tenant/${ctx.query.keyword}`);
            if (getData.status === 200) {
                edit = getData.data.result;
            }else{
                edit=[];
            }
        } catch (err) { }
        
       
    }
    else {
        try {
            const getData = await Api.get(Api.apiUrl + `management/service?page=${1}&type=1&perpage=50`);
            if (getData.status === 200) {
                serviceBilling = getData.data.result;
            }else{
                serviceBilling=[];
            }
        } catch (err) {}
    }
    try {
        const getData = await Api.get(Api.apiUrl + `management/service?page=${1}&type=0&perpage=50`);
        if (getData.status === 200) {
            datum = getData.data.result;
        }else{
            datum=[];
        }
    } catch (err) { }
     
    return { 
        props:{datum,edit,serviceBilling}
    }
}
export default FormTenant;