"use client";

import { MissenseVariantRecord } from "@/lib/types";
import Missense3DPredictionBadge from "../Missense3DPredictionBadge";
import { MouseEvent, useState } from "react";
import ReactModal from 'react-modal';

export default function VariantsList({ data }: { data: Array<MissenseVariantRecord> }) {

    const [modalData, setModalData] = useState<null | MissenseVariantRecord>(null)

    const handleListItemSelect = (selectedIdx: number) => {
        setModalData(data[selectedIdx])
    };

    const handleCloseModal = () => {
        setModalData(null)
    }

    return (
        <> 
            <ReactModal isOpen={modalData === null ? false : true}>
                <span onClick={handleCloseModal}>close</span>
            </ReactModal>
            <div className='flex flex-col w-full h-fit gap-2 text-lg'>
                <span className=' text-white bg-slate-600 px-2 py-[0.25%] w-fit shadow-md whitespace-nowrap'>{data.length} variants</span>
                <div className='flex flex-col w-full h-[60vh] overflow-y-scroll bg-white shadow-md border'>
                    <ul className='flex flex-col w-full [&>*:nth-child(odd)]:bg-slate-100'>
                        {data.map((variant, idx) => {
                            return <VariantCard key={`${variant.position}_${variant.wildtype}_${variant.mutant}`} missenseVariant={variant} idx={idx} notifySelect={handleListItemSelect}/>;
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export function VariantCard({
    missenseVariant,
    idx,
    notifySelect,
}: {
    missenseVariant: MissenseVariantRecord;
    idx: number;
    notifySelect: (selectedIdx: number) => void;
}) {
    const { wildtype, mutant, position, m3d_predictions, alphafold_metrics } = missenseVariant;

    return (
        <li
            data-idx={idx}
            className='flex flex-col px-[2%] py-[1.5%] text-lg border-b border-slate-200 gap-1'
            onClick={(e: MouseEvent<HTMLLIElement>) => {
                notifySelect(Number(e.currentTarget.getAttribute("data-idx")));
            }}>
            <div className='flex flex-row gap-2 items-center font-semibold w-full text-slate-800'>
                <Missense3DPredictionBadge prediction={m3d_predictions?.[0]?.damaging ?? "N/A"} />
                <span>
                    {position}{" "}
                    <span className='font-medium'>
                        {wildtype}
                        {" -> "}
                        {mutant}
                    </span>
                </span>
            </div>
            <div className='inline items-center text-slate-500 text-[80%] font-medium leading-normal'>
                <span>pLDDT 5Å: {alphafold_metrics?.plddt_5A}</span>
                {" | "}
                <span>PAE 5Å: {alphafold_metrics?.pae_5A}</span>
            </div>
        </li>
    );
}
