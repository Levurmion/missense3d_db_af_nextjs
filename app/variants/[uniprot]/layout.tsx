import { ReactNode } from "react";
import { useHostURL } from "@/lib/urls";
import { ProteinRecord } from "@/lib/types";
import { getProteinNames } from "@/lib/utilities";
import FeatureCard from "@/components/FeatureCard";
import { VariantContextProvider } from "@/components/contexts/useVariantContext";
import FeaturesPanel from "@/components/FeaturesPanel";
import SelectedVariantInfo from "@/components/SelectedVariantInfo";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Link from "next/link";
import LaunchIcon from "@mui/icons-material/Launch";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Missense3D DB Alphafold - Variant'
}

export default async function VariantsLayout({ children, params }: { children: ReactNode; params: { uniprot: string } }) {
    const hostUrl = useHostURL();
    const proteinVariantsRes = await fetch(`${hostUrl}/api/variants/${params.uniprot}`);

    if (proteinVariantsRes.status === 200) {
        const proteinVariantsJSON: ProteinRecord = await proteinVariantsRes.json();
        const { protein_name, uniprot, length, missense_variants, gene_name } = proteinVariantsJSON;
        const { name, altNames } = getProteinNames(protein_name);

        return (
            <main className='flex flex-col w-full items-center gap-6'>
                <div className="flex flex-col w-full lg:w-fit gap-6">
                    <header className='flex flex-col w-full gap-1 xl:gap-2'>
                        <h1 className='flex flex-row text-xl w-fit xl:text-2xl 2xl:text-3xl items-center flex-wrap shadow-md shadow-slate-300'>
                            <div className='font-semibold text-white bg-red-600 py-0.5 px-2 xl:py-1 xl:px-3'>{uniprot}</div>
                            <div className='font-medium text-white bg-slate-600 py-0.5 px-2 xl:py-1 xl:px-3'>{gene_name}</div>
                        </h1>
                        <h2 className="text-lg xl:text-xl 2xl:text-2xl w-full font-medium leading-tight">
                            {length}aa &bull; {name} &bull; {
                                <Link href={`https://www.uniprot.org/uniprotkb/${uniprot}/entry`} className="text-sky-600 underline"
                                target='_blank'>
                                    uniprot <LaunchIcon fontSize="inherit"/>
                                </Link>
                            }
                        </h2>
                    </header>
                    {children}
                </div>
            </main>
        );
    }
}
