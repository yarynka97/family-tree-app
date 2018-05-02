import React from 'react';
require('./setTreeContainer.css');

export default class NewMember extends React.Component {
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

    render() {
        return (
            <div id={this.props.member} className="member-component">
                <p>Name: </p><input id='name' />
                <p>Date of Birth: </p><input id='birthDate' />
                <p>Date of Death: </p><input id='deathDate' />
                <p>Mother: </p>  {this.state.motherField}
                <p>Father: </p> {this.state.fatherField}
            </div>
        );
    }
}