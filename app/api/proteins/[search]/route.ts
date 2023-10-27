import { NextResponse, NextRequest } from "next/server";
import { ProteinRecord } from "@/lib/types";
import { getProteinNames } from "@/lib/utilities";
import { prisma } from "@/singleton/prisma";

export async function GET(req: NextRequest, { params }: {params: {search: string}}) {
    
    const searchString = params.search
    const searchParams = req.nextUrl.searchParams
    const offset = searchParams.get('offset')
    const limit = searchParams.get('limit')

    // prevent search with 'HUMAN' in the string as all gene names have '_HUMAN' suffix
    searchString.toUpperCase().replace('HUMAN','')

    if (searchString === '') {
        return new Response(null, {status: 204})
    }

    const prismaResponse = await prisma.proteins.findMany({
        skip: offset && limit ? Number(offset) : undefined,
        take: offset && limit ? Number(limit) : undefined,
        select: {
            gene_name: true,
            uniprot: true,
            length: true,
            protein_name: true,
            missense_variants: false
        },
        where: {
            OR: [
                {
                    uniprot: {
                        contains: searchString
                    }
                },
                {
                    gene_name: {
                        contains: searchString
                    }
                },
                {
                    protein_name: {
                        contains: searchString
                    }
                }
            ]
        },
    })

    if (prismaResponse.length === 0) {
        return new Response(null, {status: 204})
    }

    // remove alternate names
    const proteinsFormatted = prismaResponse.map(proteinRecord => {
        const proteinName = proteinRecord.protein_name
        const {name} = getProteinNames(proteinName)
        proteinRecord.protein_name = name

        return proteinRecord
    })
    
    return NextResponse.json(proteinsFormatted)
}