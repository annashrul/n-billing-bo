import React from 'react';

interface iButton {
  title: string;
  style?: string;
  size?: string;
  color:string;
  handleClick?: () => void;
}
const Auth: React.FC<iButton> = ({ title,color,style,size,handleClick }) => {
  let uk = "py-2 px-8 text-lg"
  if(size==='sm') uk= "py-1 px-1 text-xs" 
  return (
        <button 
        onClick={handleClick}
        className={(style===undefined?'':style)+" "+( "bg-"+color+"-600 hover:bg-"+color+"-500")+" "+uk+" border-0  focus:outline-none rounded"}
        >
            {title}
        </button>
  );
};
export default Auth;
