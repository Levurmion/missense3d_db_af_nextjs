"use client";

import { getMissense3DPredictions } from "@/lib/utilities";
import { useVariantContext } from "./contexts/useVariantContext";
import { MissenseVariantRecord, GeneticVariantRecord, Missense3DRecord } from "@/lib/types";
import FeaturesPanel from "./FeaturesPanel";

export default function SelectedVariantInfo() {
    const [selectedVariant, setSelectedVariant] = useVariantContext();

    // if a variant exists and was selected
    if (selectedVariant) {
        const { wildtype, mutant, position, clinvar, genetic_variants } = selectedVariant;
        const m3dPrediction = getMissense3DPredictions(selectedVariant, false) as Missense3DRecord;

        if (clinvar) {
            clinvar.annotation = clinvar.annotation.replaceAll("_", " ");
        }

        return (
            <div className='flex flex-col gap-4 w-full grow bg-white rounded-sm shadow-md text-sm md:text-xl lg:text-[1.1vw] 2xl:text-[0.8vw] xl:leading-[1.232vw] 2xl:leading-[1.12vw] overflow-hidden'>
                {/* card header */}
                <h2 className='flex flex-row items-center py-[2%] px-[3%] bg-pickled-bluewood-400'>
                    <VariantsInfoPredictionBadge prediction={m3dPrediction.damaging} />
                    <span className='text-xl md:text-4xl lg:text-[1.6vw] 2xl:text-[1vw] font-medium text-white'>
                        {wildtype} {"->"} {mutant} <span className='text-slate-100 text-base md:text-2xl lg:text-[1.2vw] 2xl:text-[0.75vw]'>{position}</span>
                    </span>
                </h2>
                {/* card contents */}
                <section className='flex flex-col px-[3%] pb-[3%] justify-between grow gap-4'>
                    <h3 className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <p className='font-medium text-slate-800'>ClinVar annotation</p>
                            <p className='font-normal text-slate-500'>{clinvar ? (clinvar?.annotation ? clinvar.annotation : "unavailable") : "unavailable"}</p>
                        </div>

                        {/* genetic variants */}
                        <div className='flex flex-col'>
                            <p className='flex flex-row justify-between font-medium text-slate-800'>
                                <span>genetic variants</span>
                                <span>allele frequency</span>
                            </p>
                            <ul className='font-normal text-slate-500'>
                                {genetic_variants
                                    ? genetic_variants.map((geneticVariant) => {
                                          return (
                                              <li key={geneticVariant.hgvs_g} className='flex fle-row justify-between'>
                                                  <span>{geneticVariant.hgvs_g}</span>
                                                  <span>
                                                      {geneticVariant.gnomadg_v3_1_2_af ? geneticVariant.gnomadg_v3_1_2_af.allele_frequency : "unavailable"}
                                                  </span>
                                              </li>
                                          );
                                      })
                                    : "unavailable"}
                            </ul>
                        </div>
                    </h3>
                    <div className='flex flex-row'>
                        <FeaturesPanel />
                    </div>
                </section>
            </div>
        );
    } else {
        return (
            <div className='flex flex-col w-full text-base 2xl:text-lg'>
                <h3 className='mb-2 text-2xl 2xl:text-4xl font-medium'>{"No variants predicted yet. We're working on it!"}</h3>
            </div>
        );
    }
}

function VariantsInfoPredictionBadge({ prediction }: { prediction: boolean | "N/A" }) {
    if (prediction === true) {
        return (
            <span className='text-red-700 bg-red-200 px-2 py-0.5 md:px-3 md:py-1 lg:px-[0.5vw] lg:py-[0.2vw] me-4 font-medium rounded-full'>pathogenic</span>
        );
    } else if (prediction === false) {
        return (
            <span className='text-green-700 bg-green-200 px-2 py-0.5 md:px-3 md:py-1 lg:px-[0.5vw] lg:py-[0.2vw] me-4 font-medium rounded-full'>benign</span>
        );
    } else if (prediction === "N/A") {
        return (
            <span className='text-slate-700 bg-slate-200 px-2 py-0.5 md:px-3 md:py-1 lg:px-[0.5vw] lg:py-[0.2vw] me-4 font-medium rounded-full'>
                unavailable
            </span>
        );
    }
}
