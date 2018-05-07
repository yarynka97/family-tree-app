import React from 'react';
import Router from "react-router-dom";
import axios from 'axios';

import TreeMember from '../components/TreeMember';
import UpdateMember from '../components/UpdateMember';

export default class ShowTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notification:'Enter username to find his/her tree',
            user: {},
            update: false,
            allowed: false
        }
    }

    componentWillMount = () => {
        var userName = this.props.match.params.userName;
        console.log(`mount ${userName}`);
        this.findTree(userName);
    }

    componentWillReceiveProps = (nextProps) => {
        var userName = nextProps.match.params.userName;
        console.log(`recProps ${userName}`);
        this.findTree(userName);
    }

    findTree = (userName) => {
        var self = this;
        if (userName) {
            axios.get(`/api/getTree/${userName}`)
                .then(function (response) {
                    var user = response.data;
                    user ?
                        self.setState({
                            notification: `${userName}'s Tree:`,
                            user
                        }) :
                        self.setState({
                            notification: "No such user",
                            user: {}
                        });
                })
                .catch(function (error) {
                    self.setState({
                        notification: error.response.data,
                        user: {}
                    });
                });
        }
        console.log(userName);
    }

    deleteTree = () => {
        var self = this;
        axios.delete(`/api/deleteTree/${this.props.match.params.userName}`)
            .then(function (response) {
                self.setState({
                    notification: `Tree deleted`,
                    user: {}
                });
            })
            .catch(function (error) {
                self.setState({
                    notification: error.response.data,
                    user: {}
                });
            });
    }

    updateTree = () => {
        this.setState({
            update: true
        });
    }

    saveNewTree = () => {
        const tree = this.collectTreeData("user");
        console.log(tree);
        const self = this;

        if (this.state.allowed) {
            axios.put(`/api/updateTree/${this.props.match.params.userName}`, tree)
                .then(function (response) {
                    console.log(response);
                    self.setState({
                        notification: 'Tree updated',
                        allowed: false
                    });
                    self.props.history.push(`/user/${self.props.match.params.userName}`);
                })
                .catch(function (error) {
                    self.setState({
                        notification: error.response.data,
                        user: {}
                    });
                });
        }

        this.setState({ update: false });
    }

    collectTreeData = (memberId) => {
        console.log(memberId);
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

    render() {
        var member = this.state.update ?
            (<UpdateMember id="user" member={this.state.user} />) :
            (<TreeMember member={this.state.user} />);

        var updateButton = this.state.update ?
            (<button onClick={this.saveNewTree}>Save Tree</button>) :
            (<button onClick={this.updateTree}>Update Tree</button >);
        return (
            <div className="show-tree-container">
                <h2>This is tree component</h2>
                <p>{this.state.notification}  </p>
                {updateButton}
                <button onClick={this.deleteTree}>Delete Tree</button>
                {member}
            </div>
        );
    }
}