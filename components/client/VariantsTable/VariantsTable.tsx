"use client";

import { Missense3DRecord, MissenseVariantRecord } from "@/lib/types";
import {
    createColumnHelper,
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    SortingState,
    Column,
    SortDirection,
    getFacetedRowModel,
    ColumnFiltersState,
} from "@tanstack/react-table";
import { ChangeEvent, MouseEvent, useEffect, useLayoutEffect, useRef } from "react";
import { useVariantContext } from "../../contexts/useVariantContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DownloadIcon from '@mui/icons-material/Download';
import styles from "./VariantsTable.module.scss";
import { useState } from "react";
import Missense3DPredictionBadge from "@/components/Missense3DPredictionBadge";

type Missense3DPredictionFilterOptions = "neither" | "both" | "pathogenic" | "benign";

const columnHelper = createColumnHelper<MissenseVariantRecord>();

const columns = [
    columnHelper.accessor((variant) => variant.alphafold_metrics?.pae_5A, {
        header: "PAE 5Å",
        sortingFn: "basic",
        filterFn: "inNumberRange",
    }),
    columnHelper.accessor((variant) => variant.alphafold_metrics?.plddt_5A, {
        header: "pLDDT 5Å",
        sortingFn: "basic",
        filterFn: "inNumberRange",
    }),
    columnHelper.accessor((variant) => (variant.m3d_predictions ? variant.m3d_predictions[0].damaging : "N/A"), {
        header: "Missense3D Prediction",
        cell: (info) => <Missense3DPredictionBadge prediction={info.getValue()} />,
        enableSorting: false,
        filterFn: (row, columnId, filterValue: Missense3DPredictionFilterOptions) => {
            if (filterValue === "both") return true;
            else if (filterValue === "neither") return false;
            else if (filterValue === "pathogenic" && row.original.m3d_predictions && row.original.m3d_predictions[0].damaging) return true;
            else if (filterValue === "benign" && row.original.m3d_predictions && !row.original.m3d_predictions[0].damaging) return true;
            return false;
        },
    }),
    columnHelper.accessor("mutant", {
        header: "mutant",
        sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("wildtype", {
        header: "wildtype",
        sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("position", {
        header: "position",
        sortingFn: "basic",
        filterFn: "weakEquals",
    }),
];

export default function VariantsTable({ data }: { data: Array<MissenseVariantRecord> }) {
    const variantsData = useRef(data);
    const tableRef = useRef<HTMLDivElement>(null);
    const lastSelected = useRef<null | HTMLTableRowElement>(null);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [selectedVariant, setSelectedVariant] = useState<null | MissenseVariantRecord>(null);

    const table = useReactTable<MissenseVariantRecord>({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const toggleSortingArrowOpacity = (column: Column<MissenseVariantRecord>, toggleDir: SortDirection) => {
        const sortingState = column.getIsSorted();
        if (sortingState === toggleDir) return "opacity-100";
        else return "opacity-30";
    };

    const extractFlaggedFeatures = (m3dRecord: Missense3DRecord) => {
        const features = {
            ...m3dRecord,
            damaging: undefined,
            created_at: undefined,
            algorithm_version: undefined,
        };
        return Object.entries(features)
            .filter((feature) => {
                const [featureName, isFlagged] = feature;
                if (isFlagged) return true;
            })
            .map((featureName) => featureName[0].replaceAll("_", " "));
    };

    useEffect(() => {
        // initialize filter value for Missense3D predictions to display both
        table.getHeaderGroups()[0].headers[2].column.setFilterValue("both");
    }, []);

    return (
        <div className='flex w-fit flex-col items-center gap-2 2xl:gap-3'>

            <div className='flex flex-row items-center self-start lg:text-lg xl:text-xl 2xl:text-2xl w-full justify-between gap-4'>
                <span className=" text-white bg-slate-600 px-[0.75%] py-[0.25%] shadow-md whitespace-nowrap">
                    {data.length} variants
                </span>
                <div className="flex flex-col items-center justify-center  text-red-500 hover:text-purple-600 transition-all underline hover:cursor-pointer">
                    <a href='/'>
                        <span className="text-[90%]">download report</span> <DownloadIcon fontSize="inherit" />
                    </a>
                </div>
            </div>

            {/* table container */}
            <div className='flex flex-row w-auto mx-auto lg:gap-2 2xl:gap-4'>
                {/* filters */}
                <div className='flex lg:text-xs xl:text-sm 2xl:text-base flex-col h-full w-50 2xl:w-60 gap-2 bg-slate-100 shadow-md border border-slate-300 overflow-hidden'>
                    <span className='lg:text-sm xl:text-base 2xl:text-lg px-2 py-1 bg-slate-600 text-white font-medium'>FILTERS</span>
                    <form className='flex flex-col lg:p-1 xl:p-2 gap-2'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor='position' className='font-medium'>
                                position
                            </label>
                            <input
                                name='position'
                                type='number'
                                className='ps-2 py-0.5 border'
                                min={0}
                                placeholder='filter by position'
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    table.getHeaderGroups()[0].headers[5].column.setFilterValue(e.target.value);
                                }}></input>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor='plDDT' className='font-medium'>
                                pLDDT 5Å between
                            </label>
                            <input
                                name='plDDT gt'
                                type='number'
                                className='ps-2 py-0.5 border'
                                min={0}
                                max={100}
                                placeholder='greater than'
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    table.getHeaderGroups()[0].headers[1].column.setFilterValue((prev: [number, number]) => [e.target.value, prev?.[1]]);
                                }}></input>
                            <input
                                name='plDDT lt'
                                type='number'
                                className='ps-2 py-0.5 border'
                                min={0}
                                max={100}
                                placeholder='less than'
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    table.getHeaderGroups()[0].headers[1].column.setFilterValue((prev: [number, number]) => [prev?.[0], e.target.value]);
                                }}></input>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor='PAE' className='font-medium'>
                                PAE 5Å between
                            </label>
                            <input
                                name='PAE'
                                type='number'
                                className='ps-2 py-0.5 border'
                                min={0}
                                max={32.5}
                                placeholder='greater than'
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    table.getHeaderGroups()[0].headers[0].column.setFilterValue((prev: [number, number]) => [e.target.value, prev?.[1]]);
                                }}></input>
                            <input
                                name='PAE'
                                type='number'
                                className='ps-2 py-0.5 border'
                                min={0}
                                max={32.5}
                                placeholder='less than'
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    table.getHeaderGroups()[0].headers[0].column.setFilterValue((prev: [number, number]) => [prev?.[0], e.target.value]);
                                }}></input>
                        </div>
                        <div className='flex flex-col w-full'>
                            <span className='font-medium'>Missense3D prediction</span>
                            <div className='flex flex-row gap-2'>
                                <input
                                    className="cursor-pointer"
                                    defaultChecked
                                    type='checkbox'
                                    name='pathogenic'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        table
                                            .getHeaderGroups()[0]
                                            .headers[2].column.setFilterValue((prev: Missense3DPredictionFilterOptions): Missense3DPredictionFilterOptions => {
                                                switch (prev) {
                                                    case "neither":
                                                        if (e.target.checked) return "pathogenic";
                                                    case "benign":
                                                        if (e.target.checked) return "both";
                                                    case "both":
                                                        if (!e.target.checked) return "benign";
                                                    default:
                                                        return "neither";
                                                }
                                            });
                                    }}></input>
                                <label htmlFor='pathogenic'>pathogenic</label>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <input
                                    className="cursor-pointer"
                                    defaultChecked
                                    type='checkbox'
                                    name='benign'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        table
                                            .getHeaderGroups()[0]
                                            .headers[2].column.setFilterValue((prev: Missense3DPredictionFilterOptions): Missense3DPredictionFilterOptions => {
                                                switch (prev) {
                                                    case "neither":
                                                        if (e.target.checked) return "benign";
                                                    case "pathogenic":
                                                        if (e.target.checked) return "both";
                                                    case "both":
                                                        if (!e.target.checked) return "pathogenic";
                                                    default:
                                                        return "neither";
                                                }
                                            });
                                    }}></input>
                                <label htmlFor='benign'>benign</label>
                            </div>
                        </div>
                    </form>
                </div>

                <table className={styles.variantsTable}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => {
                            return (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th key={header.id}>
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        className={`flex flex-row-reverse items-center gap-1 ${
                                                            header.column.getCanSort() ? "cursor-pointer" : ""
                                                        }`}>
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {header.column.getCanSort() ? (
                                                            <div className='flex flex-col lg:text-xl 2xl:text-2xl'>
                                                                <ArrowDropUpIcon
                                                                    fontSize='inherit'
                                                                    className={`-mb-3 ${toggleSortingArrowOpacity(header.column, "asc")}`}
                                                                    onClick={() => {
                                                                        header.column.toggleSorting(false);
                                                                    }}
                                                                />
                                                                <ArrowDropDownIcon
                                                                    fontSize='inherit'
                                                                    className={toggleSortingArrowOpacity(header.column, "desc")}
                                                                    onClick={() => {
                                                                        header.column.toggleSorting(true);
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <tr
                                    key={row.id}
                                    data-idx={row.index}
                                    onClick={(e: MouseEvent<HTMLTableRowElement>) => {
                                        setSelectedVariant(data[e.currentTarget.getAttribute("data-idx") as unknown as number]);
                                        if (lastSelected.current !== null) lastSelected.current.setAttribute("is-selected", "false");
                                        lastSelected.current = e.currentTarget;
                                        lastSelected.current.setAttribute("is-selected", "true");
                                    }}>
                                    {row.getVisibleCells().map((cell) => {
                                        return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className='flex flex-col lg:text-xs xl:text-sm 2xl:text-base lg:w-[180px] xl:min-w-[250px] xl:max-w-[300px] xl:w-[20vw] bg-slate-100 border border-slate-300 shadow-md'>
                    <span className='lg:text-sm xl:text-base 2xl:text-lg px-2 py-1 bg-slate-600 text-white font-medium'>SELECTED VARIANT</span>
                    <div className='flex flex-col lg:p-1 xl:p-2 mt-1 gap-4'>
                        <div className='flex flex-row gap-2 items-center font-semibold text-[110%]'>
                            <Missense3DPredictionBadge prediction={selectedVariant?.m3d_predictions?.[0].damaging ?? "N/A"} />
                            {selectedVariant !== null ? `${selectedVariant.wildtype}-${selectedVariant.position}-${selectedVariant.mutant}` : "WT-POS-MUT"}
                        </div>

                        <div className='flex flex-col'>
                            <span className='font-medium'>ClinVar annotations</span>
                            <span className='flex flex-col lg:py-0.5 lg:px-1 xl:py-1 xl:px-2 bg-slate-200 text-[90%] leading-tight border border-slate-300 rounded-sm shadow-sm'>
                                {selectedVariant?.clinvar?.annotation.replaceAll("_", " ") ?? "unavailable"}
                            </span>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='font-medium'>genetic variants</span>
                            {selectedVariant?.genetic_variants?.map((geneticVariant) => {
                                return (
                                    <div key={geneticVariant.hgvs_g} className='flex flex-col lg:py-0.5 lg:px-1 xl:py-1 xl:px-2 bg-slate-200 text-[90%] leading-tight border border-slate-300 rounded-sm shadow-sm'>
                                        <span>{geneticVariant.hgvs_g}</span>
                                        <span>rsID: {geneticVariant?.rs_id ?? "unavailable"}</span>
                                        <span>gnomAD MAF: {geneticVariant?.gnomadg_v3_1_2_af?.allele_frequency ?? "unavailable"}</span>
                                    </div>
                                );
                            }) ?? (
                                <div className='flex flex-col lg:py-0.5 lg:px-1 xl:py-1 xl:px-2 bg-slate-200 text-[90%] leading-tight border border-slate-300 rounded-sm shadow-sm'>
                                    unavailable
                                </div>
                            )}
                        </div>

                        <div className='flex flex-col'>
                            <span className='font-medium'>structural alerts</span>
                            <ul className="flex flex-col lg:py-0.5 lg:px-0.5 xl:py-1 xl:px-1 bg-slate-200 text-[90%] leading-tight border border-slate-300 rounded-sm shadow-sm">
                                {
                                    selectedVariant?.m3d_predictions?.[0].damaging ? (
                                        extractFlaggedFeatures(selectedVariant.m3d_predictions[0]).map((flaggedFeature) => {
                                            return (
                                                <li key={flaggedFeature} className='text-red-500 font-medium'>
                                                    <PriorityHighIcon fontSize='inherit' />
                                                    {flaggedFeature}
                                                </li>
                                            );
                                        })
                                    ) : (
                                        'none'
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// export function Missense3DPredictionBadge(prediction: boolean | "N/A") {
//     if (prediction === true) {
//         return <span className='px-[3%] py-[1.5%] rounded-full leading-none text-[80%] text-red-700 bg-red-200'>pathogenic</span>;
//     } else if (prediction === false) {
//         return <span className='px-[3%] py-[1.5%] rounded-full leading-none text-[80%] text-green-700 bg-green-300'>benign</span>;
//     } else if (prediction === "N/A") {
//         return <span className='px-[3%] py-[1.5%] rounded-full leading-none text-[80%] text-slate-700 bg-slate-200'>unavailable</span>;
//     }
// }
