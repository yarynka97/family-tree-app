import React from 'react';
import axios from 'axios';
require('./setTreeContainer.css');

import NewMember from './NewMember';

export default class SetTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allowed: false,
            status: ''
        }
    }

    collectData = (memberId) => {
        this.setState({ allowed: true });
        const self = this;

        const memberContainer = document.getElementById(memberId).children,
            memberMomId = memberId + '1',
            memberDadId = memberId + '2';
        var member = {};

        Array.prototype.map.call(memberContainer, el => {
            if (el.id) {
                switch (el.id) {
                    case memberMomId:
                        console.log(`${memberId}1`);
                        member['mother'] = self.collectData(`${memberId}1`);
                        break;
                    case memberDadId:
                        console.log(`${memberId}2`);
                        member['father'] = self.collectData(`${memberId}2`);
                        break;
                    case 'name':
                        el.value === '' ?
                            self.handleStatusChange('Enter Name') :
                            member[el.id] = el.value;
                        break;
                    default:
                        if (el.value != '') { member[el.id] = el.value; }
                        break;
                }
                
            }
        });

        return member;
    }

    handleSendDataClick = () => {
        const user = this.collectData("user");
        const self = this;
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

    handleStatusChange = (message) => {
        this.setState({
            status: message,
            allowed: false
        });
    }

    render() {
        return (
            <div className="set-tree-container member-component">
                <h2>SetTree form</h2>
                <h3>{this.state.status}</h3>
                <NewMember member={"user"} />
                <br /><button onClick={this.handleSendDataClick}>Save</button><br />
                <p>{this.state.status}</p>
            </div>
        );
    }
}