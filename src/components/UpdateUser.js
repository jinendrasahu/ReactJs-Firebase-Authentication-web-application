import React, { useRef, useState } from 'react'

import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from "react-router-dom"

export default function UpdateUser() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const { updatePassword, updateEmail, currentuser } = useAuth();
    const history = useHistory();
    function handlesubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setError("Password Should be same");
            return;
        }
        const promises = [];
        setLoading('Loading...')
        setError('');
        if (emailRef.current.value !== currentuser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }
        Promise.all(promises).then(() => {
            history.push('/');
        }).catch(() => {
            setError('Failed to update');
        }).finally(() => {
            setLoading('');
        });
    }
    return (
        <>
            {error && <h1>{error}</h1>}
            {loading && <h1>{loading}</h1>}
            {/* {currentuser && currentuser.email} */}
            <form onSubmit={handlesubmit}>
                <input type="email" defaultValue={currentuser.email} ref={emailRef} required></input>
                <input type="password" ref={passwordRef} required></input>
                <input type="password" ref={confirmPasswordRef} required></input>
                <button disabled={loading} type="submit">Update</button>
            </form>
            <Link to="/">Cancle</Link>

        </>
    )
}
