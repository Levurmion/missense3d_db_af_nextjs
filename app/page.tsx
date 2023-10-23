import Image from 'next/image'
import SearchBar from '@/components/SearchBar'

export default function Home() {

  return (
    <>
      {/* Hero Section */}
      <div className='flex flex-col items-center w-4/5 my-auto'>

        {/* Hero Text */}
        <h1 className='w-full text-5xl font-semibold mb-4'>
          Search the Human Proteome
        </h1>

        {/* SearchBar wrapper */}
        <div className='flex flex-row w-full h-10 sm:h-12 2xl:h-14 text-lg sm:text-xl lg:text-2xl'>
          <SearchBar placeholder='gene, protein, or Uniprot ID' examples={['LDLR', 'low-density lipoprotein receptor', 'P01130']}/>
        </div>

        <p className='inline text-xl max-w-[75ch] mt-32 text-center'>
          <span className='font-semibold'>Missense3D-DB Alphafold</span> is a database of pre-computed Missense3D predictions of naturally-occurring missense variants evaluated on Alphafold models across the human proteome.
        </p>

      </div>
    </>
  )
}
