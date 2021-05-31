import Cookies from "js-cookie";
import atob from 'atob';
import moment from 'moment';
import Swal from 'sweetalert2'
import { NextPageContext } from 'next'
import nookies from 'nookies'
import Api from 'lib/httpService'
const removeHtml=(str:string)=>{
  // var parser = new DOMParser();
  // return parser.parseFromString(str,'text/html')
  const regex = /(&#39;|&nbsp;|<([^>]+)>)/gi;
  let cek = str.replace(regex, '');
  return cek.replace('/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g','')

  // return str.replace(/(<([^>]+)>)/gi, "");
}

const decode=(str:string)=>{return atob(str);}

const setCookie=(name:string,data:string)=>{
    Cookies.set(name, btoa(data), { expires: 1 });
}

const removeCookie=(name:string)=>{
    Cookies.remove(name);
}

const isEmptyObj=(obj:Object)=>{
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const rupiahFormat=(angka:string)=>{
    if(angka===undefined) return 0;
    const number_string = angka?.toString().replace(/[^,\d]/g, '');
    const split = number_string.split('.');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return "Rp "+rupiah;
}

const numFormat=(angka:string)=>{
    if(angka===undefined) return 0;
    const number_string = angka;
    const split = number_string.split('.');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return rupiah+" PW";
}


const calculateCountdown=(startDate:string) => {
    const end =moment(startDate).add(50, 'days');
    const now =moment();
    let diff = (Date.parse(`${end}`) - Date.parse(`${now}`)) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return `${addLeadingZeros(`${timeLeft.days}`)} Hari ${addLeadingZeros(`${timeLeft.hours}`)} Jam ${addLeadingZeros(`${timeLeft.min}`)} Menit`;
}

export const addLeadingZeros=(value:string) => {
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
}

export const formatDate=(val:string,isfull:boolean)=>{
  const format=isfull?"DD MMMM YYYY HH:mm:ss":"DD MMMM YYYY"

  return moment(val).format(format);
}

export const mySwallOption = (msg:string,callback:()=>void) => {
  // Swal.fire({
  //   allowOutsideClick: false,
  //   title: 'Are you sure?',
  //   text: "You won't be able to revert this!",
  //   type: 'warning',
    // showCancelButton: true,
    // confirmButtonColor: '#3085d6',
    // cancelButtonColor: '#d33',
    // confirmButtonText: 'Yes, delete it!'
  // }).then((result) => {
  //     if (result.value) {
          
  //     }
  // })

  Swal.fire({
      title   : 'Information !!!',
      html    :`${msg}`,
      icon    : 'warning',
      allowOutsideClick: false,
      confirmButtonColor  : '#3085d6',
      confirmButtonText: `Oke`,
      showCancelButton: true,
      cancelButtonColor: '#d33',
  }).then(async (result) => {
      if (result.value) {
        callback();
      }
  })

}

export const mySwalWithCallback=(msg:string,callback:()=>void)=>{
  Swal.fire({
      title   : 'Information !!!',
      html    :`${msg}`,
      icon    : 'warning',
      allowOutsideClick: false,
      confirmButtonColor  : '#3085d6',
      confirmButtonText   : `Oke`,
  }).then(async (result) => {
      if (result.value) {
        callback();
      }
  })
}
export const mySwal=(msg:string)=>{
  Swal.fire({
      title   : 'Perhatian !!!',
      html    :`${msg}`,
      icon    : 'warning',
      allowOutsideClick: false,
      confirmButtonColor  : '#3085d6',
      confirmButtonText   : `Oke`,
  });
}

export const handleRoute=(ctx:NextPageContext)=>{
    const cookies = nookies.get(ctx)
    if(!cookies._prowara){
        // Router.push('/auth/login');
        return {
          redirect: {
              destination: '/auth/login',
              permanent: false,
          },
        }
    }else{
        Api.axios.defaults.headers.common["Authorization"] = decode(cookies._prowara);
    }
}


export default {
  removeHtml,
  numFormat,
  setCookie,
  removeCookie,
  decode,
  isEmptyObj,
  formatDate,
  calculateCountdown,
  rupiahFormat,
  mySwalWithCallback,
  mySwal,
  handleRoute,
  mySwallOption,
  
};
