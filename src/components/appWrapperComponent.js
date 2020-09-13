import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ProjectLayout from './projectLayoutComponent';

// import PropTypes from 'prop-types';
// import classNames from 'classnames';

import clsx from 'clsx';
import { withStyles, useTheme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

export default withRouter(function AppWrapper(props) {
	const classes = useStyles();
	const theme = useTheme();

	const [open] = React.useState(true);

	const handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	const handleDrawerClose = () => {
		this.setState({ open: false });
	};

	const onClickSidebar = (text, path) => {
		props.history.push(path)
	}

	const linkItems = [
		{
			text: 'Home Page',
			path: '/',
			icon: 'N/A'
		},
		{
			text: 'Engineering Projects',
			path: '/engineering',
			icon: 'M/A'
		},
		{
			text: '3D Projects',
			path: '/3d',
			icon: 'M/A'
		},
		{
			text: '2D Projects',
			path: '/2d',
			icon: 'M/A'
		},
		{
			text: 'About',
			path: '/about',
			icon: 'M/A'
		}
	];

	const renderComponent = () => {
		// should i control the route to be rendered here?

		let pathname = checkPath();
		console.log("this is pathname", pathname);
		return(
			<div>
				<ProjectLayout />
			</div>
		)

		// switch(pathname) {
		// 	case '':
		// 		return(
		// 			<div>
		// 				<ProjectLayout />
		// 			</div>
		// 		)
		// 		break;
		// 	default:
		// 		return(
		// 			<div>
		// 				<ProjectLayout />
		// 			</div>
		// 		)
		// }
	}

	const renderSelectedSidebar = (path) => {
		let pathname = checkPath();

		if(path.replace('/', '') === pathname) {
			return true;
		}

		return false;
	}

	const checkPath = () => {
		let pathname = props.location.pathname.replace('/', '');
		return pathname;
	}
		

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar disableGutters={!open}>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={handleDrawerOpen}
						className={clsx(classes.menuButton, open && classes.hide)}
					>
					<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" noWrap>
						Portfolio
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					{linkItems.map((obj, index) => (
						<MenuItem
							selected={renderSelectedSidebar(obj.path)}
							button key={obj.text}
							onClick={() => onClickSidebar(obj.text, obj.path)}
						>
							{/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
							<ListItemText primary={obj.text} />
						</MenuItem>
					))}
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				{renderComponent()}
			</main>
		</div>
	);
})


// export default withRouter((withStyles(useStyles, { withTheme: true })(AppWrapper)))