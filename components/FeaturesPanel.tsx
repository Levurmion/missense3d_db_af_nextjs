"use client"

import { useVariantContext } from "./contexts/useVariantContext"
import { getMissense3DPredictions } from "@/lib/utilities"
import FeatureCard from "./FeatureCard"
import { Missense3DRecord } from "@/lib/types"

export default function FeaturesPanel () {

    const [variantContext, setVariantContext] = useVariantContext()
    const m3dPredictions = variantContext ? getMissense3DPredictions(variantContext, false) as Missense3DRecord : null

    if (m3dPredictions) {
        return (
            <div className="grid w-full min-h-[350px] aspect-square grid-cols-4 grid-flow-row auto-rows-fr gap-2 text-xs md:text-lg lg:text-[1vw] lg:leading-[1.43vw] 2xl:text-[0.7vw] 2xl:leading-[0.93vw]">
                    <FeatureCard featureName="clash" featureText="blabla" flagged={m3dPredictions.clash}/>
                    <FeatureCard featureName="disallowed phi/psi" featureText="blabla" flagged={m3dPredictions.disallowed_phi_psi}/>
                    <FeatureCard featureName="cis-Pro replaced" featureText="blabla" flagged={m3dPredictions.cis_pro_replaced}/>
                    <FeatureCard featureName="cavity altered" featureText="blabla" flagged={m3dPredictions.cavity_altered}/>
                    <FeatureCard featureName="disulphide breakage" featureText="blabla" flagged={m3dPredictions.disulphide_breakage}/>
                    <FeatureCard featureName="secondary structure altered" featureText="blabla" flagged={m3dPredictions.secondary_structure_altered}/>
                    <FeatureCard featureName="Gly in a bend" featureText="blabla" flagged={m3dPredictions.gly_in_a_bend}/>
                    <FeatureCard featureName="buried H-bond breakage" featureText="blabla" flagged={m3dPredictions.buried_H_bond_breakage}/>
                    <FeatureCard featureName="buried charge introduced" featureText="blabla" flagged={m3dPredictions.buried_charge_introduced}/>
                    <FeatureCard featureName="buried salt bridge breakage" featureText="blabla" flagged={m3dPredictions.buried_salt_bridge_breakage}/>
                    <FeatureCard featureName="buried Pro introduced" featureText="blabla" flagged={m3dPredictions.buried_Pro_introduced}/>
                    <FeatureCard featureName="buried Gly replaced" featureText="blabla" flagged={m3dPredictions.buried_Gly_replaced}/>
                    <FeatureCard featureName="buried hydrophilic introduced" featureText="blabla" flagged={m3dPredictions.buried_hydrophilic_introduced}/>
                    <FeatureCard featureName="buried charge switch" featureText="blabla" flagged={m3dPredictions.buried_charge_switch}/>
                    <FeatureCard featureName="buried charge replaced" featureText="blabla" flagged={m3dPredictions.buried_charge_replaced}/>
                    <FeatureCard featureName="buried-exposed switch" featureText="blabla" flagged={m3dPredictions.buried_exposed_switch}/>
            </div>
        )
    }
}