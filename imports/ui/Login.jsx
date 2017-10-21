import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import Message from "./Message";
import {Redirect} from 'react-router';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : "",
            errors : null,
            from : null
        }
    }

    setNewState(newVals) {
        let prevState = this.state;
        let newState = Object.assign(prevState, newVals);
        this.setState(newState);
    }

    __onLoginClicked = (event) => {
        event.preventDefault();

        const name = this.state.username.trim();
        const password = this.state.password.trim();

        Meteor.loginWithPassword(name, password, (params) => {
            if (params) {
                let errors = "";
                switch (params.error) {
                    case 400:
                        errors = "Ingresa tu usuario y password.";
                        break;
                    case 403:
                        errors = "Verifica que tu usuario y password estén correctos.";
                        break;
                    default:
                        errors = "Ooops, hay un error desconocido. Refresca la página e intenta de nuevo.";
                }
                this.setNewState({errors : errors});
            } else {
                const {from} = this.props.location.state || {from : {pathname : '/'}};
                this.setNewState({from : from});
            }
        });
    };

    __onKeyPressed(event, stateKey) {
        this.setNewState({[stateKey] : event.target.value});
    }

    render() {
        if (this.state.from !== null) {
            return <Redirect to={this.state.from}/>;
        }
        return (
            <div className="ui raised very padded text container segment">
                <h3>TW Parking Ec</h3>

                <Message message={this.state.errors}/>

                <form className="ui form">
                    <div className="field">
                        <div className="ui left icon input">
                            <input type="text"
                                   placeholder="Username"
                                   autoComplete="usernamef"
                                   value={this.state.username}
                                   onChange={(ev) => this.__onKeyPressed(ev, 'username')}/>
                            <i className="users icon"/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                            <input
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                autoComplete="current-password"
                                onChange={(ev) => this.__onKeyPressed(ev, 'password')}/>
                            <i className="privacy icon"/>
                        </div>
                    </div>
                    <button className="ui button" onClick={this.__onLoginClicked.bind(this)}>
                        <i className="icon sign in"/>
                        Login
                    </button>
                </form>
            </div>
        );
    }
}
