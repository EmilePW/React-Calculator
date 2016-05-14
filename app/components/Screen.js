import React from 'react';

class Screen extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div className="screen">
				<span>{this.props.output}</span>
			</div>
		);
	}
}

export default Screen;