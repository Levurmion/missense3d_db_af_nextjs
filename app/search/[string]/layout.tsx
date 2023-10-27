import { ReactNode } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Missense3D DB Alphafold - Search'
}

export default async function SearchLayout ({ children }: { children: ReactNode }) {

    return (
        <div className="flex flex-col items-center">
            {children}
        </div>
    )
}