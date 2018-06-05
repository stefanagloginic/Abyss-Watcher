import React, { Component } from 'react';
import { scaleDown as Menu } from 'react-burger-menu';
import DisasterOption from './DisasterOption'
import menuConfigs from '../Configs/menuconfigs'
import '../Stylesheets/ScaleMenu.css';
/*---------------redux------------------*/
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
/*---------------actions------------------*/
import * as  MenuActions from '../actions/MenuActions';

/*--------------utils---------------------*/
import _ from 'lodash';
import { Link } from 'react-router-dom'

class ScaleMenu extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isOpen: false
		}
	}

	onOptionChange = (data) => {
		switch(data.type){
			case 'EARTHQUAKES':
				this.props.setEarthquakeOptions(data);
				break;
			case 'TSUNAMIS':
				this.props.setTsunamiOptions(data);
				break;
			case 'TORNADOES':
				this.props.setTornadoOptions(data);
				break;
			case 'HURRICANES':
				this.props.setHurricanOptions(data);
				break;
			case 'VOLCANOES':
				this.props.setVolcanoOptions(data);
				break;
			case 'STORMS':
				this.props.setStormOptions(data);
				break;
			default:
				break;
		}

	}

	componentDidUpdate(prevProps, prevState) {
		this.state = prevState;
	}

	get DisasterOptions() {
		let menuOptions = menuConfigs.options
			.map((item, idx) => {
				var defaultOptions = _.find(this.props.menuOptions, ['type', item.name.toUpperCase()]);
				return <DisasterOption
							{...item} 
							checked={defaultOptions.visible}
							key={idx} 
							onChange={this.onOptionChange} 
						/>;
			});
		
		return (
			<div>
				{menuConfigs.header}
				{menuConfigs.links}
				{menuOptions}
			</div>
		)
	}

	isMenuOpen = (state) => {
		this.setState({isOpen: state.isOpen});
	}

	render() {
		return(
			<div>
				{this.menuIcon}
				<Menu 
					{...this.props}
					isOpen={ this.state.isOpen }
					onStateChange={ this.isMenuOpen }
			  		width={ '21rem' }
					>
					{this.DisasterOptions}
				</Menu>
			</div>
		);
	}
}


const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(MenuActions, dispatch);
}

const mapStateToProps = (state) => {
	return {
		menuOptions: state.menuOptions
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ScaleMenu);