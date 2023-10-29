import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function VariantsLoading () {

    return (
        <>
            <div className="flex flex-col justify-center items-center w-[80vw] h-[60vh] lg:h-[45vh] bg-slate-200 shadow-md">
                <div className="flex flex-col items-center text-4xl">
                    <AutorenewIcon fontSize="inherit" className="animate-spin"/>
                    <div className="text-[50%] leading-tight">
                        retrieving variants
                    </div>
                </div>
            </div>
        </>
    )
}