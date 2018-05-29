import React from 'react';
import WatcherLogo from '../icons/WatcherLogo.js'
import Crack from '../icons/crack'
import Tsunami from '../icons/tsunami'
import Tornado from '../icons/tornado'
import Hurricane from '../icons/hurricane'
import Storm from '../icons/storm'
import Volcano from '../icons/volcano'

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