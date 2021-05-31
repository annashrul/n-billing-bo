import React from 'react';
import Helper from 'lib/helper';

interface iNominal {
  Poin: string;
  cb:(val:string)=>void;
  selected:boolean;
}
const Skeleton: React.FC<iNominal> = ({Poin,cb,selected}) => {
    const style=selected?'p-5 text-gray-700 dark:text-gray-200 bg-old-gold focus:outline-none':'p-5 text-gray-700 dark:text-gray-200 border border-old-gold focus:outline-none'
  return (
    <button onClick={(event)=>{event.preventDefault();cb(Poin)}} className={style}>{Helper.numFormat(Poin)}</button>
  );
};
export default Skeleton;
