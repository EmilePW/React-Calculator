import React from 'react';

class Decimal extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<button className="decimal-place-input" onClick={this.props.onClick}>.</button>
		);
	}
}

export default Decimal;