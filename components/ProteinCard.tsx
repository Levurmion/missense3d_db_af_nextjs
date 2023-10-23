'use client'

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

export interface ProteinRecord {
    gene_name: string;
    uniprot: string;
    length: number;
    protein_name: string;
}

export default function ProteinCard ({ gene_name, uniprot, length, protein_name}: ProteinRecord) {

    const router = useRouter()

    const handleCardClick = (event: MouseEvent<HTMLElement>) => {
        const selectedUniprot = event.currentTarget.id
        router.push(`/variants/${selectedUniprot}`)
    }

    return (
        <li 
            className="flex flex-col relative w-full overflow-hidden px-3 py-3 border-t-[1px] z-40 group hover:z-50 hover:-translate-y-1 hover:shadow-xl hover:cursor-pointer transition-all text-gray-700"
            id={uniprot}
            onClick={handleCardClick}
        >
            <h2 className="text-normal sm:text-xl font-normal"><span className="font-semibold text-gray-800">{uniprot}</span> &bull; {gene_name} &bull; {length} aa</h2>
            <h4 className="text-xs sm:text-lg font-normal whitespace-nowrap text-gray-500">{protein_name}</h4>

            {/* mask overflowing text on the right end */}
            <div className="absolute right-0 bottom-0 h-full w-[7.5%] bg-gradient-to-l from-40% from-white">
            </div>

            {/* show see variants text on hover */}
            <div className="top-[35%] right-8 opacity-0 text-lg absolute xl:group-hover:z-20 xl:group-hover:opacity-100 xl:group-hover:right-0 transition-all pr-5">
                <KeyboardDoubleArrowRightIcon /> see variants
            </div>
        </li>
    )
}