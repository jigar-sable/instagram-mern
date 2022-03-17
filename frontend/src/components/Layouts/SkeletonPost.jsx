import { Skeleton } from '@mui/material'

const SkeletonPost = () => {
    return (
        <div className="flex flex-col border w-full my-4 rounded bg-white">
            <div className="flex items-center gap-2 p-2">
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
                <div className="flex flex-col gap-1 w-full">
                    <Skeleton height={10} variant="rectangular" width="25%" animation="wave" />
                    <Skeleton height={10} variant="rectangular" width="20%" animation="wave" />
                </div>
            </div>
            <Skeleton sx={{ height: 520 }} animation="wave" variant="rectangular" />
        </div>
    )
}

export default SkeletonPost