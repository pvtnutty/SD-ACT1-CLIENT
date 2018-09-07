import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Panel, Button, Alert } from 'react-bootstrap';

class LogIn extends Component {
	state = {
		email: null,
		password: null,
		loading: false,
		errorMessage: null,
	};

	handleUser = ({ target: { value } }) => {
		this.setState({ email: value }, () => console.info('email', value));
	};

	handlePassword = ({ target: { value } }) => {
		this.setState({ password: value }, () => console.info('pass', value));
	};

	handleSubmit = () => {
		const { email, password } = this.state;
		const { axiosInstance, history } = this.props;

		this.setState({ loading: true, errorMessage: null }, () => {
			axiosInstance
				.post('/Users/login', { email, password })
				.then(res => {
					this.setState({ loading: false }, () => {
						const {
							data: { id },
						} = res;
						localStorage.setItem('token', id);
						history.push('/list-view');
					});
				})
				.catch(res => {
					let errorMessage = '';
					switch (res.response.status) {
						case 401:
							errorMessage = 'La cuenta o la contraseña son incorrectas';
							break;
						default:
							errorMessage = 'Error en la conexion con el servidor';
					}
					this.setState({ loading: false, errorMessage }, () => {});
				});
		});
	};

	render() {
		const { loading, errorMessage, email, password } = this.state;
		return (
			<Grid>
				<Row className="show-grid">
					<Col md={8} lg={6}>
						<Panel>
							<Panel.Heading>LogIn</Panel.Heading>
							<Panel.Body>
								<Grid>
									<Row className="show-grid">
										<Col md={8} lg={2}>
											<input
												disabled={loading}
												type="text"
												placeholder="Mail"
												onChange={this.handleUser}
											/>
											<input
												disabled={loading}
												type="password"
												placeholder="Password"
												onChange={this.handlePassword}
											/>
											<Button
												bsStyle="primary"
												disabled={loading || !email || !password}
												onClick={this.handleSubmit}>
												LogIn
											</Button>
										</Col>
									</Row>
								</Grid>
								{errorMessage && <Alert bsStyle="danger">{errorMessage}</Alert>}
							</Panel.Body>
						</Panel>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default LogIn;
