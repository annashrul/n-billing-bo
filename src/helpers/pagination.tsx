import React, { useState } from 'react'
import { IoPlay} from 'react-icons/io5'

type Props = {
    totalPage?: number;
    totalDate?: number;
    page?: number;
    count?: number;
    step?: number;
	onNext?: () => void;
	onPrev?: () => void;
	handlGotoPage?: (page: number) => void;
}

const PaginationQ: React.FC<Props> = (props) => {
    const [pageNumber, setPageNumber] = useState<number[]>([])
    const [pageNumberWithDots, setPageNumberWithDots] = useState<Array<number | "...">>([])
    let delta=0;
    let left=0;
    let right = 0;
    React.useEffect(() => {
        const curr=props.page===undefined?1:props.page;
        delta = props.step || 2;
        left = curr- delta;
        right = curr+ delta + 1;
        for (let i = 1; i <= props.totalPage!; i++) {
            if (i == 1 || i == props.totalPage || (i >= left && i < right)) {
                 setPageNumber(prev => [...prev, i])
            }
        }
        return () => {
            setPageNumber([])
        }
    },[props]);

    React.useEffect(() => {
        let l:number=0;
        for (let i of pageNumber) {
            if (l) {
                if (i - l === 2 || i - l !== 1) {
                    setPageNumberWithDots(prev => [...prev, '...'])
                }
            }
            setPageNumberWithDots(prev => [...prev,i])
            l = i;
        }
        return () => {
            setPageNumberWithDots([])
        }
    }, [pageNumber])
    return (
        <div className="flex justify-end mt-5 pr-4">
            <div className="flex flex-row items-center gap-4">
                <span className="text-gray-400 font-semibold">Page {props.page} of {props.totalPage}</span>
                <IoPlay size={24} onClick={() => {((props.page! - 1) !== 0)&&props.onPrev && props.onPrev()}} className={`transform -rotate-180${props.page! > 1 && " cursor-pointer hover:text-gray-400" || ""} text-gray-400`} />
                {
                    pageNumberWithDots.map((v, index) => {
                        return <div key={index} onClick={() => typeof v === 'number' && (props.handlGotoPage && props.handlGotoPage(v))} className={`${v === props.page && "bg-gray-600 text-white" || "text-gray-400"}  rounded font-semibold hover:bg-gray-600 hover:text-white cursor-pointer text-center p-1 h-7 w-7`} style={{fontSize: 14}}>
                            <span>{v}</span>
                        </div>
                    })
                }
                {
                    <IoPlay size={24} onClick={() => {props.totalPage! > props.page! && props.onNext && props.onNext()}} className={`transform ${props.totalPage! > props.page! && " cursor-pointer hover:text-gray-400" || ""} text-gray-400`} />
                }
            </div>
        </div>
    )
}

export default PaginationQ
