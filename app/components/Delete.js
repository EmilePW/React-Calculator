import React from 'react';

class Delete extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<button className="delete" onClick={this.props.onClick}>
				Del
			</button>
		);
	}
}

export default Delete;