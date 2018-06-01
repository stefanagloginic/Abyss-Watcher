import React, {Component} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../Stylesheets/YearSlider.css'

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const ToolTipSlider = createSliderWithTooltip(Slider);

class YearSlider extends Component {
	constructor (props) {
		super(props);

		this.state = {
			value: this.props.defaultValue
		}
	}

	onValueChange = (value) =>{
		this.props.onChange && this.props.onChange(value);
		this.setState({value: value});
	}

	render() {
		return(
			<div className="slider-wrapper">
				<div className="slider-content">
					<Slider {...this.props} onChange={this.onValueChange}/>
				</div>
				<p className="value-display">{this.state.value}</p>
			</div>
		)
	}
}

YearSlider.defaultProps = {
	defaultValue: Math.floor((1965+2018)/2),
	trackStyle: { backgroundColor: '#7db4d1' },
	railStyle: { backgroundColor: '#cecece' },
	handleStyle: {
		borderColor: '#7db4d1',
		backgroundColor: '#373a47',
	},
	min: 1965,
	max: 2018
};

export default YearSlider;