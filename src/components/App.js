import React from "react";
import { AuthProvider } from '../context/AuthContext';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from "./PrivateRoute";
import ResetPassword from "./ResetPassword";
import UpdateUser from "./UpdateUser";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/updateuser" component={UpdateUser} />
            {/* <Route exact path="/" component={Dashboard} /> */}
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgetpassword" component={ResetPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
