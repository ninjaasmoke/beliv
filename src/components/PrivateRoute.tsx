import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../helper/cookies';

interface Props {
    path: string,
    exact: boolean,
    component: React.FC<any>;
}

const PrivateRoute: React.FC<Props> = ({ component, path, exact }) => {
    if (getCookie('name').length !== 0)
        return <Route path={path} exact={exact} component={component} />
    return <Redirect to="/login" />
}

export default PrivateRoute