import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {
	state = {
		hasToken: localStorage.getItem('token'),
	};

	render() {
		const { hasToken } = this.state;
		return (
			<Jumbotron>
				<h1>Welcome!</h1>
				<p>
					In this portal you can see and edit documents depending of your
					profile permissions
				</p>
				<p>
					<Button href={hasToken ? 'file-list' : 'login'} bsStyle="primary">
						{hasToken ? 'Go to file list!' : 'Login'}
					</Button>
				</p>
			</Jumbotron>
		);
	}
}

export default Home;
