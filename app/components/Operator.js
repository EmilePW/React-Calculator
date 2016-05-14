import React from 'react';

class Operator extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<button onClick={this.props.onClick}>
				{this.props.type}
			</button>
		);
	}
}

Operator.propTypes = {
	type: React.PropTypes.string.isRequired
}

export default Operator;