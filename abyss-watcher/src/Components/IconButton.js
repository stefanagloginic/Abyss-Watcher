import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
//--------------CSS----------------------
import '../Stylesheets/IconButton.css';

class IconButton extends Component {
	constructor(props){
		super(props)
	}

	render() {
		const { link, icon, label } = this.props;

		return (
			<div className="button_wrapper">
				<Link to={{ pathname: link }}>
					<div className="icon_wrapper">
						{icon}
					</div>
					<p>{label}</p>
				</Link>
			</div>
		);
	}
}

IconButton.propTypes = {
	link: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
	label: PropTypes.string.isRequired
}

export default IconButton;
