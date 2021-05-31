import React from 'react';
import Route from './routes';
import Menu from 'components/Common/menu';
import SubMenu from 'components/Common/submenu';
import { useRouter } from 'next/router';

interface iSidebar {
  isOpen: Boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<iSidebar> = ({ isOpen, toggleSidebar }) => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <>
      <aside className="overflow-y-auto bg-white dark:bg-gray-800 flex-shrink-0 w-64 z-20 mt-16 md:mt-0 hidden  md:block ">
        <div className="pb-2 text-gray-500 dark:text-gray-400">
          <div className="bg-white dark:bg-gray-800 sticky top-0 z-10">
            <a className="flex items-center justify-center" href="#">
              <img className="w-16 h-16" src="/logo.png" alt="" aria-hidden="true" />
            </a>
          </div>
          <ul className="mt-2">
            {
              Route.map((item, x) => {
                if(item.routes.length>0) return <SubMenu key={x}  icon={item.icon} title={item.title} link={item.link}  routes={item.routes}/>
                else return  <Menu key={x} icon={item.icon} title={item.title} link={item.link} isActive={path === item.link || `/${path.split("/")[1]}`===item.link} />
              })
            }
          </ul>
        </div>
      </aside>
      <div>
        {/* Mobile sidebar */}
        {/* Backdrop */}
        <div
          className={
            isOpen
              ? 'fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center md:hidden'
              : 'hidden'
          }
          onClick={toggleSidebar}
        />
        <aside
          className={
            isOpen
              ? 'fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden'
              : 'hidden'
          }
        >
          <div className="text-gray-500 dark:text-gray-400">
            <ul className="mt-6">
              {
                Route.map((item, x) => {
                  if(item.routes.length>0) return <SubMenu key={x}  icon={item.icon} title={item.title} link={item.link}  routes={item.routes}/>
                  else return  <Menu key={x} icon={item.icon} title={item.title} link={item.link} isActive={path === item.link} />
                })
              }
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
