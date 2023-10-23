import { NextResponse, NextRequest } from "next/server";
import { ProteinRecord } from "@/components/ProteinCard";
import { getProteinNames } from "@/lib/utilities";
import { useDBURL } from "@/lib/urls";

export async function GET(req: NextRequest, { params }: {params: {search: string}}) {
    
    const searchString = params.search
    const dbURL = useDBURL()

    const matchingProteinsResponse = await fetch(`${dbURL}/proteins/${searchString}`, {cache: 'no-store'})

    if (matchingProteinsResponse.status == 204) {
        return new Response(null, {status: 204})
    }

    const matchingProteinsJSON: Array<ProteinRecord> = await matchingProteinsResponse.json()

    // remove alternate names
    const proteinsFormatted = matchingProteinsJSON.map(proteinRecord => {
        const proteinName = proteinRecord.protein_name
        const {name} = getProteinNames(proteinName)
        proteinRecord.protein_name = name

        return proteinRecord
    })
    
    return NextResponse.json(proteinsFormatted)
}