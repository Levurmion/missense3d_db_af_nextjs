import { ReactNode} from "react";
import {useHostURL} from "@/lib/urls";
import { ProteinRecord } from "@/lib/types";
import { getProteinNames } from "@/lib/utilities";
import FeatureCard from "@/components/FeatureCard";
import { VariantContextProvider } from "@/components/contexts/useVariantContext";
import FeaturesPanel from "@/components/FeaturesPanel";
import SelectedVariantInfo from "@/components/SelectedVariantInfo";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Link from "next/link";

export default async function VariantsLayout({ children, params }: {children: ReactNode, params: { uniprot: string }}) {

    const hostUrl = useHostURL()
    const proteinVariantsRes = await fetch(`${hostUrl}/api/variants/${params.uniprot}`)
    
    if (proteinVariantsRes.status === 200) {
        const proteinVariantsJSON: ProteinRecord = await proteinVariantsRes.json()
        const { protein_name, uniprot, length, missense_variants } = proteinVariantsJSON
        const { name, altNames } = getProteinNames(protein_name)

        return (
            <VariantContextProvider value={missense_variants ? missense_variants[0] : null}>
                <section className="flex flex-col md:grid lg:grid-cols-[2fr_1fr] 2xl:grid-cols-[7fr_3fr] w-full md:px-10 px-3 xl:px-12 gap-6 my-10">

                    {/* protein and variants info */}
                    <div className="flex flex-col gap-8 justify-between">

                        {/* protein info */}
                        <div className="flex flex-col">
                            <h1 className="text-2xl 2xl:text-4xl"><span className="font-semibold">{uniprot}</span> &bull; <span className="font-medium">{length} aa</span></h1>
                            <h2 className="text-lg 2xl:text-2xl mb-2">{name}</h2>
                            <Link 
                                target="_blank" 
                                href={`https://www.uniprot.org/uniprotkb/${uniprot}/entry`}
                                className="w-fit bg-regal-blue-400 hover:bg-regal-blue-500 hover:-translate-y-0.5 hover:shadow-lg transition-all py-1 px-2 rounded-md text-white shadow-md"
                            >
                                view on uniprot <KeyboardDoubleArrowRightIcon />
                            </Link>
                        </div>

                        {/* selected variant info */}
                        {children}
                    </div>
                    <div className="flex flex-col justify-between grow gap-4">
                        <SelectedVariantInfo />
                    </div>
                </section>
            </VariantContextProvider>
        )
    }
}