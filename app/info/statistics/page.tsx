import styles from './page.module.scss'

export default function StatisticsPage () {

    return (
        <>
            <h1 className='font-bold'>Data Statistics</h1>

            <section className='flex flex-col gap-4 leading-snug'>
                <h2 className='font-bold text-[60%]'>Source Files</h2>
                <div className="flex flex-col gap-2 text-[50%]">
                    <div>
                        <h3 className="font-semibold">missense variants</h3>
                        <p>
                            The list of human missense variants collated in the database were derived from the Uniprot <i>homo_sapiens_variation.txt</i> repository, version 05-2023.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">ClinVar annotations</h3>
                        <p>
                            ClinVar annotations for missense variants mined from <i>homo_sapiens_variation.txt</i> were obtained through the Ensembl Variant Effect Predictor (VEP).
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">minor allele frequencies</h3>
                        <p>
                            Alleles resulting in missense substitutions were mapped onto the human GRCh38 build. Minor allele frequencies therefore corresponded to records held in the GnomAD v3.1.2 database.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">missense variants</h3>
                        <p>
                            The list of human missense variants collated in the database were derived from the Uniprot <i>homo_sapiens_variation.txt</i> repository, version 05-2023.
                        </p>
                    </div>
                </div>
            </section>

            <section className='flex flex-col gap-4 leading-snug'>
                <h2 className='font-bold text-[60%]'>Database Contents</h2>
                <div className="flex flex-col gap-2 text-[50%]">
                    <table className="w-fit">
                        <tbody className={styles.databaseTable}>
                            <tr>
                                <td>proteins</td>
                                <td>20,423</td>
                            </tr>
                            <tr>
                                <td>missense variants</td>
                                <td>6,714,653</td>
                            </tr>
                            <tr>
                                <td>genetic variants</td>
                                <td>7,272,196</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className='text-[50%]'>
                    *The current demo version only hosts 116,878 missense variants. Many proteins would therefore currently have no predicted variants.
                </p>
            </section>
        </>
    )
}