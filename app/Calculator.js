import React from 'react';
import ReactDOM from 'react-dom';

import Operator from './components/Operator';
import Screen from './components/Screen';
import NumberInput from './components/NumberInput';
import Decimal from './components/Decimal';
import Equals from './components/Equals';
import Delete from './components/Delete';
import Reset from './components/Reset';

class Calculator extends React.Component {
	constructor () {
		super();

		this.state = {
			calcArray: [],
			currentTotal: 0,
			display: '',
			justEvaluated: false
		}
	}
	calculate () {
		// Convert decimals first
		this.convertDecimals();

		// Order of operations as according to BIDMAS (no B)
		let orderOfOps = {
			"^": 1,
			"÷": 2,
			"x": 3,
			"+": 4,
			"-": 5
		}

		function operate(operator, num1, num2) {
			switch (operator) {
				case "^": 
					return Math.pow(num1, num2);
					break;
				case "÷":
					return num1 / num2;
					break;
				case "x":
					return num1 * num2;
					break;
				case "+":
					return num1 + num2;
					break;
				case "-":
					return num1 - num2;
					break;
				default:
					return 0;
			}
		}

		let newCalcArray = this.state.calcArray;

		// Loop through order of operations
		for (let currentOpOrder = 1; currentOpOrder <= 5; currentOpOrder++) {
			for (let j = 0; j < this.state.calcArray.length; j++) {
				// Check for operator
				if (isNaN(this.state.calcArray[j])) {
					let currOperator = this.state.calcArray[j];
					let prevNumber = this.state.calcArray[j-1];
					let nextNumber = this.state.calcArray[j+1];

					if (orderOfOps[currOperator] === currentOpOrder) {
						newCalcArray.splice(j-1, j+2, operate(currOperator, prevNumber, nextNumber));
					}
				}
			}
		}

		this.setState({
			currentTotal: newCalcArray[0],
			display: newCalcArray[0].toString(),
			justEvaluated: true
		});
	}
	onNumberClick (num) {

		// Check whether number is an additional digit or a separate number
		let previousInput = this.state.calcArray[this.state.calcArray.length - 1];
		
		if ( !isNaN(previousInput) ) {
			// Concatenate digit
			let newNum = previousInput.toString() + num.toString();
			
			// Convert back to number to use in operations
			newNum = parseInt(newNum, 10);

			let newCalcArray = this.state.calcArray;
			newCalcArray[newCalcArray.length - 1] = newNum;

			// If an answer was just computed start a new calculation
			if ( this.state.justEvaluated ) {
				newCalcArray = [num];

				console.log( newCalcArray );
				this.setState({
					calcArray: newCalcArray,
					currentTotal: 0,
					display: newCalcArray.join(" "),
					justEvaluated: false
				})
			}
			else {
				this.setState({
					calcArray: newCalcArray,
					display: newCalcArray.join(" "),
					justEvaluated: false
				});
			}
		}
		else {
			this.setState({
				calcArray: this.state.calcArray.concat([num]),
				display: this.state.calcArray.concat([num]).join(" "),
				justEvaluated: false
			});
		}
	}
	onDecimalPlaceClick () {
		let previousInput = this.state.calcArray[this.state.calcArray.length - 1];

		if ( !isNaN(previousInput) ) {
			this.setState({
				calcArray: this.state.calcArray.concat(["."]),
				display: this.state.calcArray.concat(["."]).join(" "),
				justEvaluated: false
			})
		}
	}
	convertDecimals () {
		let newCalcArray = this.state.calcArray;

		newCalcArray.forEach(function(val, i, arr) {
			if (val === ".") {
				let numDecimalPlaces = Math.floor( Math.log10(arr[i+1]) ) + 1;
				
				// Divide by powers of 10 to make a decimal
				arr[i-1] = arr[i-1] + arr[i+1] / Math.pow(10, numDecimalPlaces);

				// Remove decimal place
				arr.splice(i, i+1);
			}
		})

		this.setState({
			calcArray: newCalcArray
		})
	}
	onOperatorClick (operator) {
		let previousInput = this.state.calcArray[this.state.calcArray.length - 1];

		if ( !isNaN(previousInput) ) {
			this.setState({
				calcArray: this.state.calcArray.concat([operator]),
				display: this.state.calcArray.concat([operator]).join(" "),
				justEvaluated: false
			});
		}
		else {
			// Do nothing
		}
	}
	removeLastInput () {
		let newCalcArray = this.state.calcArray;
		newCalcArray.pop();

		this.setState({
			calcArray: newCalcArray,
			display: newCalcArray.join(" ")
		});
	}
	reset () {
		this.setState({
			calcArray: [],
			currentTotal: 0,
			display: '0'
		})
	}
	render () {
		let numbers = [];
		for (let i = 9; i >= 0; i--) {
			numbers.push(<NumberInput className="number-input" key={Math.random() * (i + 1)} onClick={this.onNumberClick.bind(this, i)} val={i} />);
		}

		let operators = ['+','-','x','÷','^'];
		operators = operators.map(op => <Operator className={"operator-input operator-input-" + op} key={Math.random() * 100} onClick={this.onOperatorClick.bind(this, op)} type={op} />);

		return (
			<div className="calculator">
				<Screen output={this.state.display} />
				<section className="numberPanel">
					{numbers}
					<Decimal onClick={this.onDecimalPlaceClick.bind(this)} />
				</section>
				<section className="operatorPanel">
					{operators}
				</section>
				<section className="evaluatePanel">
					<Reset onClick={this.reset.bind(this)} />
					<Delete onClick={this.removeLastInput.bind(this)} />
					<Equals onClick={this.calculate.bind(this)} />
				</section>
			</div>
		);
	}
};

ReactDOM.render(
	<Calculator />,
	document.getElementById('app')
);