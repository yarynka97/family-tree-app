import React from 'react';
require('../main.css');

import NewMember from './NewMember';

export default class UpdateMember extends React.Component {
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
                motherField: (<NewMember member={`${self.props.id}1`} />)
            }) :
            this.setState({
                fatherField: (<NewMember member={`${self.props.id}2`} />)
            });
    };

    render() {
        let userData = (<NewMember member="user" />);
        if (this.props.member.name) {
            const { mother, father, birthDate, deathDate } = this.props.member;
            const hasMother = mother ? (<UpdateMember id={`${this.props.id}1`} member={mother} />) : this.state.motherField,
                hasFather = father ? (<UpdateMember id={`${this.props.id}2`} member={father} />) : this.state.fatherField;
            userData = (
                <div id={this.props.id} className="member-component">
                    <p>Name: </p> <input id="name" defaultValue={this.props.member.name} />
                    <p>Surname: </p> <input id='surname' defaultValue={this.props.member.surname} />
                    <p>Date of Birth: </p><input type="date" defaultValue={birthDate} id='birthDate' />
                    <p>Date of Death: </p><input type="date" defaultValue={deathDate} id='deathDate' />
                    <p>Mother: </p>  {hasMother}
                    <p>Father: </p> {hasFather}
                </div>
            );
        }


        return userData;
    }
}