import React from 'react';
import Router from "react-router-dom";
import axios from 'axios';

import ShowTree from './ShowTree';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notification: 'Enter username to find his/her tree',
            user: {}
        }
    }

    handleClick = () => {
        var login = this.refs.login.value;
        var psw = this.refs.psw.value;
        var self = this;

        if (login && psw) {
            axios.post(`/api/login`, {
                login,
                psw
            })
                .then(function (response) {
                    self.props.history.push(`/user/${login}`);
                })
                .catch(function (error) {
                    self.setState({ notification: error.response.data });
                });
        } else {
            self.setState({ notification: "Login and password are required" });
        }
    }

    render() {
        return (
            <div className="login-container">
                <h2>Log in to your account</h2>
                <label>Login: </label><input ref="login" />
                <label>Password: </label><input type="password" ref="psw" />
                <button onClick={this.handleClick}>Login</button>
                <p>{this.state.notification}</p>
            </div>
        );
    }
}