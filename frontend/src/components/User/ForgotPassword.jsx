import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Auth from './Auth';
import { Link } from 'react-router-dom';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import BackdropLoader from '../Layouts/BackdropLoader';

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
        setEmail("");
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            toast.success(message);
        }
    }, [dispatch, error, message]);

    return (
        <>
            {loading && <BackdropLoader />}
            <Auth>
                <div className="bg-white border flex flex-col gap-2 p-4 pt-10">
                    <img draggable="false" className="mx-auto h-30 w-36 object-contain" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3 m-3 md:m-8">
                        <TextField
                            label="Email"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="bg-primary-blue font-medium py-2 rounded text-white w-full">Submit</button>
                        <span className="my-3 text-gray-500">OR</span>
                        <Link to="/password/forgot" className="text-sm font-medium text-blue-800">Forgot password?</Link>
                    </form>
                </div>

                <div className="bg-white border p-5 text-center">
                    <span>Don't have an account? <Link to="/register" className="text-primary-blue">Sign up</Link></span>
                </div>
            </Auth>
        </>
    )
}

export default ForgotPassword