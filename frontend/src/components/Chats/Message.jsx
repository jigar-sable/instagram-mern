
const Message = ({ ownMsg, avatar, content }) => {
    return (
        ownMsg ?
            content === '❤️' ?
                <span className="self-end text-4xl">{content}</span>
                :
                <span className="self-end text-sm text-white bg-violet-600 px-4 py-3 rounded-3xl max-w-xs">{content}</span>
            :
            content === '❤️' ?
                <div className="flex items-end gap-2 max-w-xs">
                    <img draggable="false" className="w-7 h-7 rounded-full object-cover" src={avatar} alt="avatar" />
                    <span className="items-end text-4xl">{content}</span>
                </div>
                :
                <div className="flex items-end gap-2 max-w-xs">
                    <img draggable="false" className="w-7 h-7 rounded-full object-cover" src={avatar} alt="avatar" />
                    <span className="px-4 py-3 text-sm bg-gray-200 rounded-3xl max-w-xs overflow-hidden">{content}</span>
                </div>
    )
}

export default Message