'use client'

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLayoutEffect, useState, useRef } from "react";
import ProteinCard from "./ProteinCard";
import { ReactNode } from "react";

import { ProteinRecord } from "./ProteinCard";

export default function ScrollYBox ({ children }: { children: ReactNode }) {

    const scrollBoxRef = useRef(null)
    const scrollBarRef = useRef(null)
    const wrapperRef = useRef(null)

    const scrollBoxHeight = useRef(0)
    const transformScale = useRef(1)
    const [maxTransformDistance, setMaxTransformDistance] = useState(0)

    const { scrollYProgress } = useScroll({
        container: scrollBoxRef
    })

    const scrollBarY = useSpring(useTransform(scrollYProgress, [0,1], [0,maxTransformDistance]), { stiffness: 350, damping: 50 })

    useLayoutEffect(() => {
        const scrollBox = scrollBoxRef.current as unknown as HTMLDivElement
        const list = wrapperRef.current as unknown as HTMLUListElement
        const scrollBar = scrollBarRef.current as unknown as HTMLDivElement

        // get computed scroll box height
        const scrollBoxRect = scrollBox.getBoundingClientRect()
        scrollBoxHeight.current = scrollBoxRect.height

        // get height of list (includes all list item children)
        const listRect = list.getBoundingClientRect()
        const listHeight = listRect.height

        // set a minimum bar height after which scroll progress is determined by a transform scale
        const minimumHeight = 0.05 * scrollBoxHeight.current

        // compute height of scroll bar based on how much of the list is in view
        const scrollBarHeight = Math.max(scrollBoxHeight.current * (scrollBoxHeight.current/listHeight), minimumHeight)
        scrollBar.style.height = `${scrollBarHeight}px` // set height

        // compute maximum possible scroll bar transform distance
        setMaxTransformDistance(scrollBoxHeight.current - scrollBarHeight)
    }, [])

    return (
        <div className='flex flex-row relative h-full w-full'>
            {/* custom scrollbar */}
            <div className="flex flex-col h-full w-[1%] min-w-[0.5rem]">
                <motion.div
                    ref={scrollBarRef}
                    className="w-full h-0 bg-slate-300"
                    style={{ y: scrollBarY }}
                >
                </motion.div>
            </div>

            {/* scrolling container */}
            <motion.div ref={scrollBoxRef} className="flex flex-col flex-grow relative items-center 
                h-full
                overflow-y-auto no-scrollbar
                ">
                <div
                    className="flex flex-col relative flex-grow w-full h-fit overflow-x-visible"
                    ref={wrapperRef}
                >
                    {children}
                </div>
            </motion.div>
        </div>
    )
}