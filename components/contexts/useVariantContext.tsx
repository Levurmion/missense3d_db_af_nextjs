'use client'

import { createContext, ReactNode, useContext, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { MissenseVariantRecord } from "@/lib/types";

export const VariantContext = createContext<[MissenseVariantRecord | null, Dispatch<SetStateAction<MissenseVariantRecord | null>>]|null>(null)

export function VariantContextProvider ({ children, value }: { children: ReactNode, value: MissenseVariantRecord | null }) {

    const [variantContext, setVariantContext] = useState<MissenseVariantRecord | null>(value)

    return (
        <VariantContext.Provider value={[variantContext, setVariantContext]}>
            {children}
        </VariantContext.Provider>
    )

}

export function useVariantContext (): [MissenseVariantRecord | null, Dispatch<SetStateAction<MissenseVariantRecord | null>>] {
    const variantContext = useContext(VariantContext)

    if (variantContext) {
        return variantContext
    } else {
        throw new Error('useVariantContext() need to be used within the scope of <VariantContextProvider />')
    }
}