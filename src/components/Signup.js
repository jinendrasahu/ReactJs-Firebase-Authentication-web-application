import React, { useRef, useState } from 'react'

import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from "react-router-dom"

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const history = useHistory();

    async function handlesubmit(e) {
        e.preventDefault();
        setLoading('Loading...')
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setError("Password Should be same");
            return;
        }
        if (emailRef.current.value) {
            setError('');
            try {

                await signup(emailRef.current.value, passwordRef.current.value)
                history.push("/");
            }
            catch {
                setError('Failed to SignUp');
            }
            setLoading('');
        }
    }
    return (
        <>
            {error && <h1>{error}</h1>}
            {loading && <h1>{loading}</h1>}
            {/* {currentuser && currentuser.email} */}
            <form onSubmit={handlesubmit}>
                <input type="email" ref={emailRef} required></input>
                <input type="password" ref={passwordRef} required></input>
                <input type="password" ref={confirmPasswordRef} required></input>
                <button disabled={loading} type="submit">Sign Up</button>
            </form>
            <Link to="/login">Already have an account?</Link>

        </>
    )
}
