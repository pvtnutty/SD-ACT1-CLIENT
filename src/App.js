import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';

import { PrivateRoute, ProtectedRoute } from './lib';

import { Login, DetailView, ListView, Home, Register } from './screens';

import './styles/App.css';

const App = () => {
	return (
		<Router>
			<Fragment>
				<Navbar>
					<Navbar.Header>
						<Navbar.Brand>File Client</Navbar.Brand>
					</Navbar.Header>
					<Nav>
						<NavItem eventKey={2} href="/">
							Home
						</NavItem>
						<NavItem eventKey={1} href="/file-list">
							File-List
						</NavItem>
						<NavDropdown eventKey={3} title="Options" id="basic-nav-dropdown">
							{localStorage.getItem('token') ? (
								<MenuItem
									eventKey={3.1}
									onClick={() => {
										localStorage.removeItem('token');
										window.location.replace('/');
									}}>
									Log-out
								</MenuItem>
							) : (
								<Fragment>
									<MenuItem eventKey={3.1} href="/login">
										Log-in
									</MenuItem>
									<MenuItem eventKey={3.1} href="/register">
										Register
									</MenuItem>
								</Fragment>
							)}
						</NavDropdown>
					</Nav>
				</Navbar>
				<Grid>
					<Route exact path="/" component={Home} />
					<Row className="show-grid">
						<Col sm={12} md={4} lg={6}>
							<PrivateRoute path="/file-list" component={ListView} />
						</Col>
						<Col sm={12} md={8} lg={6}>
							<PrivateRoute path="/file-list/:id" component={DetailView} />
						</Col>
					</Row>
				</Grid>
				<ProtectedRoute path="/login" component={Login} />
				<ProtectedRoute path="/register" component={Register} />
			</Fragment>
		</Router>
	);
};

export default App;
