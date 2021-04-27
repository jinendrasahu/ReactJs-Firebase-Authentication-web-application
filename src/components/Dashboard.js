import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom";
export default function Dashboard() {
    const { currentuser, logout } = useAuth();
    const history = useHistory();
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    async function handleLogout() {
        setError('');
        setLoading('Loading...')
        try {
            await logout();
            history.push("/login");
        } catch {
            setError('Failed to Login');
        }
        setLoading('')
    }
    return (
        <>

            {error && <h1>{error}</h1>}
            {loading && <h1>{loading}</h1>}
            {currentuser && currentuser.email}

            <button variant="link" onClick={handleLogout}>Logout</button>
            <Link to="/updateuser">Update</Link>
        </>
    )
}
