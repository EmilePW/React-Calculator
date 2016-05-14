import React from 'react';

class NumberInput extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<button onClick={this.props.onClick}>
				{this.props.val.toString()}
			</button>
		);
	}
}

NumberInput.propTypes = {
	val: React.PropTypes.number.isRequired
}

export default NumberInput;