import React, { useRef, useState } from 'react'

import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from "react-router-dom";
export default function ResetPassword() {
    const emailRef = useRef();
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [msg, setmsg] = useState('');
    const history = useHistory();
    const { forgetpassword } = useAuth();

    async function handlesubmit(e) {
        e.preventDefault();
        setLoading('Loading...')
        if (emailRef.current.value) {
            setError('');
            try {

                await forgetpassword(emailRef.current.value)
                setmsg("Check your email");

            }
            catch {
                setError('Failed to Login');
            }
            setLoading('');

        }
        else {
            setError("Password Should be same");
            return;
        }
    }
    return (
        <>
            {error && <h1>{error}</h1>}
            {msg && <h1>{msg}</h1>}
            {loading && <h1>{loading}</h1>}
            <form onSubmit={handlesubmit}>
                <input type="email" ref={emailRef} required></input>
                <button type="submit">Reset</button>
            </form>
            <Link to="/login">Login</Link>

        </>
    )
}
