import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  console.log(response);
}

function App() {
  useEffect(() => {
    document.title = "beliv"
  }, [])
  return (
    <div className="App">
      <GoogleLogin
        clientId="422317457275-32trbdq50ku5hu36qr13b0oa9tb0cs8o.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default App;
