import React from 'react';
import WatcherLogo from '../Icons/WatcherLogo.js'
import Crack from '../Icons/crack'
import Tsunami from '../Icons/tsunami'
import Tornado from '../Icons/tornado'
import Hurricane from '../Icons/hurricane'
import Storm from '../Icons/storm'
import Volcano from '../Icons/volcano'

export default {
	header: <div className="menu-logo" key="0"><div className="logo-wrapper">{WatcherLogo}<h2>Abyss Watcher</h2></div></div>,
	options: [
		{
			name: 'Earthquakes',
			icon: <Crack size={21} />,
			href: ''
		},
		{
			name: 'Tsunamis',
			icon: <Tsunami size={21} />,
			href: ''
		},
		{
			name: 'Tornadoes',
			icon: <Tornado size={21} />,
			href: ''
		},
		{
			name: 'Volcanoes',
			icon: <Volcano size={21} />,
			href:''
		},
		{
			name: 'Hurricanes',
			icon: <Hurricane size={21} />,
			href: ''
		},
		{
			name: 'Storms',
			icon:<Storm size={21} />,
			href: ''
		},
	]
}