import LoadingFallback from "./LoadingFallback"

export default function SearchLoading () {

    return (
        <div className="flex flex-col h-full w-full">
            <h1 className="text-xl sm:text-4xl text-left w-full sm:px-2 pb-2 sm:pb-4">
                <p className="font-semibold">O results</p> 
                <p className="text-xs sm:text-xl "><span className="font-semibold">Looking up your query...</span></p>
            </h1>
            <LoadingFallback />
        </div>
    )
}