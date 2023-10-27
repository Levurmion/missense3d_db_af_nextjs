import { useDBURL } from "@/lib/urls";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/singleton/prisma";

export async function GET(req: NextRequest, { params }: {params: {uniprot: string}}) {

    const { uniprot } = params

    const prismaResponse = await prisma.proteins.findFirst({
        select: {
            gene_name: true,
            uniprot: true,
            length: true,
            protein_name: true,
            missense_variants: {
                select: {
                    uniprot: false,
                    wildtype: true,
                    mutant: true,
                    position: true,
                    m3d_predictions: {
                        select: {
                            algorithm_version: true,
                            created_at: true,
                            damaging: true,
                            disulphide_breakage: true,
                            buried_Pro_introduced: true,
                            clash: true,
                            buried_hydrophilic_introduced: true,
                            buried_charge_introduced: true,
                            secondary_structure_altered: true,
                            buried_charge_switch: true,
                            disallowed_phi_psi: true,
                            buried_charge_replaced: true,
                            buried_Gly_replaced: true,
                            buried_H_bond_breakage: true,
                            buried_salt_bridge_breakage: true,
                            cavity_altered: true,
                            buried_exposed_switch: true,
                            cis_pro_replaced: true,
                            gly_in_a_bend: true
                        }
                    },
                    alphafold_metrics: {
                        select: {
                            uniprot: false,
                            position: false,
                            plddt_5A: true,
                            plddt_window_31: true,
                            pae_5A: true,
                            num_neighbours_5A: true
                        }
                    },
                    clinvar: {select: {annotation: true}},
                    genetic_variants: {
                        select: {
                            hgvs_g: true,
                            rs_id: true,
                            uniprot: false,
                            position: false,
                            wildtype: false,
                            mutant: false,
                            gnomadg_v3_1_2_af: {
                                select: {
                                    allele_frequency: true,
                                    hgvs_g: false
                                }
                            }
                        }
                    }
                },
                where: {
                    m3d_predictions: { some:{} }
                }
            }
        },
        where: {
            uniprot: {
                equals: uniprot
            }
        }
    })
    
    if (prismaResponse === null) {
        return new Response(null, {status: 204})
    }

    return NextResponse.json(prismaResponse)

}