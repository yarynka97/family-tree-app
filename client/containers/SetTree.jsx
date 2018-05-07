import React from 'react';
import axios from 'axios';
import NewMember from '../components/NewMember';

export default class SetTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allowed: false,
            status: ''
        }
    }

    collectTreeData = (memberId) => {
        const self = this;

        const memberContainer = document.getElementById(memberId).children,
            memberMomId = memberId + '1',
            memberDadId = memberId + '2';
        var member = {};

        Array.prototype.map.call(memberContainer, el => {
            if (el.id) {
                switch (el.id) {
                    case memberMomId:
                        member['mother'] = self.collectTreeData(`${memberId}1`);
                        break;
                    case memberDadId:
                        member['father'] = self.collectTreeData(`${memberId}2`);
                        break;
                    default:
                        member[el.id] = el.value == '' ?
                            'unknown' :
                            el.value;
                        break;
                }

            }
        });

        return member;
    }

    collectData = () => {
        this.state.allowed = true;
        var login = document.getElementById("login").value;
        var password = document.getElementById("password").value;

        if (login === '' || password === '') {
            this.handleStatusChange('Login and password are required');
            this.state.allowed = false;
        }

        return {
            login,
            password,
            tree: this.collectTreeData("user")
        };        
    }

    handleSendDataClick = () => {
        this.handleStatusChange('Loading...', true);
        const user = this.collectData();
        const self = this;

        if (this.state.allowed) {
            axios.post('/api/addTree', user)
            .then(function (response) {
                self.handleStatusChange(`${user.login}'s tree added`);
            })
            .catch(function (error) {
                self.handleStatusChange(error.response.data);
            });
        }

    };

    handleStatusChange = (message, allowed=false) => {
        this.setState({
            status: message,
            allowed
        });
    }

    render() {
        return (
            <div className="member-component">
                <h2>SetTree form</h2>
                <h3>{this.state.status}</h3>
                <p>Login: </p> <input id='login' />
                <p>Password: </p> <input type="password" id='password' />
                <NewMember member="user" />
                <br /><button onClick={this.handleSendDataClick} disabled={this.state.allowed}>Save</button><br />
                <p>{this.state.status}</p>
            </div>
        );
    }
}