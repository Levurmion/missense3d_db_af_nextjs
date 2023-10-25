
import {useHostURL} from "@/lib/urls"
import ProteinCard from "@/components/ProteinCard"
import ScrollYBox from "@/components/ScrollYBox"
import Link from "next/link"
import SearchResults from "@/components/client/SearchResults"

export default async function SearchPage ({ params }: {params: {string: string}}) {

    return (
        <div className="flex flex-col items-center">
            <SearchResults searchString={params.string} limit={20}/>
        </div>
    )

}