import React from 'react';
import Router from "react-router-dom";
import axios from 'axios';
import cookie from 'react-cookies'

export default class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          notification: ''
        }
    }

    handleClick = () => {
        var username = this.refs.username.value,
            email = this.refs.email.value,
            password = this.refs.psw.value,
            firstName = this.refs.firstName.value,
            lastName = this.refs.lastName.value,
            validPsw = password && password === this.refs.repPsw.value;

        var self = this;

        if (username && email && validPsw) {
          var userData = {
            username,
            email,
            password,
            firstName,
            lastName
          };

          axios.post(`/api/user`, userData)
          .then(function (res) {
            self.props.history.push(`/user/${username}`);
            cookie.save('token', res.data.token, { path: '/' });
          })
          .catch(function (err) {
            console.log(err);
          });
        } else {
          var message = !validPsw ?
            'Your repeated password is wrong' :
            'Username, email and password are required!';
          this.setState({
            notification: message
          });
        }
    }

    render() {
        return (
            <div className="login-container">
                <h2>Login to your account</h2>
                <label>Username: </label><input placeholder="Enter your username" ref="username" />
                <label>Email: </label><input placeholder="Enter your username" ref="email" />
                <label>First name: </label><input placeholder="Enter your first name" ref="firstName" />
                <label>Last name: </label><input placeholder="Enter your last name" ref="lastName" />
                <label>Password: </label><input placeholder="Password" type="password" ref="psw" />
                <label>Repeat Password: </label><input placeholder="Password" type="password" ref="repPsw" />
                <button onClick={this.handleClick}>Sign Up</button>
                <p>{this.state.notification}</p>
            </div>
        );
    }
}
