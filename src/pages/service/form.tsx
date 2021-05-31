import React, {useEffect,useState} from "react";
import "react-intl-tel-input/dist/main.css";
import Layout from 'Layouts'
import { } from '@windmill/react-ui'
import {useRouter} from 'next/router'
import SubHeader from "helpers/subHeader";
 import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
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
import { ActionMeta, GroupTypeBase, InputActionMeta, OptionTypeBase, ValueType } from './types';

type InitialForm = {
    title: string;
    type: string;
}


const TenantValidation = yup.object().shape({
	title: yup.string().required("title is required"),
})



const FormService: React.FC = (datum:any) => {
    const history = useRouter();
    const { register, handleSubmit, errors, setValue, control, trigger, unregister, clearErrors, formState, getValues, reset, setError, watch } = useForm<InitialForm>({
		resolver: yupResolver(TenantValidation),
		shouldUnregister: true,
		criteriaMode: "all",
		mode: "all"
    });
     useEffect(() => {
         setValue('type', history.query.type === '0' ? 'tenant' : 'billing');
         if (history.query.id !== undefined) {
             setValue('title', history.query.title);
         }
    }, [])

    const onSubmit: SubmitHandler<InitialForm> = async (data:any) => {
        let url = Api.apiClient + `management/service`;
        let parseData = {
            title: data.title,
            type:history.query.type
        };
        if (history.query.id === undefined) {
            await handlePost(url, parseData, (datum,msg) => {
                helper.mySwalWithCallback(msg, () => history.back())
            });
        }
        else {
            await handlePut(url + '/' + history.query.id,parseData, (datum,msg) => {
                helper.mySwalWithCallback(msg, () => history.back())
            })
        }
        
    }

   
    return (
        <Layout title={`Form ${history.query.id===undefined?'Add':'Edit'} Service` }>
            
            <div className="container grid  lg:px-6 py-5 mx-auto">
                <div className="flex justify-between">
                    <SubHeader
                        title={`Tenant / ${history.query.id===undefined?'Add':'Edit'} Service`}
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
                        <div className="flex flex-row w-full">
                            <label className="font-sans font-medium text-gray-200 w-1/4">
                                Type  <span className="text-red-600">*</span>
                            </label>
                            <div className="flex flex-col w-3/4 mt-2">
                                <input readOnly={true} name="type" ref={register} type="text" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input"/>
                            </div>
                        </div>
                        <div className="flex flex-row w-full">
                            <label className="font-sans font-medium text-gray-200 w-1/4">
                                Title  <span className="text-red-600">*</span>
                            </label>
                            <div className="flex flex-col w-3/4 mt-2">
                                <input name="title" onChange={(e) => { setValue('title', e.target.value) }} ref={register} type="text" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-nonee dark:text-gray-300 form-input"/>
                                <span className="text-red-700">{errors.title?.message}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end w-full" style={{ marginTop: 16 }}>
                        <div className="flex flex-row">
                            <button className="rounded text-white bg-yellow-400 font-sans font-medium bg-orange1-main hover:bg-yellow-400 px-3 py-2.5">Save</button>
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
    // if (ctx.query.keyword !== 'add') {
    //     try {
    //         const getData = await Api.get(Api.apiUrl + `management/tenant/${ctx.query.keyword}`);
    //         if (getData.status === 200) {
    //             edit = getData.data.result;
    //         }else{
    //             edit=[];
    //         }
    //     } catch (err) { }
       
    // }
    // try {
    //     const getData = await Api.get(Api.apiUrl + `management/service?page=${1}&type=0&perpage=50`);
    //     if (getData.status === 200) {
    //         datum = getData.data.result;
    //     }else{
    //         datum=[];
    //     }
    // } catch (err) {}
    return { 
        props:{datum,edit}
    }
}
export default FormService;