import { ReactNode } from "react"

export default async function SearchLayout ({ children }: { children: ReactNode }) {

    return (
        <div className="flex flex-col items-center justify-center my-auto p-4 sm:p-8 w-full max-w-[75ch] lg:max-w-[75%] xl:w-3/4 h-[50vh] tall-mobile:h-[60vh] sm:h-[60vh] md:h-[70vh]">

            {children}

        </div>
    )
}