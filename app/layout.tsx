import NavigationMenu from '@/components/client/NavigationMenu'
import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Missense3D DB Alphafold',
  description: 'A database of naturally-occurring missense variant effect predictions evaluated on Alphafold models.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col gap-8`}>
        <nav className="flex flex-row bg-slate-200 relative justify-between items-center w-full p-2 sm:p-4 border-b border-slate-300">

            <Link href='\' prefetch className='flex h-12 2xl:h-16 overflow-hidden relative aspect-[9/2]'>
              <Image fill src='/missense3d-db-logo.png' alt='missense3d db logo' className='object-contain'></Image>
            </Link>

            {/* nav options */}
            <NavigationMenu breakpoint={1024}/>

        </nav>

        {/* container for children */}
        <div className='flex flex-col w-full h-fit px-4 xl:px-8 2xl:px-0 2xl:w-[85vw] items-center my-auto py-6 justify-start'>
          {children}
        </div>

        <footer className='flex flex-col sm:flex-row gap-4 w-full items-center justify-center sm:justify-between bg-slate-200 p-4 2xl:p-6 border-t border-slate-300'>
              <div className='flex h-10 sm:h-10 2xl:h-14 aspect-[4/1] overflow-hidden relative'>
                <Image fill src='/imperial_college_london_logo.png' alt='Imperial College London' className='object-contain'></Image>
              </div>
              <div className='flex flex-col text-sm sm:text-base 2xl:text-lg sm:text-right text-center'>
                <p className='font-semibold'>Structural Bioinformatics Group</p>
                <p>Department of Life Sciences</p>
              </div>
        </footer>
      </body>
    </html>
  )
}
