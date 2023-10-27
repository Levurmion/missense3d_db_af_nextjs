import VariantsList from "@/components/client/VariantsList"
import VariantsTable from "@/components/client/VariantsTable/VariantsTable"
import fetchVariantsServerSide from "@/lib/fetchVariantsServerSide"
import { ProteinRecord } from "@/lib/types"
import { useHostURL } from "@/lib/urls"

export default async function VariantsPage ({ params }: { params: {uniprot: string} }) {

    const proteinVariants = await fetchVariantsServerSide(params.uniprot)
    
    if (proteinVariants !== null) {

        const missenseVariants = proteinVariants.missense_variants

        if (missenseVariants) {
            return (
                <>
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