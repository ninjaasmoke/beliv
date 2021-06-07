import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { PrivateRoute } from './components/PrivateRoute';
import Login from './pages/Login';

function App() {
  useEffect(() => {
    document.title = "beliv"
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" exact>
            <h1>Logged</h1>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
