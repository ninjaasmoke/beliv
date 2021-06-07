import React, { useContext, createContext, useState, useEffect } from 'react'
import { deleteAllCookies, getCookie, setCookie } from '../helper/cookies';
import { AuthProps, UserData } from './types';

const defaultUserData: UserData = {
    email: '',
    familyName: '',
    givenName: '',
    googleId: '',
    imageUrl: '',
    name: ''
}

const defaultAuthValue: AuthProps = {
    userData: defaultUserData,
    addUser: (userData: UserData) => { },
    logoutUser: () => { },
};


const AuthContext = createContext<AuthProps>(defaultAuthValue);

export default function AuthProvider({ children }: { children: any }) {

    const [userData, setUserData] = useState<UserData>(defaultUserData);

    function addUser(userData: UserData) {
        setUserData(userData);
        const expireCookie = 30;
        setCookie('email', userData.email, expireCookie);
        setCookie('familyName', userData.familyName, expireCookie);
        setCookie('givenName', userData.givenName, expireCookie);
        setCookie('googleId', userData.googleId, expireCookie);
        setCookie('imageUrl', userData.imageUrl, expireCookie);
        setCookie('name', userData.name, expireCookie);
    }

    function logoutUser() {
        setUserData(defaultUserData);
        deleteAllCookies();
        window.location.replace('/login');
    }

    useEffect(() => {
        setUserData({
            name: getCookie('name'),
            googleId: getCookie('googleId'),
            imageUrl: getCookie('imageUrl'),
            email: getCookie('email'),
            givenName: getCookie('givenName'),
            familyName: getCookie('familyName'),
        })
    }, [])

    return (
        <AuthContext.Provider value={{
            userData, addUser, logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}