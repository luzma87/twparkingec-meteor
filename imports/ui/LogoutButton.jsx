import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Redirect} from 'react-router';

export default class LogoutButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn : true
        }
    }

    __onLogoutClicked(event) {
        event.preventDefault();
        Meteor.logout();
        this.setState({loggedIn : false});
    }

    render() {
        if (this.state.loggedIn) {
            return (
                <a href="#" onClick={this.__onLogoutClicked.bind(this)}>
                    Logout!
                </a>
            );
        }
        return <Redirect to='/login'/>;
    }
}
