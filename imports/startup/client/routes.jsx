import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import App from '../../ui/App';
import NotFound from '../../ui/pages/NotFound';
import Users from "../../ui/Users";
import Login from "../../ui/Login";

const browserHistory = createBrowserHistory();
export const renderRoutes = () => (
    <Router history={browserHistory}>
        <div>
            <Switch>
                <Route path="/login" component={Login}/>
                <PrivateRoute exact path="/" component={App}/>
                <PrivateRoute path="/users" component={Users}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </div>
    </Router>
);

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        Meteor.user() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
        )
    )}/>
);
