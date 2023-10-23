"use client";

import { useState, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { MouseEvent, ChangeEvent, FormEvent } from "react";
import { join } from "path";
import { useRouter } from "next/navigation";

interface SearchBar {
    placeholder: string;
    examples?: Array<string>;
}

export default function SearchBar({ placeholder, examples }: SearchBar) {
    const [searchString, setSearchString] = useState<string>("");
    const [placeholderString, setPlaceholderString] = useState<string>(placeholder)
    const numExamples = useRef<any>(examples?.length);
    const router = useRouter()

    let numExamplesRendered: number = 0;

    const handleExampleClick = (event: MouseEvent<HTMLElement>) => {
        const exampleText = event.currentTarget.innerText.replace(" | ", "");
        setSearchString(exampleText);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputText = event.currentTarget.value;
        setSearchString(inputText);
    };

    const handleSearchSubmit = () => {
        if (searchString.length === 0) {
            setPlaceholderString('enter gene, protein, or Uniprot ID!')
        } else {
            router.push(`/search/${searchString}`)
        }
    };

    return (
        // input wrapper
        <div className='flex w-full h-full relative shadow-md shadow-gray-400 '>
            <input className='flex w-full h-full px-2 xl:px-4' type='text' placeholder={placeholderString} value={searchString} onChange={handleInputChange}></input>
            <div className='absolute flex items-center justify-center right-0 h-full text-4xl 2xl:text-5xl bg-gray-100 text-gray-500 hover:cursor-pointer hover:text-gray-600 hover:bg-gray-200 active:bg-gray-300 active:text-gray-700 transition-colors aspect-square'
                onClick={handleSearchSubmit}
            >
                <SearchIcon fontSize='inherit' />
            </div>

            {/* examples */}
            <div className='absolute w-full text-md sm:text-lg mt-3 top-full'>
                <span className=' text-slate-500'>
                    Examples:{" "}
                    {examples?.map((example) => {
                        numExamplesRendered += 1;
                        if (numExamplesRendered < numExamples.current) {
                            return (
                                <span key={example} onClick={handleExampleClick} className='hover:cursor-pointer hover:text-regal-blue-800'>
                                    {example} |{" "}
                                </span>
                            );
                        } else {
                            return (
                                <span key={example} onClick={handleExampleClick} className='hover:cursor-pointer hover:text-regal-blue-800'>
                                    {example}
                                </span>
                            );
                        }
                    })}
                </span>
            </div>
        </div>
    );
}
