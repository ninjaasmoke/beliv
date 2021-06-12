import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { getCookie } from '../helper/cookies';

interface Props {
    path: string,
    exact: boolean,
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const PrivateRoute: React.FC<Props> = ({ component, path, exact }) => {
    return (
        <Route
            path={path}
            exact={exact}
        >
            {
                getCookie('name').length !== 0 ? component : <Redirect to="/login" />
            }
        </Route>
    );
}

export default PrivateRoute