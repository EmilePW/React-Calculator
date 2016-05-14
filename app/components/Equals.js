import React from 'react';

class Equals extends React.Component {
	constructor () {
		super();
	}
	render () {
		return (
			<button className="equals" onClick={this.props.onClick}>
				=
			</button>
		);
	}
}

export default Equals;