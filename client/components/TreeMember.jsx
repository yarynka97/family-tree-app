import React from 'react';
require('../main.css');

export default class TreeMember extends React.Component {
    render() {
        let userData = (<p>Enter username to get his/her family tree</p>);
        if (this.props.member.name) {
            const { mother, father, birthDate, deathDate } = this.props.member;
            const hasMother = mother ? (<TreeMember member={mother} />) : (<span>No Data</span>),
                hasFather = father ? (<TreeMember member={father} />) : (<span>No Data</span>),
                hasBirthDate = birthDate ? birthDate : 'unknown',
                hasDeathDate = deathDate ? deathDate : 'unknown';
            userData = (
                <div className="member-component">
                    <p>Name: {this.props.member.name}</p>
                    <p>Birth Date: {hasBirthDate}</p>
                    <p>Death Date: {hasDeathDate}</p>
                    <div>Mother: {hasMother}</div>
                    <div>Father: {hasFather}</div>
                </div>
            );
        }


        return userData;
    }
}