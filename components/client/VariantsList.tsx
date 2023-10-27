"use client";

import { MissenseVariantRecord } from "@/lib/types";
import Missense3DPredictionBadge from "../Missense3DPredictionBadge";
import { MouseEvent, useState } from "react";
import ReactModal from "react-modal";
import { Styles } from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { extractFlaggedFeatures } from "@/lib/utilities";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import LaunchIcon from '@mui/icons-material/Launch';
import Link from "next/link";

const modalStyle: Styles = {
    overlay: {
        zIndex: 100,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    content: {
        height: "70vh",
        top: "50%",
        left: "50%",
        width: "80vw",
        maxWidth: "400px",
        transform: "translate(-50%, -50%)",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    },
};

export default function VariantsList({ data, uniprot }: { data: Array<MissenseVariantRecord>; uniprot: string }) {
    const [modalData, setModalData] = useState<null | MissenseVariantRecord>(null);

    const handleListItemSelect = (selectedIdx: number) => {
        setModalData(data[selectedIdx]);
    };

    const handleCloseModal = () => {
        setModalData(null);
    };

    const preventBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const allowBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    return (
        <>
            <ReactModal isOpen={modalData === null ? false : true} style={modalStyle} onAfterOpen={preventBodyScroll} onAfterClose={allowBodyScroll}>
                <button onClick={handleCloseModal} className='flex w-full'>
                    <CloseIcon />
                </button>
                <h3 className='flex items-center gap-2 text-2xl font-semibold'>
                    <Missense3DPredictionBadge prediction={modalData?.m3d_predictions?.[0].damaging ?? "N/A"} /> {modalData?.wildtype}-{modalData?.position}-
                    {modalData?.mutant}
                </h3>
                <div className='flex flex-col w-full gap-2 text-lg md:text-xl'>
                    <div className='flex flex-col gap-1'>
                        <h4 className='font-medium'>ClinVar annotations</h4>
                        <span className='flex flex-col p-1 md:p-2 bg-slate-200 text-[90%] leading-tight border border-slate-300 rounded-sm shadow-sm'>
                            {modalData?.clinvar?.annotation.replaceAll("_", " ") ?? "unavailable"}
                        </span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h4 className='font-medium'>genetic variants</h4>
                        {modalData?.genetic_variants?.map((geneticVariant) => {
                            return (
                                <span key={geneticVariant.hgvs_g} className='flex flex-col p-1 md:p-2 bg-slate-200 text-[90%] leading-tight border border-slate-300 rounded-sm shadow-sm'>
                                    <span>{geneticVariant.hgvs_g}</span>
                                    <span>rsID: {geneticVariant?.rs_id ?? "unavailable"}</span>
                                    <span>gnomAD MAF: {geneticVariant?.gnomadg_v3_1_2_af?.allele_frequency ?? "unavailable"}</span>
                                </span>
                            );
                        })}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h4 className='font-medium'>structural alerts</h4>
                        <ul className='flex flex-col p-1 md:p-2 bg-slate-200 text-[90%] leading-tight border border-slate-300 rounded-sm shadow-sm'>
                            {modalData?.m3d_predictions?.[0].damaging
                                ? extractFlaggedFeatures(modalData.m3d_predictions[0]).map((flaggedFeature) => {
                                      return (
                                          <li key={flaggedFeature} className='text-red-500 font-medium'>
                                              <PriorityHighIcon fontSize='inherit' />
                                              {flaggedFeature}
                                          </li>
                                      );
                                  })
                                : "none"}
                        </ul>
                    </div>
                </div>
                <Link
                    prefetch
                    href={`http://missense3d.bc.ic.ac.uk/batch2023/${uniprot}/${uniprot}_${modalData?.position}_A_${modalData?.wildtype}_${modalData?.mutant}/html/1.html`}
                    className="relative text-xl font-medium px-2 py-1 rounded-sm text-sky-700 text-center bg-sky-200 border border-sky-400"
                    target='_blank'>
                    view mutant structure <LaunchIcon fontSize="inherit"/>
                </Link>
            </ReactModal>

            <div className='flex flex-col w-full h-fit gap-2 text-lg md:text-xl'>
                <span className=' text-white bg-slate-600 px-2 py-[0.25%] w-fit shadow-md whitespace-nowrap'>{data.length} variants</span>
                <div className='flex flex-col w-full h-[60vh] overflow-y-scroll bg-white shadow-md border'>
                    <ul className='flex flex-col w-full [&>*:nth-child(odd)]:bg-slate-100'>
                        {data.map((variant, idx) => {
                            return (
                                <VariantCard
                                    key={`${variant.position}_${variant.wildtype}_${variant.mutant}`}
                                    missenseVariant={variant}
                                    idx={idx}
                                    notifySelect={handleListItemSelect}
                                />
                            );
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
            className='flex flex-col px-2 py-1 text-lg border-b border-slate-200 gap-1'
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
