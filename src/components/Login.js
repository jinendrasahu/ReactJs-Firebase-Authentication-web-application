import React, { useRef, useState } from 'react'

import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from "react-router-dom";
export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const history = useHistory();

    async function handlesubmit(e) {
        e.preventDefault();
        setLoading('Loading...')
        if (emailRef.current.value && passwordRef.current.value) {
            setError('');
            try {

                await login(emailRef.current.value, passwordRef.current.value)

                history.push("/")
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
            {loading && <h1>{loading}</h1>}
            <form onSubmit={handlesubmit}>
                <input type="email" ref={emailRef} required></input>
                <input type="password" ref={passwordRef} required></input>
                <button disabled={loading} type="submit">Login</button>
            </form>
            <Link to="/signup">Do not have an account</Link>
            <Link to="/forgetpassword">Forget Password?</Link>

        </>
    )
}
