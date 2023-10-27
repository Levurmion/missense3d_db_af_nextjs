'use client'

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, forwardRef } from 'react';
import { ProteinRecord } from '@/lib/types';

// eslint-disable-next-line react/display-name
const ProteinCard = forwardRef<HTMLLIElement, ProteinRecord>((props, ref) => {

    const { gene_name, uniprot, length, protein_name } = props

    const router = useRouter()

    const handleCardClick = (event: MouseEvent<HTMLElement>) => {
        const selectedUniprot = event.currentTarget.id
        router.push(`/variants/${selectedUniprot}`)
    }

    return (
        <li 
            className="relative flex flex-col justify-center bg-white w-full py-2 px-3 border-b group hover:cursor-pointer hover:bg-slate-200"
            id={uniprot}
            onClick={handleCardClick}
            ref={ref}
        >
            <span className="text-normal sm:text-xl font-normal"><span className="font-semibold text-gray-800">{uniprot}</span> &bull; {gene_name} &bull; {length} aa</span>
            <span className="text-xs sm:text-lg font-normal whitespace-nowrap text-gray-500">{protein_name}</span>

            {/* mask overflowing text on the right end */}
            <div className="absolute right-0 bottom-0 h-full w-[7.5%] bg-gradient-to-l from-40% from-white group-hover:from-slate-200">
            </div>

            {/* show see variants text on hover */}
            <div className="top-[35%] right-8 opacity-0 text-lg absolute xl:group-hover:z-20 xl:group-hover:opacity-100 xl:group-hover:right-0 transition-all pr-5">
                <KeyboardDoubleArrowRightIcon /> see variants
            </div>
        </li>
    )
})

export default ProteinCard