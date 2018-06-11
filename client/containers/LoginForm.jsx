import React from 'react';
import { Router, Link } from "react-router-dom";
import axios from 'axios';
import cookie from 'react-cookies'

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          notification: ''
        }
    }

    componentWillMount = () => {
      axios.get('/api/logout').then(res=>{
        cookie.save('token', res.data.token, { path: '/' });
      })
    }

    handleClick = () => {
        var username = this.refs.login.value;
        var password = this.refs.psw.value;
        var self = this;

        if (username && password) {
            axios.post(`/api/login`, {
                username,
                password
            })
                .then(function (res) {
                  cookie.save('token', res.data.token, { path: '/' })
                  self.props.history.push(`/user/${username}`);
                  self.setState({notification: ''});
                })
                .catch(function (err) {
                    console.log(err);
                });
        } else {
          this.setState({
            notification: 'Username and password are required!'
          })
        }
    }

    render() {
        return (
            <div className="login-container">
                <h2>Login to your account</h2>
                <label>Login: </label><input placeholder="Enter your username" ref="login" />
                <label>Password: </label><input placeholder="Password" type="password" ref="psw" />
                <button onClick={this.handleClick}>Login</button>
                <p>{this.state.notification}</p>
                <Link to='/signup'><button> Create New Account </button></Link>
            </div>
        );
    }
}
