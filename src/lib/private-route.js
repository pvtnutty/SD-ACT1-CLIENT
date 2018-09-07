import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axiosInstance from './axios-instance';

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			localStorage.getItem('token') ? (
				<Component axiosInstance={axiosInstance} {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/login',
						state: { from: props.location },
					}}
				/>
			)
		}
	/>
);

export default PrivateRoute;
