import React, { Component } from 'react';
import DisastersParent from './DisastersParent';
import Graphs from './Graphs'
import YearSlider from './YearSlider';
import ScaleMenu from './ScaleMenu';
//---------------redux----------------------
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
/*----------------Actions------------------*/
import { setYear } from '../actions/MenuActions'
/*----------------React Router-------------*/
import { Switch, Route, withRouter } from 'react-router-dom'


class Main extends Component {
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
						onChange={ this.props.setYear }
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
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
