'use client'

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLayoutEffect, useState, useRef } from "react";
import { ReactNode } from "react";

export default function ScrollXBox ({ children }: { children: ReactNode }) {

    const scrollBoxRef = useRef(null)
    const scrollBarRef = useRef(null)
    const wrapperRef = useRef(null)

    const scrollBoxWidth = useRef(0)
    const [maxTransformDistance, setMaxTransformDistance] = useState(0)

    const { scrollXProgress } = useScroll({
        container: scrollBoxRef
    })

    const scrollBarX = useSpring(useTransform(scrollXProgress, [0,1], [0,maxTransformDistance]), { stiffness: 350, damping: 50 })

    useLayoutEffect(() => {
        const scrollBox = scrollBoxRef.current as unknown as HTMLDivElement
        const wrapper = wrapperRef.current as unknown as HTMLDivElement
        const scrollBar = scrollBarRef.current as unknown as HTMLDivElement

        // get computed scroll box height
        const scrollBoxRect = scrollBox.getBoundingClientRect()
        scrollBoxWidth.current = scrollBoxRect.width

        // get height of wrapper (includes all wrapper item children)
        const wrapperRect = wrapper.getBoundingClientRect()
        const wrapperWidth = wrapperRect.width

        // compute height of scroll bar based on how much of the wrapper is in view
        const scrollBarWidth = scrollBoxWidth.current * (scrollBoxWidth.current/wrapperWidth)
        scrollBar.style.width = `${scrollBarWidth}px` // set height

        // compute maximum possible scroll bar transform distance
        setMaxTransformDistance(scrollBoxWidth.current - scrollBarWidth)
    }, [])

    return (
        <div className='flex flex-col relative h-full w-full'>

            {/* scrolling container */}
            <motion.div ref={scrollBoxRef} className="flex flex-row relative items-center 
                w-full
                overflow-x-scroll no-scrollbar
                ">
                <div
                    className="flex flex-row relative w-fit overflow-x-visible"
                    ref={wrapperRef}
                >
                    {children}
                </div>
            </motion.div>

            {/* custom scrollbar */}
            <div className="flex flex-col w-full h-2">
                <motion.div
                    ref={scrollBarRef}
                    className="h-full w-0 bg-slate-300"
                    style={{ x: scrollBarX }}
                >
                </motion.div>
            </div>
        </div>
    )
}