"use client";
import { Variants, motion } from "framer-motion";

// variants
const box: Variants = {
    loading: {},
};

const loadingBar: Variants = {
    loading: {
        opacity: [0.35,1,0.35],
        transition: {
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0.5
        }
    }
}

export default function LoadingFallback() {
    return (
        <motion.div
            className='flex flex-col w-full h-full bg-white shadow-lg shadow-gray-300 rounded-sm overflow-hidden'
            animate='loading'
            transition={{ duration: 1, staggerChildren: 0.125 }}
            variants={box}
            >
            <LoadingRow/>
            <LoadingRow/>
            <LoadingRow/>
            <LoadingRow/>
            <LoadingRow/>
            <LoadingRow/>
            <LoadingRow/>
            <LoadingRow/>
        </motion.div>
    );
}

function LoadingRow() {
    return (
        <motion.div className='flex flex-col items-center justify-center w-full h-[10%]' variants={loadingBar}>
            <motion.div className='flex w-[95%] h-[20%] bg-slate-300'></motion.div>
        </motion.div>
    );
}
