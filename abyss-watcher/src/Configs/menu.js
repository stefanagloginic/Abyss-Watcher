import React from 'react';
import FaBeer from 'react-icons/lib/fa/beer';
import FaGithubSquare from 'react-icons/lib/fa/github-square'
import FaStarO from 'react-icons/lib/fa/star-o'
import FaBellO from 'react-icons/lib/fa/bell-o'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import FaCogs from 'react-icons/lib/fa/cogs'
import FaInbox from 'react-icons/lib/fa/inbox'
import WatcherLogo from '../img/WatcherLogo.js'

var style = {
	display: 'flex',
	'align-items': 'center',
}

export default {
	items: [
		<div className="menu-logo" key="0"><div className="logo-wrapper">{WatcherLogo}<h2>Abyss Watcher</h2></div></div>,
		<a key="0" href=""><FaStarO size={21} /><span>Favorites</span></a>,
		<a key="1" href=""><FaBellO size={21} /><span>Alerts</span></a>,
		<a key="2" href=""><FaInbox size={21} /><span>Messages</span></a>,
		<a key="3" href=""><FaCommentO size={21} /><span>Comments</span></a>,
		<a key="4" href=""><FaCogs size={21} /><span>Settings</span></a>,
		<a key="5" href="https://github.com/stefanagloginic/Abyss-Watcher"><FaGithubSquare size={20} /><span>Github</span></a>
	]
}