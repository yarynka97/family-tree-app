import React from 'react';
import axios from 'axios';
require('./setTreeContainer.css');

export default class SetTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            motherField: (<button name="mother" onClick={this.addNewMember}>Add Mother</button>),
            fatherField: (<button name="father" onClick={this.addNewMember}>Add Father</button>)
        }
    }

    addNewMember = (e) => {
        e.target.name == 'mother' ?
            this.setState({
                motherField: (<SetTree relative={true} />) }) :
            this.setState({
                fatherField: (<SetTree relative={true} />) });
    };

    handleSendDataClick = () => {
        var userName = this.refs.userName.value;
        axios.post('/api/addTree', {
            name: userName,
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
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log('clicked');
    };

    render() {
        var button = !this.props.relative ? (<button onClick={this.handleSendDataClick}>Save</button>) : "";
        var tittle = !this.props.relative ? (<h2>SetTree form</h2>) : "";

        return (
            <div className="set-tree-container member-component">
                {tittle}
                <p>Name: </p><input ref='userName' />
                <p>Date of Birth: </p><input ref='birthDate' />
                <p>Date of Death: </p><input ref='deathDate' />
                <p>Mother: </p>  {this.state.motherField}
                <p>Father: </p> {this.state.fatherField}
                <br />{button}
            </div>
        );
    }
}