"use client";

import { useState, useLayoutEffect, useCallback, useEffect } from "react";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";

/**
 *
 * @param breakpoint
 * Determines the device width breakpoint (in px) to switch the hamburger menu to navigation links.
 */
export default function NavigationMenu({ breakpoint }: { breakpoint: number }) {
    const [deviceWidth, setDeviceWidth] = useState<null | number>(null);

    // persist function reference
    const setDeviceWidthCb = useCallback(() => {
        if (window !== undefined) {
            setDeviceWidth(window.innerWidth);
        }
    }, []);

    useLayoutEffect(() => {
        window.addEventListener("resize", setDeviceWidthCb);

        const deviceWidth = window.innerWidth;
        setDeviceWidth(deviceWidth);

        return () => {
            removeEventListener("resize", setDeviceWidthCb);
        };
    }, [setDeviceWidthCb]);

    if (deviceWidth == null) {
        return <></>;
    } else if (deviceWidth >= breakpoint) {
        return (
            <div className='flex flex-row text-lg 2xl:text-xl gap-10 font-semibold items-center justify-between'>
                <Link href='/info/documentation' className='relative group'>
                    Documentation
                    <div className='w-0 group-hover:w-full transition-all duration-500 ease-in-out h-[0.2rem] 2xl:h-1 bg-red-700 -mt-[0.2rem]'></div>
                </Link>
                <Link href='/info/statistics' className='relative group'>
                    Statistics
                    <div className='w-0 group-hover:w-full transition-all duration-500 ease-in-out h-[0.2rem] 2xl:h-1 bg-red-700 -mt-[0.2rem]'></div>
                </Link>
                {/* <Link href='/info/contact' className='relative group'>
                    Contact
                    <div className='w-0 group-hover:w-full transition-all duration-500 ease-in-out h-[0.2rem] 2xl:h-1 bg-red-700 -mt-[0.2rem]'></div>
                </Link> */}
                <Link href='http://missense3d.bc.ic.ac.uk/missense3d/' className='relative group'>
                    Missense3D Webserver
                    <div className='w-0 group-hover:w-full transition-all duration-500 ease-in-out h-[0.2rem] 2xl:h-1 bg-red-700 -mt-[0.2rem]'></div>
                </Link>
            </div>
        );
    } else if (deviceWidth < breakpoint) {
        return <HamburgerMenu />;
    }
}

function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    useEffect(() => {

        if (isOpen) {
            document.body.style.overflow = 'hidden'
        }
        else if (!isOpen) {
            document.body.style.overflow = 'auto'
        }

    }, [isOpen])

    return (
        <>
            <div
                className='flex flex-col items-center justify-center h-8 gap-2 aspect-square z-10 mr-2'
                onClick={() => {
                    setIsOpen((curr) => !curr);
                }}>
                <div className='w-[100%] h-[0.2rem] 2xl:h-1 bg-slate-700 rounded-full'></div>
                <div className='w-[100%] h-[0.2rem] 2xl:h-1 bg-slate-700 rounded-full'></div>
                <div className='w-[100%] h-[0.2rem] 2xl:h-1 bg-slate-700 rounded-full'></div>
            </div>
            {/* backdrop filter */}
            <section
                className={`fixed flex flex-col z-50 items-center justify-center p-16 text-3xl gap-28 font-medium w-screen h-[100dvh] top-0 left-0 bg-slate-800 text-white ${
                    isOpen ? "top-0 opacity-1" : "top-[-100%] opacity-0 delay-100"
                } transition-all duration-500`}>
                <div className='flex flex-col gap-8 items-center w-full text-center'>
                    <Link
                        className={`${isOpen ? "translate-y-0 oapcity-1" : "-translate-y-4 opacity-0"} delay-0 transition-all duration-700 ease-in-out`}
                        href='/info/documentation'
                        onClick={() => {
                            setIsOpen(false);
                        }}>
                        Documentation
                    </Link>
                    <Link
                        className={`${isOpen ? "translate-y-0 oapcity-1" : "-translate-y-4 opacity-0"} delay-[100ms] transition-all duration-700 ease-in-out`}
                        href='/info/statistics'
                        onClick={() => {
                            setIsOpen(false);
                        }}>
                        Statistics
                    </Link>
                    {/* <Link
                        className={`${isOpen ? "translate-y-0 oapcity-1" : "-translate-y-4 opacity-0"} delay-[200ms] transition-all duration-700 ease-in-out`}
                        href='/info/contact'
                        onClick={() => {
                            setIsOpen(false);
                        }}>
                        Contact
                    </Link> */}
                    <Link
                        className={`${isOpen ? "translate-y-0 oapcity-1" : "-translate-y-4 opacity-0"} delay-[300ms] transition-all duration-700 ease-in-out`}
                        href='http://missense3d.bc.ic.ac.uk/missense3d/'
                        onClick={() => {
                            setIsOpen(false);
                        }}>
                        Missense3D Webserver
                    </Link>
                </div>
                <button
                    className={`${isOpen ? "translate-y-0 opacity-1" : "translate-y-4 opacity-0"} transition-all duration-700 text-4xl`}
                    onClick={() => {
                        setIsOpen(false);
                    }}>
                    <CloseIcon fontSize='inherit' />
                </button>
            </section>
        </>
    );
}

// <Link href='/'>Home</Link>
// <Link href='https://github.com/Levurmion' target="_blank">Github</Link>
// <Link href='https://www.linkedin.com/in/elberttimothy' target="_blank">LinkedIn</Link>
