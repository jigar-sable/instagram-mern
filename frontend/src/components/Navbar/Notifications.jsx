import React from 'react'

const Notifications = () => {
    return (
        <div className="absolute w-56 bg-green-100 rounded  drop-shadow-xl right-96 top-14 border">
            <div className="absolute right-5 -top-2 rotate-45 h-4 w-4 bg-white rounded-sm border-l border-t"></div>

            <div className="flex flex-col w-full overflow-hidden">
                {Array(5).fill("").map((el) => (
                    <div className="flex items-center gap-3 p-2.5 text-sm pl-4 cursor-pointer hover:bg-gray-50">
                        Profile
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notifications