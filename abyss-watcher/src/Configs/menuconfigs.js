import React from 'react';
import WatcherLogo from '../Icons/WatcherLogo.js'
import Crack from '../Icons/crack'
import Tsunami from '../Icons/tsunami'
import Tornado from '../Icons/tornado'
import Hurricane from '../Icons/hurricane'
import Storm from '../Icons/storm'
import Volcano from '../Icons/volcano'

/*----------------Components---------------------*/
import MenuGraph from '../Icons/menuGraph'
import WorldMap from '../Icons/worldMap'
import { Link } from 'react-router-dom'

export default {
	header: <div className="menu-logo" key="0"><div className="logo-wrapper">{WatcherLogo}<h2>Abyss Watcher</h2></div></div>,
	links: <div className="links-wrapper">
			<Link to={{ pathname: '/' }}>
				<div className="link">
					<WorldMap size={21} />
					<span className="link-span">MAPS</span>
				</div>
			</Link>
			<Link to={{ pathname: '/graphs' }}>
				<div className="link bottom-link">
					<MenuGraph size={21} />
					<span className="link-span">GRAPHS</span>
				</div>
			</Link>
	</div>,
	options: [
		{
			name: 'Earthquakes',
			icon: <Crack size={21} />,
			href: '',
			checked: true,
		},
		{
			name: 'Tsunamis',
			icon: <Tsunami size={21} />,
			href: '',
			checked: false,
		},
		{
			name: 'Tornadoes',
			icon: <Tornado size={21} />,
			href: '',
			checked: false,
		},
		{
			name: 'Volcanoes',
			icon: <Volcano size={21} />,
			href:'',
			checked: false,
		},
		{
			name: 'Hurricanes',
			icon: <Hurricane size={21} />,
			href: '',
			checked: false,
		},
		{
			name: 'Storms',
			icon:<Storm size={21} />,
			href: '',
			checked: false,
		},
	]
}