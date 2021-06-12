import { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Profile from './pages/Profile';
import Room from './pages/Room';
import Settings from './pages/Settings';
import Terms from './pages/Terms';

function App() {
  useEffect(() => {
    document.title = "beliv"
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/settings" exact component={Settings} />
          <Route path="/room/:roomID" exact component={Room} /> {/* Fix this */}
          <PrivateRoute path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
