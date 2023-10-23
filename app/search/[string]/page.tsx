
import {useHostURL} from "@/lib/urls"
import ProteinCard from "@/components/ProteinCard"
import { ProteinRecord } from "@/components/ProteinCard"
import ScrollYBox from "@/components/ScrollYBox"
import Link from "next/link"
import { sleep } from "@/lib/utilities"

export default async function SearchPage ({ params }: {params: {string: string}}) {

    const {string} = params
    const hostURL = useHostURL()
    const searchString = params.string.replaceAll('%20', ' ')

    const matchingProteinsResponse = await fetch(`${hostURL}/api/proteins/${string}`)
    
    if (matchingProteinsResponse.status === 200) {
        const matchingProteinsJSON: Array<ProteinRecord> = await matchingProteinsResponse.json()
        const numResults = matchingProteinsJSON.length
        return (
            <>
                <h1 className="text-xl sm:text-4xl text-left w-full sm:px-2 pb-2 sm:pb-4">
                    <p className="font-semibold">{numResults} result(s)</p> 
                    <p className="text-xs sm:text-xl "><span className="font-semibold">search:</span> <span className="text-gray-600">{searchString}</span></p>
                </h1>
                <div className="flex flex-col relative w-full h-full overflow-hidden
                    rounded-sm
                    bg-white
                    shadow-lg shadow-gray-300
                ">
                    <ScrollYBox>
                        <ul>
                            {
                                matchingProteinsJSON.map(proteinRecord => {
                                    return <ProteinCard key={proteinRecord.uniprot} {...proteinRecord} />
                                })
                            }
                        </ul>
                    </ScrollYBox>
                </div>
            </>
        )
    } else if (matchingProteinsResponse.status === 204) {
        return (
            <section className="flex flex-col h-full w-full max-w-[75ch] lg:max-w-[75%] xl:w-3/4 p-4 sm:p-8 items-center justify-center">
                <h1 className="text-xl sm:text-4xl text-left w-full sm:px-2 pb-2 sm:pb-4">
                    <p className="font-semibold">0 result(s)</p> 
                    <p className="text-xs sm:text-xl "><span className="font-semibold">search:</span> <span className="text-gray-600">{searchString}</span></p>
                </h1>
                <div className="flex flex-col relative items-center justify-center w-full h-[50vh] tall-mobile:h-[60vh] md:h-[60vh] bg-whiteshadow-lg shadow-gray-300 bg-white shadow-lg p-6">
                    <p className="inline text-2xl sm:text-4xl text-center mb-6">no matches found...</p>
                    <Link href='/' className="text-2xl underline text-regal-blue-600 hover:text-violet-600 transition-all">go back</Link>
                </div>
            </section>
        )
    }

}