import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Auth from './Auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import BackdropLoader from '../Layouts/BackdropLoader';

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            toast.warn("Password length must be atleast 8 characters");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Password Doesn't Match");
            return;
        }
        dispatch(resetPassword(params.token, newPassword));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Password Updated Successfully");
            navigate("/login")
        }
    }, [dispatch, error, success, navigate]);

    return (
        <>
            {loading && <BackdropLoader />}
            <Auth>
                <div className="bg-white border flex flex-col gap-2 p-4 pt-10">
                    <img draggable="false" className="mx-auto h-30 w-36 object-contain" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3 m-3 md:m-8">
                        <TextField
                            fullWidth
                            size="small"
                            label="New Password"
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            size="small"
                            label="Confirm New Password"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="bg-primary-blue font-medium py-2 rounded text-white w-full">Submit</button>
                        <span className="my-3 text-gray-700">OR</span>
                        <Link to="/password/forgot" className="text-sm font-medium text-blue-800">Forgot password?</Link>
                    </form>
                </div>

                <div className="bg-white border p-5 text-center">
                    <span>Already have an account? <Link to="/login" className="text-primary-blue">Log in</Link></span>
                </div>
            </Auth>
        </>
    )
}

export default ResetPassword