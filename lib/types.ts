export type MissenseVariantRecord = {
    uniprot?: string
    wildtype: AminoAcid
    mutant: AminoAcid
    position: number
    m3d_predictions?: Array<Missense3DRecord>
    alphafold_metrics?: AlphafoldMetric | null
    clinvar?: ClinvarRecord | null
    genetic_variants?: Array<GeneticVariantRecord> | null
}

export type ProteinRecord = {
    gene_name: string
    uniprot: string
    length: number
    protein_name: string
    missense_variants?: Array<MissenseVariantRecord> | null
}

export type Missense3DRecord = {
    algorithm_version: string
    created_at: Date
    damaging: boolean
    disulphide_breakage: boolean
    buried_Pro_introduced: boolean
    clash: boolean
    buried_hydrophilic_introduced: boolean
    buried_charge_introduced: boolean
    secondary_structure_altered: boolean
    buried_charge_switch: boolean
    disallowed_phi_psi: boolean
    buried_charge_replaced: boolean
    buried_Gly_replaced: boolean
    buried_H_bond_breakage: boolean
    buried_salt_bridge_breakage: boolean
    cavity_altered: boolean
    buried_exposed_switch: boolean
    cis_pro_replaced: boolean
    gly_in_a_bend: boolean
}

export type AlphafoldMetric = {
    plddt_5A: number
    plddt_window_31: number
    pae_5A: number
    num_neighbours_5A: number
}

export type ClinvarRecord = {
    annotation: string
}

export type GeneticVariantRecord = {
    hgvs_g: string
    rs_id: string | null
    gnomadg_v3_1_2_af: AlleleFrequency | null
}

export type AlleleFrequency = {
    allele_frequency: number
}

export type AminoAcid = 'ALA' | 'ARG' | 'ASN' | 'ASP' | 'CYS' | 'GLN' | 'GLU' | 'GLY' | 'HIS' | 'ILE' | 'LEU' | 'LYS' | 'MET' | 'PHE' | 'PRO' | 'SER' | 'THR' | 'TRP' | 'TYR' | 'VAL' | 'SEC';
