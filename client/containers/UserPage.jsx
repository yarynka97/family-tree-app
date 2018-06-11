import React from 'react';
import { Router, Link, Redirect} from "react-router-dom";
import axios from 'axios';
import cookie from 'react-cookies'

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          isLogedin: true,
          notification: '',
          user: 'No user'
        }
    }

    componentWillMount = () => {
      this.loadUser(this.props.match.params.username);
    }

    componentWillReceiveProps = (nextProps) => {
      this.loadUser(nextProps.match.params.username);
    }

    loadUser = (username) => {
      if (username) {
        var token = cookie.load('token'),
        self=this;
        if(token){
          axios.get(`/api/user/${username}`, { 'headers': { 'x-access-token': token } })
              .then(function (response) {
                  self.setState({ user : response.data });
              })
              .catch(function (error) {
                  self.setState({ isLogedin: false })
              });
            } else{
              this.setState({ notification: 'Token is not provided' });
            }
      }
    }

    render() {
        return (
          this.state.isLogedin ?
            (<div className="login-container">
              <Link to="/">Logout</Link>
              <p>Name: {this.state.user.firstName} {this.state.user.lastName}</p>
              <p>Trees: {this.state.user.trees || 'No trees yet'}</p>
            </div>):
            (<Redirect to ='/' />)
        );
    }
}
