import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SetTree from '../containers/SetTree.jsx';
import ShowTree from '../containers/ShowTree.jsx';
import LoginForm from '../containers/LoginForm';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Link to='/' >Login</Link><span> --- </span>
                    <Link to='/settree' >Create New Account</Link>

                    <Route exact path='/' component={LoginForm} />
                    <Route path="/settree" component={SetTree} />
                    <Route path="/user/:userName" component={ShowTree} />
                </div>
            </Router>
        );
  }
}
