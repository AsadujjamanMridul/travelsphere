import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Destination from './components/Destination/Destination';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NoMatch from './components/NoMatch/NoMatch';

export const UserContext = createContext();
export const TransportContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})
  const [selectedTransport, setSelectedTranspot] = useState('')

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <TransportContext.Provider value={[selectedTransport, setSelectedTranspot]}>
        <Router>
          <Switch>
            <Route path='/home'>
              <Home />
            </Route>
            <PrivateRoute path='/destination/by_:transport'>
              <Destination />
            </PrivateRoute>
            <Route path='/login/:user'>
              <Login />
            </Route>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='*'>
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </TransportContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
