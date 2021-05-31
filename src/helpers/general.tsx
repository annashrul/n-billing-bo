

import { MdDoneAll, MdClose} from 'react-icons/md';
import moment from 'moment';

export const status = (val:any) => {
    if (parseInt(val) === 0) {
        return <MdClose size={24} className="cursor-pointer" color={'#9E9E9E'}/>
    }
    else {
        <MdDoneAll size={24} className="cursor-pointer" color={'#9E9E9E'}/>
    }
}

export const onlyDate = (val:any) => {
    return moment(val).format("DD/MM/YYYY")
}
export const dateAndTime = (val:any) => {
    return moment(val).format('LLL');
}

export const btnSave = (disable:boolean,classname:string) => {
    return <button disabled={disable} className={`rounded text-white font-sans font-medium ${disable && 'bg-gray-400 cursor-not-allowed' || 'bg-yellow-400'}  px-3 py-2.5 ${classname}`}>Save</button>

}