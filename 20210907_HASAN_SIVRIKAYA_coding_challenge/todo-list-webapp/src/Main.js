import React from 'react';
import './component/style/App.css';
import WatchList from './component/source/watchList';

export default function Main() {
	return (
		<div>
			<h1 className="App-header">Watch-List</h1>
			<WatchList />
		</div>
	);
}
