import React from 'react';

class Reset extends React.Component {
	constructor () {
		super();
	}
	render () {
		return (
			<button className="reset" onClick={this.props.onClick}>
				Reset
			</button>
		);
	}
}

export default Reset;