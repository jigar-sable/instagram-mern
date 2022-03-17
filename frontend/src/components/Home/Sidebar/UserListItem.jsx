import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { followUser } from '../../../actions/userAction';

const UserListItem = ({ _id, username, avatar }) => {

    const dispatch = useDispatch();

    const [follow, setFollow] = useState(false);

    const handleFollow = () => {
        setFollow(!follow);
        dispatch(followUser(_id));
    }

    return (
        <div className="flex justify-between items-center">
            <div className="flex space-x-3 items-center">
                <Link to={`/${username}`}><img draggable="false" className="w-9 h-9 rounded-full object-cover" src={avatar} alt="avatar" /></Link>
                <div className="flex flex-col gap-0.5">
                    <Link to={`/${username}`} className="text-black text-sm font-semibold hover:underline">{username}</Link>
                    <span className="text-gray-400 text-xs">New to Instagram</span>
                </div>
            </div>
            <button onClick={handleFollow} className={`${follow ? 'text-red-500' : 'text-blue-500'} text-xs font-medium`}>{follow ? "Unfollow" : "Follow"}</button>
        </div>
    )
}

export default UserListItem