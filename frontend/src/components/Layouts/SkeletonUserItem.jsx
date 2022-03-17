import { Skeleton } from '@mui/material'

const SkeletonUserItem = () => {
    return (
        <div className="flex items-center gap-2">
            <Skeleton animation="wave" variant="circular" width={45} height={40} />
            <div className="flex flex-col gap-1 w-full">
                <Skeleton height={15} variant="rectangular" width="60%" animation="wave" />
                <Skeleton height={12} variant="rectangular" width="30%" animation="wave" />
            </div>
        </div>
    )
}

export default SkeletonUserItem