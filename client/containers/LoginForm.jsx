import React from 'react';
import Router from "react-router-dom";
import axios from 'axios';

import ShowTree from './ShowTree';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            motherField: (<button name="mother" onClick={this.addNewMember}>Add Mother</button>),
            fatherField: (<button name="father" onClick={this.addNewMember}>Add Father</button>)
        }
    }

    addNewMember = (e) => {
        var self = this;
        e.target.name == 'mother' ?
            this.setState({
                motherField: (<NewMember member={`${self.props.member}1`} />)
            }) :
            this.setState({
                fatherField: (<NewMember member={`${self.props.member}2`} />)
            });
    };

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
                    console.log(error);
                });
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