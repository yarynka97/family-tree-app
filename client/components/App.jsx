import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SetTree from '../containers/SetTree';
import UserPage from '../containers/UserPage';
import LoginForm from '../containers/LoginForm';
import SignupForm from '../containers/SignupForm';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={LoginForm} />
                    <Route path='/signup' component={SignupForm} />
                    <Route path="/user/:username" component={UserPage} />
                    <Route path="/settree" component={SetTree} />
                </div>
            </Router>
        );
  }
}
