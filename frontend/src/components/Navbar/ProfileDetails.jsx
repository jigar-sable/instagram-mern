import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { profileIcon, savedIcon, settingsIcon, switchAccountIcon } from './SvgIcons'
import { logoutUser } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { ClickAwayListener } from '@mui/material';

const ProfileDetails = ({ setProfileToggle }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    const tabs = [
        {
            title: "Profile",
            icon: profileIcon,
            redirect: `/${user.username}`
        },
        {
            title: "Saved",
            icon: savedIcon,
            redirect: `/${user.username}`
        },
        {
            title: "Settings",
            icon: settingsIcon,
            redirect: "/accounts/edit"
        },
        {
            title: "Switch Account",
            icon: switchAccountIcon,
            redirect: "/"
        },
    ]

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
        toast.success("Logout Successfully");
    }


    return (
        <ClickAwayListener onClickAway={() => setProfileToggle(false)}>
            <div className="absolute w-56 bg-white rounded  drop-shadow top-14 right-0 md:right-72 md:top-14 border">
                <div className="absolute right-5 -top-2 rotate-45 h-4 w-4 bg-white rounded-sm border-l border-t"></div>

                <div className="flex flex-col w-full overflow-hidden">
                    {tabs.map((el, i) => (
                        <Link to={el.redirect} className="flex items-center gap-3 p-2.5 text-sm pl-4 cursor-pointer hover:bg-gray-50" key={i}>
                            {el.icon}
                            {el.title}
                        </Link>
                    ))}
                    <button onClick={handleLogout} className="flex rounded-b border-t-2 items-center gap-3 p-2.5 text-sm pl-4 cursor-pointer hover:bg-gray-50">
                        Logout
                    </button>
                </div>
            </div>
        </ClickAwayListener>

    )
}

export default ProfileDetails