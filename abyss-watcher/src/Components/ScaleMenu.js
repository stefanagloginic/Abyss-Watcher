import React, { Component } from 'react';
import { scaleDown as Menu } from 'react-burger-menu';
import DisasterOption from './DisasterOption'
import menuConfigs from '../configs/menuconfigs'
import '../Stylesheets/ScaleMenu.css';
/*---------------redux------------------*/
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
/*---------------actions------------------*/
import * as  MenuActions from '../actions/MenuActions';

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

	get DisasterOptions() {
		let menuOptions = menuConfigs.options
			.map((item, idx) => {
				return <DisasterOption{...item} key={idx} onChange={this.onOptionChange} />;
			});
		
		return (
			<div>
				{menuConfigs.header}
				{menuOptions}
			</div>
		)
	}

	render() {
		return(
			<div>
				{this.menuIcon}
				<Menu 
					{...this.props}
					isOpen={ this.state.isOpen }
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

export default connect(null, mapDispatchToProps)(ScaleMenu);