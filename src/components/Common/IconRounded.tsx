import React from 'react';

interface iIcon {
  icon: string;
  color: string;
}
const Icon: React.FC<iIcon> = ({ icon,color }) => {
  return (
    <div
        className={"rounded-full h-12 w-12 flex items-center justify-center mr-3 text-xl bg-old-gold-100 dark:bg-old-gold"}
        >
          <i className={'fa fa-'+icon+' text-'+color+'-500 dark:text-'+color+'-100'}/>
    </div>
  );
};
export default Icon;
