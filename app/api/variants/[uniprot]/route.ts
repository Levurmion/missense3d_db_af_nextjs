import { useDBURL } from "@/lib/urls";
import { NextResponse, NextRequest } from "next/server";
import { sleep } from "@/lib/utilities";

export async function GET(req: NextRequest, { params }: {params: {uniprot: string}}) {

    const { uniprot } = params
    const dbURL = useDBURL()

    const variantsResponse = await fetch(`${dbURL}/variants/uniprot/${uniprot}?exclude_null=true&clinvar=true&gnomad=true&protein_name=true`, {cache: 'no-store'})
    const variantsJSON = await variantsResponse.json()

    if (variantsJSON.length === 0) {
        return NextResponse.json({}, {status: 204})
    }

    return NextResponse.json(variantsJSON[0])

}