import React from 'react'
import { MdChevronLeft} from 'react-icons/md'

type Props = {
  title: string;
  link?: boolean;
  isIcon?: boolean;
  onClick?: () => void;
}

const SubHeader: React.FC<Props> = (props) => {
    return (
        <nav aria-label="breadcrumb " className="border-l-4 border-yellow-400 pt-3 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 w-full">
            <ol className="breadcrumb">
              <li className="breadcrumb-item justify-between w-full flex flex-row">
                {
                  props.link && 
                  <a
                    
                    className="cursor-pointer flex flex-row items-center font-semibold text-gray-700 dark:text-gray-200"
                    onClick={props.onClick}
                  >
                {
                  props.isIcon||props.isIcon===undefined&&<MdChevronLeft size={24} />
                }    
                
                    <span className={`${!props.isIcon&&'ml-2'}`}>{props.title}</span>
                  </a>
                }
              </li>
            </ol>
          </nav>
    )
}

export default SubHeader
