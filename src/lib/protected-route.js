import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axiosInstance from './axios-instance';

const ProtectedRoute = ({ isAuthenticated, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				!localStorage.getItem('token') ? (
					<Component axiosInstance={axiosInstance} {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/file-list',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

export default ProtectedRoute;
