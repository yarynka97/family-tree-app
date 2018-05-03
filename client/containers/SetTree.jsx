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

    collectData = (memberId) => {
        this.state.allowed = true;
        const self = this;

        const memberContainer = document.getElementById(memberId).children,
            memberMomId = memberId + '1',
            memberDadId = memberId + '2';
        var member = {};

        Array.prototype.map.call(memberContainer, el => {
            if (el.id) {
                switch (el.id) {
                    case memberMomId:
                        member['mother'] = self.collectData(`${memberId}1`);
                        break;
                    case memberDadId:
                        member['father'] = self.collectData(`${memberId}2`);
                        break;
                    case 'login-info':
                        if (el.children[1].value === '' || el.children[3].value === '') {
                            self.handleStatusChange('Login and password are required')
                        } else {
                            member['login'] = el.children[1].value;
                            member['password'] = el.children[3].value;
                        }
                        break;
                    default:
                        member[el.id] = el.value == '' ?
                            'unknown' :
                            el.value; 
                        break;
                }
                
            }
        });

        console.log(member);
        return member;
    }

    handleSendDataClick = () => {
        this.handleStatusChange('Loading...', true);
        const user = this.collectData("user");
        const self = this;
        console.log(this.state.allowed);
        if (this.state.allowed) {
            axios.post('/api/addTree', user)
            .then(function (response) {
                console.log(response);
                self.handleStatusChange(`${user.name}'s tree added`);
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
            <div className="">
                <h2>SetTree form</h2>
                <h3>{this.state.status}</h3>
                <NewMember member={"user"} />
                <br /><button onClick={this.handleSendDataClick} disabled={this.state.allowed}>Save</button><br />
                <p>{this.state.status}</p>
            </div>
        );
    }
}