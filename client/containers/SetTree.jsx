import React from 'react';
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