import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';


const AuthContext = createContext();
export function useAuth() {
    return useContext(AuthContext);
}
export function AuthProvider({ children }) {

    const [currentuser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    function logout() {
        return auth.signOut();
    }
    function forgetpassword(email) {
        return auth.sendPasswordResetEmail(email);

    }
    function updateUser(email) {
        // return auth.updateCurrentUser()

    }
    function updatePassword(password) {
        return currentuser.updatePassword(password);
    }
    function updateEmail(email) {
        return currentuser.updateEmail(email);
    }
    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoading(false);
            setCurrentUser(user);
        });

        return unsubscribe;
    }, [])

    const values = {
        currentuser,
        signup,
        login,
        logout,
        forgetpassword,
        updatePassword,
        updateEmail
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
