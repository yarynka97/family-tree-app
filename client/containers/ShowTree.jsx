import React from 'react';
import Router from "react-router-dom";
import axios from 'axios';

import TreeMember from '../components/TreeMember';

export default class ShowTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notification:'Enter username to find his/her tree',
            user: {}
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
                    console.log(user);
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
                    console.log(error);
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
                console.log(error);
            });
    }

    render() {
        return (
            <div className="show-tree-container">
                <h2>This is tree component</h2>
                <p>{this.state.notification}  </p>
                <button onClick={this.updateTree}>Update Tree</button>
                <button onClick={this.deleteTree}>Delete Tree</button>
                <TreeMember member={this.state.user} />
            </div>
        );
    }
}