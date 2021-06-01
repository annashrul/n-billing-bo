import NProgress from 'nprogress'; //nprogress module
import Api from 'lib/httpService';
import Swal from 'sweetalert2';
import helper from './helper';

const strNetworkError = 'a network error occurred!';
const strServerError = 'a server error occurred';
const strSuccessSaved = 'Data has been saved.';
const strFailedSaved = 'Oppss .. data failed to saved';


export const loading =  (isStatus:boolean=true) => {
  Swal.fire({
    title: 'loading ...',
    html: 'Data checking.',
    willOpen: () => {
      Swal.showLoading();
    },
    showConfirmButton: false,
    willClose: () => {},
  });
  if(!isStatus)  Swal.close();
}

export const handleError = (err: any) => {
  if (err.message === 'Network Error') {
    helper.mySwal(strNetworkError);
  } else {
    if (err.response !== undefined) {
      if (err.response.data.msg !== undefined) {
        helper.mySwal(err.response.data.msg);
      } else {
        helper.mySwal(strServerError);
      }
    }
  }
}

export const handleGet = async (url:string,callback:(data:any)=>void,isLoading:boolean=true)=>{
  if(isLoading)NProgress.start();
  try {
      const getData=await Api.get(url)
      if(isLoading)NProgress.done()
      const datum = getData.data.result;
      callback(datum);
  } catch (err) {
    if (isLoading) NProgress.done()
    handleError(err);
  }
};

export const handlePost = async (url: string,data: any,callback: (datum: any, msg: string) => void) => {
  loading(true);
  try {
    const submitData = await Api.post(url, data);
    setTimeout(function () {
      loading(false);
      const datum = submitData.data;
      if (datum.status === 'success') {
        callback(datum, strSuccessSaved);
      } else {
        callback(datum, strFailedSaved);
      }
    }, 800);
  } catch (err) {
    setTimeout(function () {
      loading(false);
      handleError(err);
    }, 800);
  }
};

export const handlePut = async (url: string,data: any,callback: (datum: any, msg: string) => void) => {
  loading(true);
  try {
    const submitData = await Api.put(url, data);
    setTimeout(function () {
      loading(false);
      const datum = submitData.data;
      if (datum.status === 'success') {
        callback(datum, strSuccessSaved);
      } else {
        callback(datum, strFailedSaved);
      }
    }, 800);
  } catch (err) {
    setTimeout(function () {
      loading(false);
      handleError(err);
    }, 800);
  }
};

export const handleDelete = async (url: string,callback:()=>void) => {
  helper.mySwallOption('Are you sure ?', async() => {
    loading(true);
    try {
      await Api.delete(url);
      callback();
      setTimeout(function () {
        loading(false);
      }, 800);
     

     
    } catch (err) {
      setTimeout(function () {
        loading(false);
        handleError(err);
      }, 800);
    }
  })

};
