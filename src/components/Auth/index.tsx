import styled from 'styled-components';
import React from 'react';

const AuthStyle = styled.div<{ subTitle?: string }>`
  margin: auto;
  display: block;
  width: 100%;
  max-width: 35rem;
  a {
    font-weight: 600;
  }
  & > h1 {
    margin-bottom: ${({ subTitle }) => (subTitle ? '0.75' : '2')}rem;
    margin-top: 0;
    text-align: center;
  }
  & > p {
    margin-bottom: 2rem;
    text-align: center;
  }
  form {
    width: 100%;
    & > *:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
`;

interface AuthProps {
  title: string;
  subTitle?: string;
}
const Auth: React.FC<AuthProps> = ({ subTitle, title, children }) => {
  return (
        <AuthStyle subTitle={subTitle}>
          <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
          <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <div className="flex flex-col mt-10 overflow-y-auto md:flex-column">
                <img
                  src='http://ptnetindo.com:6692/images/cef7888fec54e4c910e34020ad9eb615/site/site_2104215050HLAFM.png'
                  width="150px"
                  alt={title}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}/>
                {subTitle && <p className='text-center text-white mt-2 text-md dark:text-gray-400 text-bold'>{subTitle}</p>}
                {children}
            </div>
          </div>
        </div>
        </AuthStyle>
  );
};
export default Auth;
