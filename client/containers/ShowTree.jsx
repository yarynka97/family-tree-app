import React from 'react';
import TreeMember from '../components/TreeMember';

export default class ShowTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    handleClick = () => {
        this.setState({
            user: {
                name: this.refs.userName.value || ' ',
                birthDate: "01.01.2000",
                deathDate: "10.10.2018",
                mother: {
                    name: "mr. Someones Mom",
                    birthDate: "01.01.1978",
                    deathDate: "10.10.2002"
                },
                father: {
                    name: "mr. Someones Dad",
                    birthDate: "01.01.1970",
                    deathDate: "10.10.1999"
                }
            }
        })
    }

    render() {
        return (
            <div className="show-tree-container">
                <h2>This is tree component</h2>
                <label>UserName input: </label><input ref="userName" />
                <button onClick={this.handleClick}>Show</button>
                <TreeMember member={this.state.user} />
            </div>
        );
    }
}