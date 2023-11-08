'use client'

import { Variants, motion } from "framer-motion"

const parentVariants: Variants = {
    start: {},
    animate: {
        transition: {
            staggerChildren: 0.15
        }
    }
}

const barVariants: Variants = {
    start: {
        height: '1rem'
    },
    animate: {
        height: ['2rem','3rem','2rem'],
        opacity: [0.7, 1, 0.7],
        transition: {
            repeat: Infinity,
            duration: 1,
            ease: 'easeInOut'
        }
    }
}

export default function LoadingIndicator ({ text }: { text: string }) {

    return (
        <div className="flex flex-col items-center justify-center w-full h-full text-2xl gap-4">
            <motion.div className="flex flex-row items-end gap-1.5 h-16" variants={parentVariants} initial='start' animate='animate'>
                <motion.div variants={barVariants} className="w-1.5 bg-slate-700 rounded-t-full"></motion.div>
                <motion.div variants={barVariants} className="w-1.5 bg-slate-700 rounded-t-full"></motion.div>
                <motion.div variants={barVariants} className="w-1.5 bg-slate-700 rounded-t-full"></motion.div>
                <motion.div variants={barVariants} className="w-1.5 bg-slate-700 rounded-t-full"></motion.div>
                <motion.div variants={barVariants} className="w-1.5 bg-slate-700 rounded-t-full"></motion.div>
            </motion.div>
            <p>
                {text}
            </p>
        </div>
    )
}