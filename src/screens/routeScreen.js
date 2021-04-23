import React, { Component } from 'react';

import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import defaultScreen from './defaultScreen';
import homeScreen from './homeScreen';
import publicationsScreen from './publicationsScreen';

class RouteScreen extends Component {
	render() {
		return(
			<div className="container">
				<Router>
					<div>
						<Switch>
							<Route exact path="/" component={defaultScreen} />
							<Route exact path="/publications" component={defaultScreen} />
							<Route exact path="/segmentation" component={defaultScreen} />
							<Route exact path="/style_transfer" component={defaultScreen} />
							<Route exact path="/anime_charts" component={defaultScreen} />
							<Route exact path="/kindle_scraper" component={defaultScreen} />

							<Route exact path="/figure_sculpting" component={defaultScreen} />
							<Route exact path="/fashion_design" component={defaultScreen} />
							<Route exact path="/robot_design" component={defaultScreen} />
							<Route exact path="/character_texturing" component={defaultScreen} />
							<Route exact path="/mystical_city" component={defaultScreen} />
							<Route exact path="/octopus_study" component={defaultScreen} />
							<Route exact path="/basilica_sculpture" component={defaultScreen} />
							<Route exact path="/3d_sketches" component={defaultScreen} />

							<Route exact path="/paintings" component={defaultScreen} />
							<Route exact path="/2d_studies" component={defaultScreen} />
							<Route exact path="/motion_graphics" component={defaultScreen} />
							<Route exact path="/photography" component={defaultScreen} />

							<Route exact path="/about" component={defaultScreen} />
						</Switch>
					</div>
				</Router>
			</div>
		)
	}
}

export default RouteScreen;