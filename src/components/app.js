import { h, Component } from 'preact';
import { Router } from 'preact-router';
import axios from 'axios';

import Header from './header';
import Home from './home';
import Profile from './profile';

export default class App extends Component {
	componentWillMount() {
		//authorize spotify here
		const spotify = {
			id: 'f631ed4a343543a2814e52fc3da52309',
			secret: '96c311d249b24969a170c671f6267508'
		};

		const conf = {
			headers: {
				Authorization: `Basic ${spotify.id}:${spotify.secret}`
			}
		};

		axios.get('localhost:8090')
			.then(response => {
				console.log(response);
			});
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
