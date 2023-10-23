"use client"

import { MissenseVariantRecord } from '@/lib/types'
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'
import { MouseEvent, useLayoutEffect, useRef } from 'react'
import { useVariantContext } from '../contexts/useVariantContext'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import styles from './VariantsTable.module.scss'

const columnHelper = createColumnHelper<MissenseVariantRecord>()

const columns = [
    columnHelper.accessor('position', {
        header: 'position',
    }),
    columnHelper.accessor('wildtype', {
        header: 'wildtype'
    }),
    columnHelper.accessor('mutant', {
        header: 'mutant'
    }),
    columnHelper.accessor(variant => variant.m3d_predictions ? variant.m3d_predictions[0].damaging : 'N/A', {
        header: 'Missense3D Prediction',
        cell: info => Missense3DPredictionBadge(info.getValue())
    }),
    columnHelper.accessor(variant => variant.alphafold_metrics?.plddt_5A, {
        header: 'plDDT 5Å'
    }),
    columnHelper.accessor(variant => variant.alphafold_metrics?.pae_5A, {
        header: 'PAE 5Å'
    }),
    // columnHelper.accessor(variant => variant.m3d_predictions ? variant.m3d_predictions[0].algorithm_version : 'N/A', {
    //     header: 'algorithm version'
    // })
]

export default function VariantsTable ({ data }: { data: Array<MissenseVariantRecord> }) {

    const variantsData = useRef(data)
    const tableRef = useRef<HTMLDivElement>(null)
    const [ variantContext, setVariantContext ] = useVariantContext()

    const table = useReactTable<MissenseVariantRecord>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    const handleTableRowClick = (event: MouseEvent<HTMLTableCellElement>) => {
        const dataIdx = Number.parseInt(event.currentTarget.parentElement?.getAttribute('data-idx') as string)
        const selectedVariant = variantsData.current[dataIdx]
        setVariantContext(selectedVariant)
    }

    useLayoutEffect(() => {
        // enforce table height for the rest of the page's lifetime based on what was measured on component mount
        if (tableRef.current) {
            const tableHeight = tableRef.current.getBoundingClientRect().height
            tableRef.current.style.height = `${tableHeight}px`
        }
    }, [])

    return (
        <div className='flex w-full h-full flex-col'>

            {/* table controls */}
            <div className='flex flex-row items-center justify-center gap-4 text-[3vh] lg:text-[1.8vw] 2xl:text-[1.4vw]'>
                <button onClick={() => table.setPageIndex(0)} className="transition-transform hover:-translate-x-0.5 active:-translate-x-1.5">
                    <KeyboardDoubleArrowLeftIcon fontSize='inherit' />
                </button>
                <button onClick={() => table.previousPage()} className="transition-transform hover:-translate-x-0.5 active:-translate-x-1.5">
                    <KeyboardArrowLeftIcon fontSize='inherit'/>
                </button>
                <span className="text-[60%] w-1/4 lg:w-1/12 text-center">{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
                <button onClick={() => table.getState().pagination.pageIndex + 1 < table.getPageCount() ? table.nextPage() : null} className="transition-transform hover:translate-x-0.5 active:translate-x-1.5">
                    <KeyboardArrowRightIcon fontSize='inherit'/>
                </button>
                <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="transition-transform hover:translate-x-0.5 active:translate-x-1.5">
                    <KeyboardDoubleArrowRightIcon fontSize='inherit'/>
                </button>
            </div>

            {/* table container */}
            <div className='w-full h-full rounded-sm shadow-md overflow-x-auto bg-slate-50' ref={tableRef}>
                <table className={styles.variantsTable}>
                    <thead>
                        {
                            table.getHeaderGroups().map(headerGroup => {
                                return (
                                    <tr key={headerGroup.id}>{
                                        headerGroup.headers.map(header => {
                                            return <th key={header.id}>{
                                                header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())
                                            }</th>
                                        })
                                    }</tr>
                                )
                            })
                        }
                    </thead>
                    <tbody>
                        {
                            table.getRowModel().rows.map(row => {
                                return (
                                    <tr key={row.id} data-idx={row.index}>
                                        {
                                            row.getVisibleCells().map(cell => {
                                                return (
                                                    <td key={cell.id} onClick={handleTableRowClick}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}

function Missense3DPredictionBadge (prediction: boolean | 'N/A') {

    if (prediction === true) {
        return (
            <span className='py-1 px-3 2xl:py-[0.25vw] 2xl:px-[0.45vw] rounded-full text-red-700 bg-red-200'>
                pathogenic
            </span>
        )
    } else if (prediction === false) {
        return (
            <span className='py-1 px-3 2xl:py-[0.25vw] 2xl:px-[0.45vw] rounded-full text-green-700 bg-green-200'>
                benign
            </span>
        )
    } else if (prediction === 'N/A') {
        return (
            <span className='py-1 px-3 2xl:py-[0.25vw] 2xl:px-[0.45vw] rounded-full text-slate-700 bg-slate-200'>
                unavailable
            </span>
        )
    }

}