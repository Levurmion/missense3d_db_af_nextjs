import { ReactNode } from "react"

export default async function SearchLayout ({ children }: { children: ReactNode }) {

    return (
        <div className="flex flex-col items-center">
            {children}
        </div>
    )
}