

import { MdDoneAll, MdClose} from 'react-icons/md';
import moment from 'moment';
import {  MdEdit, MdDelete} from 'react-icons/md';

export const status = (val:any) => {
    if (parseInt(val) === 0) {
        return <MdClose size={24} className="cursor-pointer" color={'#9E9E9E'}/>
    }
    else {
        return <MdDoneAll size={24} className="cursor-pointer" color={'#9E9E9E'}/>
    }
}

export const onlyDate = (val:any) => {
    return moment(val).format("DD/MM/YYYY")
}
export const dateAndTime = (val:any) => {
    return moment(val).format('LLL');
}

export const btnSave = (disable:boolean,classname:string,title:string='Save') => {
    return <button disabled={disable} className={`rounded text-white font-sans font-medium ${disable && 'bg-gray-400 cursor-not-allowed' || 'bg-yellow-400'}  px-3 py-2.5 ${classname}`}>{title}</button>

}

export const toCurrency = (angka:any,prefix?:any) => {
    let number_string = angka.replace(/[^,\d]/g, '').toString(),
	split   		= number_string.split(','),
	sisa     		= split[0].length % 3,
	rupiah     		= split[0].substr(0, sisa),
	ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

	if(ribuan){
		let separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}
 
	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
};

export const rmDot = (res:any) => {
    return res.replaceAll(".","")
}

export const td = (val:any,className:any='',onClick?:()=>void) => {
    return <td className={`py-3 px-6 whitespace-nowrap font-normal ${className}`} onClick={onClick}>{val}</td>
}

export const btnEdit = (onClick:()=>void) => {
    return (
        <MdEdit size={24} className="cursor-pointer" color={'#9E9E9E'} onClick={onClick} />
    );
}
export const btnDelete = (onClick:()=>void) => {
    return (
        <MdDelete size={24} className="cursor-pointer" color={'#9E9E9E'} onClick={onClick} />
    );
}
