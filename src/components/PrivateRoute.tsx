import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../helper/cookies';

interface Props {
    path: string,
    exact: boolean
}

export const PrivateRoute: React.FC<Props> = ({ path, exact, children }) => {
    return (
        <Route
            path={path}
            exact={exact}
        >
            {
                getCookie('name').length !== 0 ? <>{children}</> : <Redirect to="/login" />
            }
        </Route>
    );
}