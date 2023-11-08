import AutorenewIcon from '@mui/icons-material/Autorenew';
import LoadingIndicator from '@/components/client/LoadingIndicator';

export default function VariantsLoading () {

    return (
        <>
            <div className="flex flex-col items-center justify-between h-[60vh] w-[80vw]">
                <LoadingIndicator text={'loading variants...'}/>
            </div>
        </>
    )
}