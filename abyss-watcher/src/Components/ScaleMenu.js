import React, { Component } from 'react';
import { scaleDown as Menu } from 'react-burger-menu';
import FaBeer from 'react-icons/lib/fa/beer';
import '../Stylesheets/ScaleMenu.css';

class MenuWrapper extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isOpen: false
		}
	}

	render() {
		return(
			<div>
				{this.menuIcon}
				<Menu 
					{...this.props}
					isOpen={ this.state.isOpen }
			  		width={ '21em' }
					>
					{this.props.children}
				</Menu>
			</div>
		);
	}
}

export default MenuWrapper