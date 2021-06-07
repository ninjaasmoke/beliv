import React, { useContext, createContext, useState, useEffect } from 'react'
import { deleteAllCookies } from '../helper/cookies';
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
    userData: {},
    addUser: (userData: UserData) => { },
    logoutUser: () => { },
};


const AuthContext = createContext<AuthProps>(defaultAuthValue);

export default function AuthProvider({ children }: { children: any }) {
    const [userData, setUserData] = useState<UserData>(defaultUserData);

    function addUser(userData: UserData) {
        setUserData(userData);
    }

    function logoutUser() {
        setUserData(defaultUserData);
        deleteAllCookies();
        window.location.replace('/login');
    }
    return (
        <AuthContext.Provider value={{
            userData, addUser, logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}