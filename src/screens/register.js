import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Panel, Button, Alert } from 'react-bootstrap';

class Register extends Component {
	state = {
		email: null,
		password: null,
		loading: false,
		errorMessage: null,
		successMessage: null,
	};

	handleUser = ({ target: { value } }) => {
		this.setState({ email: value }, () => console.info('email', value));
	};

	handlePassword = ({ target: { value } }) => {
		this.setState({ password: value }, () => console.info('pass', value));
	};

	handleSubmit = () => {
		const { email, password } = this.state;
		const { axiosInstance } = this.props;

		this.setState({ loading: true, errorMessage: null }, () => {
			axiosInstance
				.post('/Users', { email, password })
				.then(res => {
					this.setState({
						loading: false,
						successMessage: 'Tu cuenta se ha creado!',
					});
				})
				.catch(res => {
					let errorMessage = '';
					switch (res.response.status) {
						case 422:
							errorMessage = 'El correo no es válido o la cuenta ya existe';
							break;
						default:
							errorMessage = 'Error en la conexion con el servidor';
					}
					this.setState({ loading: false, errorMessage }, () => {});
				});
		});
	};

	render() {
		const {
			loading,
			errorMessage,
			successMessage,
			email,
			password,
		} = this.state;
		return (
			<Grid>
				<Row className="show-grid">
					<Col md={8} lg={6}>
						<Panel>
							<Panel.Heading>Register</Panel.Heading>
							<Panel.Body>
								<Grid>
									<Row className="show-grid">
										<Col md={8} lg={2}>
											<input
												disabled={loading}
												type="mail"
												placeholder="Mail"
												onChange={this.handleUser}
											/>
											<input
												disabled={loading}
												type="password"
												placeholder="Password"
												onChange={this.handlePassword}
											/>
											<fieldset>
												<div>
													<input type="radio" id="read" name="drone" />
													<label for="read">Read</label>
												</div>
												<div>
													<input
														type="radio"
														id="edit"
														name="drone"
														checkedhg
													/>
													<label for="edit">Read and Edit</label>
												</div>
											</fieldset>
											<Button
												bsStyle="primary"
												disabled={loading || !email || !password}
												onClick={this.handleSubmit}>
												Register
											</Button>
										</Col>
									</Row>
								</Grid>
								{errorMessage && <Alert bsStyle="danger">{errorMessage}</Alert>}
								{successMessage && (
									<Alert bsStyle="info">{successMessage}</Alert>
								)}
							</Panel.Body>
						</Panel>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default Register;
