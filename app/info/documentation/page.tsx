export default function DocumentationPage() {
    return (
        <>
            <h1 className='font-bold'>Documentation</h1>

            <section className='flex flex-col text-[50%] gap-2 leading-snug'>
                <ol className='list-disc list-inside'>
                    <li>
                        <a className="underline" href='#about-missense3d'>What is Missense3D?</a>
                    </li>
                    <li>
                        <a className="underline" href='#about-missense3d-db-af'>What is Missense3D-DB Alphafold?</a>
                    </li>
                    <li>
                        <a className="underline" href='#missense3d-features'>Structural Features</a>
                    </li>
                </ol>
            </section>

            <a id='about-missense3d'>
                <section className='flex flex-col gap-4 leading-snug'>
                    <h2 className='font-bold text-[60%]'>What is Missense3D?</h2>
                    <p className="text-[50%]">
                        Missense3D was conceived as a structure-based missense variant effect prediction algorithm that performs atomic-level calculations on{" "}
                        <i>in-silico</i> generated mutants of experimental protein structures. The pathogenicity of a missense substitution is determined by the
                        evaluation of 16 expertly-curated potential structural disruptions known to be commonly deleterious to protein function and/or
                        structural integrity. Unlike recent breakthroughs in deep-learning strategies, Missense3D is committed to provide mechanistic
                        explanations for pathogenic variant predictions as to facilitate further experimental investigations.
                    </p>
                </section>
            </a>

            <a id='about-missense3d-db-af'>
                <section className='flex flex-col gap-4 leading-snug'>
                    <h2 className='font-bold text-[60%]'>What is Missense3D-DB Alphafold?</h2>
                    <div className="flex flex-col gap-2 text-[50%]">
                        <p>
                            Recent advances in deep learning strategies to conquer the protein folding problem have led to the conception of{" "}
                            <strong>Alphafold</strong> as the leading template-free protein structure prediction algorithm in CASP14. By inferring the implications
                            of spatial proximity on residue co-evolution, <strong>Alphafold</strong> was able to produce very high quality models of structurally
                            uncharacterized proteins solely through sequence-based information extracted from multiple sequence alignments. This dramatically
                            expanded the coverage of useful models for further research in protein structure bioinformatics.
                        </p>
                        <p>
                            <strong>Missense3D-DB Alphafold</strong> collates predictions for over 6.5 million naturally-occurring human missense variants evaluated
                            on <strong>Alphafold</strong> models. This includes pre-computed local averages of pLDDT and PAE scores within 5Å of every query residue
                            whereby a pLDDT 5Å &ge; 60 was found to be a good indicator of local modelling accuracy, implying at least some globular folding
                            characteristics.
                        </p>
                    </div>
                </section>
            </a>

            <a id='missense3d-features'>
                <section className='flex flex-col gap-4 leading-snug'>
                    <h2 className='font-bold text-[60%]'>Potentially Damaging Structural Features</h2>
                    <div className="flex flex-col text-[50%] gap-2">
                        <div>
                        <h3 className='font-semibold'>Buried / exposed switch</h3>
                        <p>
                            The substitution results in a change between buried and exposed state of the target variant residue. (RSA &lt; 9% for buried and the
                            difference between RSA has to be at least 5%.)
                        </p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Buried Gly replaced</h3>
                        <p>The substitution replaces a buried glycine.</p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Buried H-bond breakage</h3>
                        <p>
                            The substitution breaks all side-chain / side-chain H-bond(s) and/or side-chain / main-chain H-bond(s) formed by the wild type which was
                            buried. The maximum H-bond N-O length is 3.9 angstrom.
                        </p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Buried Pro introduced</h3>
                        <p>The substitution introduces a buried proline.</p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Buried charge introduced</h3>
                        <p>The substitution replaces a buried uncharged residue with a charged residue.</p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Buried charge replaced</h3>
                        <p>The substitution replaces a buried charged residue with an uncharged residue.</p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Buried charge switch</h3>
                        <p>The substitution switches the charge (+/-) of the buried residue.</p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Buried hydrophilic introduced</h3>
                        <p>The substitution replaces a buried hydrophobic residue with a hydrophilic residue.</p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Buried salt bridge breakage</h3>
                        <p>The substitution breaks a salt bridge formed by wild-type which was buried. The maximum N-O bond length is 5.0 angstrom.</p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Cavity altered</h3>
                        <p>
                            The substitution leads to an expansion or contraction of the cavity volume of &gt; 70 angstrom^3. Cavity also refers to a pocket on the
                            surface.
                        </p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Cis Pro replaced</h3>
                        <p>A cis proline in the wild type is replaced in the mutant.</p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Clash</h3>
                        <p>The mutant structure has a MolProbity clash score &gt; 30 and the increase in clash score is &gt; 18 compared to the wild type.</p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Disallowed phi/psi</h3>
                        <p>The mutant residue is in outlier region while the wild-type residue is in the favoured or allowed region.</p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Disulphide breakage</h3>
                        <p>The substitution breaks a disulphide bond that was in the wild-type. The maximum S-S length for the bond is 3.3 Å</p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Gly in a bend</h3>
                        <p>The wild-type residue is glycine and is located in a bend curvature (reported 'S' in DSSP).</p>
                        </div>
                        <div>
                        <h3 className='font-semibold'>Secondary structure altered</h3>
                        <p>A substitution results in a change in the DSSP secondary structure assignment at the variant position.</p>
                        </div>
                    </div>
                    <p className="text-[50%]">
                        Hydrophobic residues are as follows: A, C, F, I, L, M, V and W; hydrophilic residues are as follows: D, E, H, K, N, Q and R, with the others being neutral (G, P, S, T and Y). D and E are treated as negatively charged and H, K and R as positively charged. We note that there are several variations to these definitions of residue properties.
                    </p>
                </section>
            </a>
        </>
    );
}
