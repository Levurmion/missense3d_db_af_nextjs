import Image from 'next/image'
import SearchBar from '@/components/SearchBar'

export default function Home() {

  return (
    <>
      {/* Hero Section */}
      <div className='flex flex-col items-center w-4/5 my-8'>

        {/* Hero Text */}
        <h1 className='w-full text-5xl font-semibold mb-4'>
          Search the Human Proteome
        </h1>

        {/* SearchBar wrapper */}
        <div className='flex flex-row w-full h-10 sm:h-12 2xl:h-14 text-lg sm:text-xl lg:text-2xl'>
          <SearchBar placeholder='gene, protein, or Uniprot ID' examples={['BRCA1', 'Breast cancer type 1 susceptibility protein', 'P38398']}/>
        </div>

        <p className='inline text-lg sm:text-xl max-w-[75ch] mt-32 text-center'>
          <span className='font-semibold'>Missense3D-DB Alphafold</span> is a database of pre-computed Missense3D predictions of naturally-occurring missense variants evaluated on Alphafold models across the human proteome.
        </p>

        <p className='inline text-lg sm:text-xl max-w-[75ch] mt-6 text-center'>
          *Publication in writing. This site is a demo version hosting 116,878 missense variants. Mutant structure predictions are also still being generated for all 6.5M variants. The full dataset will be released once our manuscript passes peer-review.
        </p>

      </div>
    </>
  )
}
