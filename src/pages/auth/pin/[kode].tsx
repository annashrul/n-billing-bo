import React, {useState} from 'react';
import { NextPageContext } from 'next'
import "react-intl-tel-input/dist/main.css";
import { NextPage } from 'next';
import Sess from "lib/auth";
import { useToasts } from 'react-toast-notifications'
import Swal from 'sweetalert2'
import Helper from 'lib/helper';
import {useRouter} from 'next/router'
import nookies from 'nookies'
import Auth from 'components/Auth';
import Layout from 'Layouts';

interface iLogin  {
  // any modifications to the default context, e.g. query types
  kode:string;
}
const Login: NextPage<iLogin> = ({kode}) =>{ 
  const router = useRouter()

  // const cekSess = Sess.getToken();
  // cekSess!==undefined&&router.push('/') 

  const { addToast } = useToasts();
  const [pin, setPin] = useState('');
  const [pinCompare, setPinCompare] = useState('');


  const doBuatPin = async () =>{
    if(pin==='')addToast('PIN tidak boleh kosong.', {appearance: 'error',autoDismiss: true});
    if(pin.length<6)addToast('PIN harus 6 digit angka.', {appearance: 'error',autoDismiss: true});
    else if(pinCompare==='')addToast('PIN Konfirmasi tidak boleh kosong.', {appearance: 'error',autoDismiss: true});
    else if(pin!==pinCompare) addToast('PIN dan PIN Konfirmasi haru sama.', {  appearance: 'error',  autoDismiss: true})
    else{
      Swal.fire({
            title: 'Silahkan tunggu...',
            html: "Mem-verifikasi akun anda.",
            willOpen: () => {
                Swal.showLoading()
            },
            showConfirmButton:false,
            willClose: () => {}
        })

        try {
          const hitLogin=await Sess.http.put(Sess.http.apiClient+'member/'+kode, {
              pin:pin
          })

          setTimeout(
              function () {
                  Swal.close()
                  if(hitLogin.data.status==='success') addToast('PIN berhasil dibuat..', {  appearance: 'success',  autoDismiss: true})
                  router.push('/');
            },800)
        } catch (err) {
          setTimeout(
              function () {
                  Swal.close()
                  // save token to localStorage
                  if (err.message === 'Network Error') {
                    addToast("Tidak dapat tersambung ke server!", {
                      appearance: 'error',
                      autoDismiss: true,
                    })
                      
                  }else{
                    if(err.response.data.msg!==undefined){
                      addToast(err.response.data.msg, {
                          appearance: 'error',
                          autoDismiss: true,
                        })
                    }else{
                      addToast("Kesalahan pada server.", {
                          appearance: 'error',
                          autoDismiss: true,
                        })
                    }
        
                  }
            },800)
        
        }
      }

    }

  return (
    <Layout title="Login">
      <Auth title="Login" subTitle="Demi keamanan, silahkan buat PIN Transaksi anda.">
         <div className="flex items-center justify-center pt-3 pb-10 px-6 sm:px-12 md:w-full">
                <div className="w-full">
                  <label className="block mt-4 text-sm">
                    {/* <span className="text-gray-700 dark:text-gray-400">PIN Transaksi</span> */}
                    <input 
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="fullname"
                      type="number"
                      max={6}
                      value={pin}
                      onChange={(event)=>{
                        const pin=event.target.value;
                        if(pin.length<=6) setPin(pin)
                      }}
                      placeholder="PIN Transaksi" />

                  </label>
                  <label className="block mt-4 text-sm">
                    {/* <span className="text-gray-700 dark:text-gray-400">Ulangi PIN Transaksi</span> */}
                    <input 
                      className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                      name="fullname"
                      type="number"
                      max={6}
                      value={pinCompare}
                      onChange={(event)=>{
                        const pin=event.target.value;
                        if(pin.length<=6) setPinCompare(pin)
                      }}
                      placeholder="Ulangi PIN Transaksi" />
                  </label>

                    <div className={`text-gray-400 italic mt-3 text-xs`}>Note: PIN Transaksi terdiri dari 6 digit angka.</div>
                  <button 
                    className="block w-full px-4 py-2 mt-7 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-gradient-to-r from-old-gold-400 via-old-gold-500 to-old-gold-600 border border-transparent rounded-lg active:bg-old-gold-500 hover:bg-old-gold-600 outline-none focus:shadow-outline-old-gold dark:text-gray-200 " 
                    onClick={doBuatPin} 
                  >
                    Buat Pin Transaksi
                  </button>
                </div>
              </div>

      </Auth>
    </Layout>
  );
}
export async function getServerSideProps(ctx:NextPageContext) {
    // Parse
    const cookies = nookies.get(ctx)
    const { kode } = ctx.query;
    const decodeKode = Helper.decode(kode as string);

    if(cookies._prowara===undefined){
        return {
        redirect: {
            destination: '/',
            permanent: false,
        },
        }
    }
    return { 
        props:{
            cookies,
            kode:decodeKode
        }
    }
}

export default Login
