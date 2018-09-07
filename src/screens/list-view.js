import React, { Component, Fragment } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

class ListView extends Component {
	state = {
		loading: true,
		fileList: [],
	};

	componentDidMount() {
		const { axiosInstance } = this.props;

		axiosInstance
			.get('/Containers/images/files')
			.then(({ data }) => {
				this.setState({ fileList: data });
			})
			.catch(res => {});
	}

	renderFiles = (item, index) => {
		return (
			<ListGroupItem key={index} href={`/file-list/${item.name}`}>
				{item.name}
			</ListGroupItem>
		);
	};

	render() {
		const { fileList } = this.state;
		return (
			<Fragment>
				<Panel>
					<Panel.Heading>File List</Panel.Heading>
					<Panel.Body>
						<ListGroup>{fileList.map(this.renderFiles)}</ListGroup>
					</Panel.Body>
				</Panel>
			</Fragment>
		);
	}
}

export default ListView;
