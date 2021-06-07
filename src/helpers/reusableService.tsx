import { handleGet } from "lib/handleAction";
import Api from 'lib/httpService';
import { iService } from "lib/interface";

export const getServiceOption = async (type:string,callback:(res:any)=>void) => {
    let url: string = `management/service?page=1&perpage=50&type=${type}`
    await handleGet(Api.apiClient + url, (data:any) => {
        let tenant: any = [];
        if (data.data.length > 0) {
            data.data.map((val: iService, key: number) => {
                console.log(key)
                tenant.push({value:val.id,label:val.title})
            })
        }
        callback(tenant)
    },false)
}