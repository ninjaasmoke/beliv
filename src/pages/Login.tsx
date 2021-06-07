import React, { useState } from 'react';
import { Spinner } from '../components/Spinner';
import { Link } from 'react-router-dom';
import { GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin } from 'react-google-login';
import '../styles/Login.css'

import ghIcon from '../assets/images/gh_icon.png';
import gIcon from '../assets/images/g_icon.png';
import { useAuthContext } from '../context/AuthContext';
import { UserData } from '../context/types';

const Login: React.FC = () => {
    const [showSpinner, setShowSpinner] = useState(false);

    const { addUser } = useAuthContext();

    const loginSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if (response) {
            const data = JSON.parse(JSON.stringify(response)).profileObj;
            const userData: UserData = {
                name: data.name,
                email: data.email,
                familyName: data.familyName,
                givenName: data.givenName,
                googleId: data.googleId,
                imageUrl: data.imageUrl
            }
            addUser(userData);
            setShowSpinner(false);
            window.location.replace('/')
        }
    }

    const { signIn, loaded } = useGoogleLogin({
        clientId: '422317457275-32trbdq50ku5hu36qr13b0oa9tb0cs8o.apps.googleusercontent.com',
        onSuccess: loginSuccess,
        onFailure: (err) => { setShowSpinner(false); console.log(err) },
        cookiePolicy: 'single_host_origin',
        loginHint: 'Login with Google',
    });

    return (
        <div className="container">
            <Spinner show={showSpinner} />
            <div className="login">
                <h1 className="welcome">Welcome</h1>
                <p className="desc">
                    Please login to use <span>beliv</span>. <br /> <br />
                    By loggin in you are agreeing to our <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms of Service</Link>.
                </p>
                <div className="buttons" >
                    <button onClick={() => { setShowSpinner(true); signIn() }} disabled={!loaded} className="loginB">
                        <img src={gIcon} alt="Google Icon" className="loginI" /> Log in with Google
                    </button>
                </div>
            </div>
            <footer className="footer">
                <div className="footerL">beliv</div>
                <div className="footerM" />
                <a href="https://github.com/ninjaasmoke/beliv" target="_blank" rel="noreferrer">
                    <img src={ghIcon} alt="GitHub Icon" className="footerGH" />
                </a>
            </footer>
        </div >
    )
}

export default Login;