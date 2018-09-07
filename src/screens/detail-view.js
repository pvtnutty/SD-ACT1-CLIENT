import React, { Component, Fragment } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, Alert } from 'react-bootstrap';
import ReactQuill from 'react-quill';

class DetailView extends Component {
	state = {
		text: '',
		loadingDoc: true,
		errorMessage: null,
		isEditing: false,
		loadingEdit: false,
	};

	componentDidMount() {
		const {
			axiosInstance,
			match: { params },
		} = this.props;
		axiosInstance
			.get(`/Containers/images/download/${params.id}`)
			.then(({ data }) => {
				this.setState({ loadingDoc: false, text: data }, () => {});
			})
			.catch(res => {
				let errorMessage = '';
				this.setState({ loadingDoc: false, errorMessage }, () => {});
			});
	}

	handleChange = value => {
		this.setState({ text: value });
	};

	handleEdit = () => {
		const {
			axiosInstance,
			match: { params },
		} = this.props;
		const { isEditing, text } = this.state;

		if (isEditing) {
			this.setState({ isEditing: false }, () => {
				const formData = new FormData();
				var textToSaveAsBlob = new Blob([text], { type: 'text/plain' });
				formData.append('file', textToSaveAsBlob, params.id);
				axiosInstance
					.post(`/Containers/images/upload`, formData)
					.then(res => {
						this.setState({ loadingEdit: false, isEditing: false });
					})
					.catch(res => {
						let errorMessage = '';
						this.setState({ loadingEdit: false, errorMessage });
					});
			});
			/*this.setState({ errorMessage: null, loadingEdit: true }, () => {
				axiosInstance
					.post(`saveFile ${params.id}`)
					.then(res => {
						this.setState({ loadingEdit: false, isEditing: false });
					})
					.catch(res => {
						let errorMessage = '';
						//Token no valid
						//Someone is Editing
						//Timeout
						this.setState({ loadingEdit: false, errorMessage });
					});
			});*/
		} else {
			this.setState({ isEditing: true });
			/*this.setState({ errorMessage: null, loadingEdit: true }, () => {
				axiosInstance
					.post(`/Containers/images/upload`, )
					.then(res => {
						this.setState({ loadingEdit: false, isEditing: true });
					})
					.catch(res => {
						//Token no valid
						//You dont have permission to edit
						//Timeout
						let errorMessage = '';
						this.setState({ loadingEdit: false, errorMessage });
					});
			});*/
		}
	};

	render() {
		const { isEditing, errorMessage } = this.state;
		return (
			<Fragment>
				<Button
					bsStyle={isEditing ? 'primary' : 'default'}
					onClick={this.handleEdit}>
					{isEditing ? 'Save' : 'Edit'}
				</Button>
				{errorMessage && <Alert bsStyle="danger">{errorMessage}</Alert>}
				<ReactQuill
					readOnly={!isEditing}
					value={this.state.text}
					onChange={this.handleChange}
				/>
			</Fragment>
		);
	}
}

export default DetailView;
