import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex flex-row h-32 md:h-40 lg:h-24 2xl:h-32 bg-slate-200 relative justify-center items-center w-full">
          {/* navbar content container */}
          <div className="flex flex-col lg:flex-row w-full 2xl:w-[70vw] h-full items-center justify-center">

            <Link href='\' prefetch className='flex h-1/2 lg:h-2/3 overflow-hidden relative aspect-[9/2] lg:ml-6 flex-shrink-0 mt-4 mb-2'>
              <Image fill src='/missense3d-db-logo.png' alt='missense3d db logo' className='object-contain'></Image>
            </Link>

            {/* nav options */}
            <div className='h-full flex flex-row font-semibold text-sm sm:text-lg lg:text-xl lg:ml-auto gap-4 md:gap-6 xl:gap-8 lg:mr-6 items-center align-middle'>
              <Link href='/'>Documentation</Link>
              <Link href='/'>Statistics</Link>
              <Link href='/'>Contact</Link>
              <Link href='/'>Missense3D</Link>
            </div>

          </div>
        </nav>

        {/* container for children */}
        <div className='flex flex-col w-full h-fit 2xl:w-[70vw] items-center my-auto py-6 justify-start'>
          {children}
        </div>

        <footer className='flex flex-col lg:flex-row w-full h-20 sm:h-28 items-center justify-center bg-slate-200'>

            {/* footer content container */}
            <div className="flex flex-row w-full 2xl:w-[70vw] h-full items-center justify-center">
              <div className='flex h-[40%] aspect-[4/1] overflow-hidden relative flex-shrink-0 ml-3 sm:ml-6'>
                <Image fill src='/imperial_college_london_logo.png' alt='Imperial College London' className='object-contain'></Image>
              </div>
              <div className='flex flex-col ml-auto text-sm sm:text-lg text-right mr-3 sm:mr-6'>
                <p className='font-semibold'>Structural Bioinformatics Group</p>
                <p>Department of Life Sciences</p>
              </div>
            </div>

        </footer>
      </body>
    </html>
  )
}
