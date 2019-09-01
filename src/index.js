import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from "react-router-dom";
import Login from './components/Login/Login';
import {InternalRoute} from "./components/InternalRoute/InternalRoute";
import {Route, Switch} from "react-router";
import Register from './components/Register/Register';
import Content from "./components/Content/Content";
const EntropyEncoder = () => {
    return(
        <HashRouter>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <InternalRoute component={Content} />
        </Switch>
        </HashRouter>
    )
};
ReactDOM.render(<EntropyEncoder/>, document.getElementById('root'));
serviceWorker.unregister();