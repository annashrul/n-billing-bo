import React, {useState} from "react";
import Layout from 'Layouts'
import { } from '@windmill/react-ui'
import {useRouter} from 'next/router'
import SubHeader from "helpers/subHeader";
 import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Switch} from 'antd';
import { handlePost } from "lib/handleAction";
import Api from 'lib/httpService';
import { NextPageContext } from 'next'
import nookies from 'nookies'
import moment from 'moment';
import { btnSave, dateAndTime, decode, rmDot, status, swalWithCallback, toCurrency } from "helpers/general";
import 'antd/dist/antd.css';
type InitialForm = {
    id_billing: string;
    isChange: string;
    period: string;
    due_date: string;
    amount: string;
    service: string;
}





const DetailBilling: React.FC = () => {
    const history = useRouter();
    const [isChange,setIsChange]= useState(false);

    const TenantValidation = isChange?yup.object().shape({
        period: yup.number()
            .typeError("the number of months does not match")
            .positive("A period can't start with a minus")
            .integer("A period can't include a decimal point")
            .min(1),
        amount: yup.string().required("Amount is required"),
        due_date: yup.string()
        .required('due date is required')
        
    }) : yup.object().shape({})
    
    const { register, handleSubmit, errors, setValue, control, trigger, unregister, clearErrors, formState, getValues, reset, setError, watch } = useForm<InitialForm>({
		resolver: yupResolver(TenantValidation),
		shouldUnregister: true,
		criteriaMode: "all",
		mode: "all"
    });
   

    const onSubmit: SubmitHandler<InitialForm> = async (data:any) => {
        let url = Api.apiClient + `management/billing/perpanjang`;
        let parseData = {
            id_billing: history.query.id,
            isChange:isChange?1:0,
            period:data.period===undefined?'':data.period,
            due_date:data.due_date==='-'?'':data.due_date,
            amount:data.amount==='-'?'':rmDot(data.amount),
            service:!isChange?'':history.query.id_service
        };
        await handlePost(url, parseData, (datum, msg) => {
            console.log(datum);
            swalWithCallback(msg, () => history.back())
        });
    }

   
    

   
    return (
        <Layout title={`Perpanjang Billing` }>
            
            <div className="container grid  lg:px-6 py-5 mx-auto">
                <div className="flex justify-between">
                    <SubHeader
                        title={`Billing / Perpanjang Billing`}
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
                        
                        <div className="flex flex-row w-full mb-10">
                            <label className="font-medium text-gray-200 w-1/4">
                                Update Billing
                            </label>
                                <Switch onChange={(e) => {
                                    setIsChange(e)
                                }} defaultChecked={isChange} style={{ border: '1px solid white' }} />
                        </div>
                        <div className="flex flex-row w-full mb-9">
                            <label className="font-medium text-gray-200 w-1/4">
                                Due Date  <span className="text-red-600">*</span>
                            </label>
                            <div className="flex flex-col w-3/4">
                                {
                                    isChange ? (
                                            <>
                                            <input name="due_date" onChange={(e) => {setValue('due_date', e.target.value)  }} ref={register} type="date" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                                            <span className="text-red-700">{errors.due_date?.message}</span>
                                            </>

                                        ): (
                                        <label className="font-medium text-gray-200 w-1/4">
                                            {moment(history.query.due_date).format('l')}
                                        </label>
                                    )
                                }    
                                
                            </div>
                        </div>
                        <div className="flex flex-row w-full mb-9">
                            <label className="font-medium text-gray-200 w-1/4">
                                Periode ( month ) <span className="text-red-600">*</span>
                            </label>
                            <div className="flex flex-col w-3/4">
                                {
                                    isChange ? (
                                            <>
                                                <input name="period" onChange={(e) => {
                                                    if (parseInt(e.target.value) > 12) {
                                                        setError('period',{type:'digit',message:'value must be 1 - 12'})
                                                    }
                                                    setValue('period', e.target.value)
                                                }} ref={register} type="number" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                                                <span className="text-red-700">{errors.period?.message}</span>
                                            </>

                                    ): (
                                        <label className="font-medium text-gray-200 w-1/4">
                                            {history.query.period}
                                        </label>
                                    )
                                }    
                                
                            </div>
                        </div>
                        <div className="flex flex-row w-full mb-9">
                            <label className="font-medium text-gray-200 w-1/4">
                                Amount <span className="text-red-600">*</span>
                            </label>
                            <div className="flex flex-col w-3/4">
                                {
                                    isChange ? (
                                            <>
                                             <input name="amount" onChange={(e) => {setValue('amount', toCurrency(e.target.value))  }} ref={register} type="text" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input" />
                                                <span className="text-red-700">{errors.amount?.message}</span>
                                            </>
                                        ) : (
                                        <label className="font-medium text-gray-200 w-1/4">
                                                    {
                                                        toCurrency(history.query.amount)
                                                    }
                                        </label>
                                    )
                                }    
                            </div>
                        </div>
                        <div className="flex flex-row w-full mb-9">
                            <label className="font-medium text-gray-200 w-1/4">
                                Service
                            </label>
                            <div className="flex flex-col w-3/4">
                                 <label className="font-medium text-gray-200 w-1/4">
                                    {history.query.service}
                                </label>
                            </div>
                            </div>
                        <div className="flex flex-row w-full mb-9">
                            <label className="font-medium text-gray-200 w-1/4">
                                Tenant
                            </label>
                            <div className="flex flex-col w-3/4">
                                 <label className="font-medium text-gray-200 w-1/4">
                                    {history.query.tenant}
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-row w-full mb-9">
                            <label className="font-medium text-gray-200 w-1/4">
                                Server name
                            </label>
                            <div className="flex flex-col w-3/4">
                                 <label className="font-medium text-gray-200 w-1/4">
                                    {history.query.server_name}
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-row w-full mb-9">
                            <label className="font-medium text-gray-200 w-1/4">
                                Status
                            </label>
                            <div className="flex flex-col w-3/4">
                                {status(history.query.status)}
                            </div>
                            </div>
                        <div className="flex flex-row w-full mb-9">
                            <label className="font-medium text-gray-200 w-1/4">
                                Created at
                            </label>
                                <div className="flex flex-col w-3/4">
                                     <label className="font-medium text-gray-200 w-1/4">
                                    {dateAndTime(history.query.created_at)}
                                </label>
                                
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end w-full" style={{ marginTop: 16}}>
                            <div className="flex flex-row">
                                {
                                    btnSave(isChange?(!formState.isDirty || !formState.isValid):false,``)
                                }
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
        Api.axios.defaults.headers.common["Authorization"] = decode(cookies._nbilling);
    }
    
    return { 
        props:{}
    }
}
export default DetailBilling;