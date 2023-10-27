'use client'
import useSWR from 'swr'
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import Link from 'next/link'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ErrorIcon from '@mui/icons-material/Error';
import { ProteinRecord } from '@/lib/types';
import ProteinCard from '../ProteinCard';

interface PageProps {
    searchString: string,
    offset: number,
    limit: number
}

async function fetchProteins (url: string) {
    const response = await fetch(url)
    if (response.status === 200) return await response.json() as Array<ProteinRecord>
    else return []
}

export function usePage ( searchString: string, offset: number, limit: number ) {

    const { data, isLoading, error } = useSWR(`/api/proteins/${searchString}?offset=${offset}&limit=${limit}`, fetchProteins)

    if (data) {
        if (data.length > 0) {
            return data
        }
        else return 'no content'
    }
    else if (isLoading) return 'loading'
    else if (error) return 'error'

}

export default function SearchResults({ searchString, limit }: { searchString: string, limit: number }) {
    const [offset, setOffset] = useState(0);
    const [pages, setPages] = useState<Array<ProteinRecord>>([]);
    const containerRef = useRef<null | HTMLDivElement>(null);
    const lastItemRef = useRef<null | HTMLLIElement>(null);
    const numResults = useRef<null | number>(null)
    const proteinListRef = useRef<null | HTMLUListElement>(null);

    const newPage = usePage(searchString, offset, limit);

    useEffect(() => {
        if (newPage && Array.isArray(newPage)) {
            if (numResults.current === null) numResults.current = newPage.length
            setPages(prev => [...prev, ...newPage]);
        }
    }, [newPage]);

    function increaseOffset() {
        setOffset(offset => offset + limit);
    }

    useEffect(() => {

        if (newPage !== undefined && newPage.length >= limit) {
            const intersectionObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) increaseOffset();
                });
            }, {
                root: containerRef.current,
                threshold: 0.5
            });
    
            if (lastItemRef.current) intersectionObserver.observe(lastItemRef.current);
    
            return () => {
                if (lastItemRef.current) intersectionObserver.unobserve(lastItemRef.current);
            };
        }

    }, [offset, pages]);

    function handleRenderContent () {
        if (newPage === 'loading' && pages.length === 0) {
            return (
                <div className='flex flex-col items-center my-auto text-center'>
                    <div className='text-7xl text-slate-600'>
                        <AutorenewIcon fontSize='inherit' className='animate-spin'/>
                    </div>
                    <span className='text-2xl text-slate-800 font-medium animate-pulse'>
                        searching...
                    </span>
                </div>
            )
        }
        else if (newPage === 'error') {
            return (
                <div className='flex flex-col items-center my-auto text-center'>
                    <div className='text-6xl text-red-600'>
                        <ErrorIcon fontSize='inherit'/>
                    </div>
                    <span className='text-2xl text-red-600 font-medium'>
                        unexpected error!
                    </span>
                    <Link href='\' prefetch className='pt-2 underline text-blue-500 text-2xl hover:text-blue-800 transition-all'>
                        {'<-'} home
                    </Link>
                </div>
            )
        }
        else if (newPage === 'no content') {
            return (
                <div className='flex flex-col items-center my-auto text-center'>
                    <h2 className='font-medium'>
                        no matches found
                    </h2>
                    <Link href='\' prefetch className='underline text-blue-500 text-2xl hover:text-blue-800 transition-all'>
                        {'<-'} restart search
                    </Link>
                </div>
            )
        }
        else {
            return (
                <ul className='flex flex-col items-center w-full' ref={proteinListRef}>
                    {
                        pages.map((record, idx) => (
                            <ProteinCard 
                                ref={idx === pages.length - 1 ? lastItemRef : null} 
                                key={record.uniprot + String(idx)} 
                                {...record} 
                            />
                        ))
                    }
                </ul>
            )
        }
    }

    return (
        <main className='flex flex-col gap-2 lg:gap-4'>
            <header className='flex flex-col'>
                <h1 className='text-3xl lg:text-4xl font-semibold'>
                    {searchString.replaceAll('%20', ' ')}
                </h1>
                <h2 className='text-xl lg:text-2xl'>
                    {numResults.current && numResults.current >= limit ? '20+' : numResults.current} result(s)
                </h2>
            </header>
            <div ref={containerRef} className='flex flex-col border border-slate-300 items-center justify-start w-[90vw] sm:w-[80vw] xl:w-[60vw] h-[60vh] bg-white shadow-lg shadow-slate-300 overflow-y-scroll overflow-x-hidden'>
                {handleRenderContent()}
            </div>
        </main>
    );
}
