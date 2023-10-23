import VariantsTable from "@/components/VariantsTable/VariantsTable"
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
                <div className="h-full">
                    <VariantsTable data={missenseVariants}/>
                </div>
            )
        } else {
            <div className="h-full w-full">variants unavailable</div>
        }
    }


}