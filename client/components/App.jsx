import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SetTree from '../containers/SetTree.jsx';
import ShowTree from '../containers/ShowTree.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Link to='/settree' >Add New Tree</Link><span> --- </span>
                    <Link to='/showtree' >Show</Link>

                    <Route exact path='/' component={SetTree} />
                    <Route path="/settree" component={SetTree} />
                    <Route path="/showtree" component={ShowTree} />
                    <Route path="/userstree/:id" component={ShowTree} />
                </div>
            </Router>
        );
  }
}
