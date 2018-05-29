import React, { Component } from 'react';
import { scaleDown as Menu } from 'react-burger-menu';
import '../Stylesheets/ScaleMenu.css';

class DisasterOption extends Component {
	constructor (props) {
		super(props);
	}

	handleCheck = (e) => {
    	let checked = this.refs.checkBox.checked;

    	this.props.onChange({
    		type: this.props.name.toUpperCase(),
    		visible: checked,
    	})
  	}

	render() {
		return(
			<div className="option-wrapper">
				{this.props.icon}
				<span>{this.props.name}</span>
				<input 
					type="checkbox" 
					onChange={this.handleCheck} 
					defaultChecked={false}
					ref="checkBox"/>
			</div>
		);
	}
}

export default DisasterOption