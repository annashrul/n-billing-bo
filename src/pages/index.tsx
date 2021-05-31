import React from 'react';
import Layout from 'Layouts'
import { NextPageContext } from 'next'
import nookies from 'nookies'

import Api from 'lib/httpService';
import Helper from 'lib/helper';


const Dashboard: React.FC = () => {

  return (
      <Layout title="Dashboard">
        <div className="container mt-6 lg:px-6 md:px-3 mx-auto xs:px-2 sm:px-2 grid mb-20">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Dashboard
          </h2>
          {/* CARD SECTION */}
          
        </div>
      </Layout>
  );
}


export async function getServerSideProps(ctx:NextPageContext) {
  // Parse
  const cookies = nookies.get(ctx)
  if(!cookies._nbilling){
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }else{
    Api.axios.defaults.headers.common["Authorization"] = Helper.decode(cookies._nbilling);
  }

  return { props:{
      cookies,
    }
  }
}

export default Dashboard