import React, { Component } from 'react';

import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import defaultScreen from './defaultScreen';
import publicationsScreen from './publicationsScreen';

class RouteScreen extends Component {
	render() {
		return(
			<div className="container">
				<Router>
					<div>
						<Switch>
								{/* <Route exact path="/project/" component={ProjectScreen} /> */}
								<Route exact path="/" component={defaultScreen} />
								<Route exact path="/publications/" component={publicationsScreen} />
						</Switch>
					</div>
				</Router>
			</div>
		)
	}
}

export default RouteScreen;