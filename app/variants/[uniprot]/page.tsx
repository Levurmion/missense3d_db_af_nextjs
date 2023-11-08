import VariantsList from "@/components/client/VariantsList"
import VariantsTable from "@/components/client/VariantsTable/VariantsTable"
import fetchVariantsServerSide from "@/lib/fetchVariantsServerSide"
import { ProteinRecord } from "@/lib/types"
import { useHostURL } from "@/lib/urls"
import { getProteinNames } from "@/lib/utilities";
import Link from "next/link"
import LaunchIcon from "@mui/icons-material/Launch"
import VariantsPageLoading from "@/components/client/LoadingIndicator"

export default async function VariantsPage ({ params }: { params: {uniprot: string} }) {

    const proteinVariants = await fetchVariantsServerSide(params.uniprot)
    
    if (proteinVariants !== null) {

        const { protein_name, uniprot, length, missense_variants, gene_name } = proteinVariants;
        const { name, altNames } = getProteinNames(protein_name);

        const missenseVariants = proteinVariants.missense_variants

        if (missenseVariants) {
            return (
                <>
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
                    <div className="hidden lg:flex flex-row w-full h-fit">
                        <VariantsTable data={missenseVariants as any} uniprot={proteinVariants.uniprot}/>
                    </div>
                    <div className="flex lg:hidden flex-row w-full h-fit">
                        <VariantsList data={missenseVariants as any} uniprot={proteinVariants.uniprot}/>
                    </div>
                </>
            )
        } 
    }


}