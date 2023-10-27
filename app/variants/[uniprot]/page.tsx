import VariantsList from "@/components/client/VariantsList"
import VariantsTable from "@/components/client/VariantsTable/VariantsTable"
import { ProteinRecord } from "@/lib/types"
import { useHostURL } from "@/lib/urls"

export default async function VariantsPage ({ params }: { params: {uniprot: string} }) {

    const hostUrl = useHostURL()
    const proteinVariantsRes = await fetch(`${hostUrl}/api/variants/${params.uniprot}`)
    
    if (proteinVariantsRes.status === 200) {
        const proteinVariantsJSON: ProteinRecord = await proteinVariantsRes.json()
        const missenseVariants = proteinVariantsJSON.missense_variants

        if (missenseVariants) {
            return (
                <>
                    <div className="hidden lg:flex flex-row w-full h-fit">
                        <VariantsTable data={missenseVariants} uniprot={proteinVariantsJSON.uniprot}/>
                    </div>
                    <div className="flex lg:hidden flex-row w-full h-fit">
                        <VariantsList data={missenseVariants} uniprot={proteinVariantsJSON.uniprot}/>
                    </div>
                </>
            )
        } 
    }


}