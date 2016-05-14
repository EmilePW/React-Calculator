import React from 'react';

class Number extends React.Component {
	constructor() {
		super();
	}
	render() {
		<button>
			{this.props.value.toString()}
		</button>
	}
}

Number.propTypes = {
	value: React.PropTypes.number.isRequired
}