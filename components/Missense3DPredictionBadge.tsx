export default function Missense3DPredictionBadge({ prediction }:{prediction: boolean | "N/A"}) {
    if (prediction === true) {
        return <span className='px-[3%] py-[1.5%] rounded-full leading-none text-[80%] text-red-700 bg-red-200'>pathogenic</span>;
    } else if (prediction === false) {
        return <span className='px-[3%] py-[1.5%] rounded-full leading-none text-[80%] text-green-700 bg-green-300'>benign</span>;
    } else if (prediction === "N/A") {
        return <span className='px-[3%] py-[1.5%] rounded-full leading-none text-[80%] text-slate-700 bg-slate-200'>unavailable</span>;
    }
}