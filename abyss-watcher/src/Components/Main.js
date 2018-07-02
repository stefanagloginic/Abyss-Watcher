import React, { Component } from 'react';
import DisastersParent from './DisastersParent';
import Graphs from './Graphs'
import YearSlider from './YearSlider';
import ScaleMenu from './ScaleMenu';
//---------------redux----------------------
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
/*----------------Actions------------------*/
import { setYear, getEarthquakesByYear, getTsunamisByYear, getVolcanoesByYear, getTornadoesByYear } from '../actions/MenuActions'
/*----------------React Router-------------*/
import { Switch, Route, withRouter } from 'react-router-dom'
/*----------------Utils---------------------*/
import debounce from 'debounce'


class Main extends Component {
	changeYear = debounce((year) => {
		this.props.setYear(year);
		this.props.getEarthquakesByYear(year);
		this.props.getTsunamisByYear(year);
		this.props.getVolcanoesByYear(year);
		this.props.getTornadoesByYear(year);
	}, 150)

	render() {
		const { year } = this.props.selectionData
		return (
			<div className="App" id="outer-container">
				<ScaleMenu 	
					pageWrapId={ "page-wrap" } 
					outerContainerId={ "outer-container" }
				/>
				<div className="main-content" id="page-wrap">
					<Switch>
				    	<Route exact path='/' component={DisastersParent} />
				    	<Route path='/graphs' component={Graphs}/>
				    </Switch>    
					<YearSlider
						defaultValue={ year }
						onChange={ this.changeYear }
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectionData: state.menuOptions
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		setYear: setYear, 
		getEarthquakesByYear: getEarthquakesByYear,
		getTsunamisByYear: getTsunamisByYear,
		getVolcanoesByYear: getVolcanoesByYear,
		getTornadoesByYear: getTornadoesByYear,
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
