import { ReactNode } from "react";
import { useHostURL } from "@/lib/urls";
import { ProteinRecord } from "@/lib/types";
import FeatureCard from "@/components/FeatureCard";
import { VariantContextProvider } from "@/components/contexts/useVariantContext";
import FeaturesPanel from "@/components/FeaturesPanel";
import SelectedVariantInfo from "@/components/SelectedVariantInfo";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Link from "next/link";
import LaunchIcon from "@mui/icons-material/Launch";
import { Metadata } from "next";
import fetchVariantsServerSide from "@/lib/fetchVariantsServerSide";

export const metadata: Metadata = {
    title: 'Missense3D DB Alphafold - Variant'
}

export default async function VariantsLayout({ children, params }: { children: ReactNode; params: { uniprot: string } }) {

        return (
            <main className='flex flex-col w-full items-center gap-6'>
                <div className="flex flex-col items-center w-full lg:w-fit gap-6">
                    {children}
                </div>
            </main>
        );

}
