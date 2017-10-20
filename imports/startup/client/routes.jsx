import React from 'react';
import {Router, Route, Switch} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import App from '../../ui/App';
import NotFound from '../../ui/pages/NotFound';

const browserHistory = createBrowserHistory();
export const renderRoutes = () => (
    <Router history={browserHistory}>
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </div>
    </Router>
);
