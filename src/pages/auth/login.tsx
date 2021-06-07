import React from 'react';
import { NextPageContext } from 'next'
import { NextPage } from 'next';
import Sess from "lib/auth";
import nookies from 'nookies'
import Auth from 'components/Auth';
import Layout from 'Layouts';
import { useForm,SubmitHandler } from 'react-hook-form';
import {useRouter} from 'next/router'
import { btnSave } from 'helpers/general';

interface iLogin {
  apiUrl: string;
}
type FormValues = {
  username:string;
  password:string;
};
const Login: NextPage<iLogin> = () => {
  const router = useRouter()

  const [loading, setLoading] = React.useState(false)
  const {register, handleSubmit, errors} = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    setLoading(true);
    Sess.http.post(Sess.http.apiClient+'auth/management', {
      "username":data.username,
      "password":data.password,
    }).then(res => {
      setLoading(false);
      Sess.setUser({
        id: res.data.id,
        username: res.data.username,
      })
      Sess.setToken(res.data.result.token);
      Sess.http.axios.defaults.headers.common["Authorization"] = res.data.result.token;
      router.push('/');
     
    }).catch((e) => {
      setLoading(false);
      console.log(e)
    })
  } 

  const registerOptions = {
    username: { required: "Username is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
  };
 
  return (
    <Layout title="Login">
      <Auth title="Login">
        <div className="flex items-center justify-center pt-3 pb-10 px-6 sm:px-12 md:w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <label className="block mt-4 text-sm">
                <input 
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  name="username"
                  ref={register(registerOptions.username)}
                  placeholder="Username" />
                <small className="text-red-700">
                  {errors.username && errors.username.message}
                </small>
              </label>
              <label className="block mt-4 text-sm">
                <input 
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  name="password"
                  ref={register(registerOptions.password)}
                  type="password"
                  placeholder="Password" />
                 <small className="text-red-700">
                  {errors.password && errors.password.message}
                </small>
              </label>
              {
                btnSave(false,'block w-full mt-7',!loading ? "Login": 'loading ...')
              }
              {/* <button className="block w-full px-4 py-2 mt-7 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-gradient-to-r from-old-gold-400 via-old-gold-500 to-old-gold-600 border border-transparent rounded-lg active:bg-old-gold-500 hover:bg-old-gold-600 outline-none focus:shadow-outline-old-gold dark:text-gray-200 "> */}
                
              {/* </button> */}
            </div>
          </form>
        </div>

      </Auth>
    </Layout>
  );
}
export async function getServerSideProps(ctx:NextPageContext) {
  // Parse
  const cookies = nookies.get(ctx)
  if(cookies._nbilling!==undefined){
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
      // apiUrl:Sess.http.apiUrl,
    }
  }
}

export default Login
