import React from 'react'
import { MdChevronLeft} from 'react-icons/md'

type Props = {
  title: string;
  link?: boolean;
  onClick?: () => void;
}

const SubHeader: React.FC<Props> = (props) => {
    return (
        <nav aria-label="breadcrumb " className="pt-3 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 w-full">
            <ol className="breadcrumb">
              <li className="breadcrumb-item justify-between w-full flex flex-row">
                {
                  props.link && 
                  <a
                    
                    className="cursor-pointer flex flex-row items-center font-sans font-semibold text-gray-700 dark:text-gray-200"
                    onClick={props.onClick}
                  >
                    <MdChevronLeft size={24} />
                    <span>{props.title}</span>
                  </a>
                }
              </li>
            </ol>
          </nav>
    )
}

export default SubHeader
