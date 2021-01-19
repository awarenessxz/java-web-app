/*
 * Wrapper Component for Route with additional logic to process admin routes
 */
import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';

const ProtectedRoute = (props: RouteProps): JSX.Element => {
    const isAuthed = useSelector((state: RootState) => state.app.isAdminUser);
    const Component = props.component as React.ComponentType<any>;

    if (props.render) {
        return <Route {...props} />;
    }

    return (
        <Route
            exact={props.exact}
            path={props.path}
            render={(componentProps): JSX.Element => {
                return isAuthed ? <Component {...componentProps} /> : <Redirect to="/notfound" />;
            }}
        />
    );
};

export default ProtectedRoute;
