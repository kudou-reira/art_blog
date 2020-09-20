import React, { useState } from 'react';
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

import ListItemText from '@material-ui/core/ListItemText';


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

	const [open, setDrawerOpen, setSubOpen] = React.useState(true);

	// const handleDrawerOpen = () => {
	// 	this.setState({ open: true });
	// };

	// const handleDrawerClose = () => {
	// 	this.setState({ open: false });
	// };

	const handleDrawerClick = () => {
		setDrawerOpen(!open);
	}

	const onClickSidebar = (text, path) => {
		props.history.push(path);
	}

	// const resourcePath = process.env.PUBLIC_URL + '/portfolio_images/';

	const resourcePath = '../portfolio_images/';


	const projectDetails = [
		{
			text: 'Overview',
			folder_path: 'overview'
		},
		{
			text: 'Final',
			folder_path: 'final'
		},
		{
			text: 'Background',
			folder_path: 'background'
		},
		{
			text: 'General Process',
			folder_path: 'process'
		},
		{
			text: 'WIP Gallery',
			folder_path: 'wip'
		}
	]

	const categoryItems = [
		{
			text: 'Home Page',
			path: '/',
			icon: 'N/A',
			sub_items: 'false'
		},
		{
			text: 'Engineering Projects',
			icon: 'N/A',
			sub_items: 'true',
			path: '/engineering',
			sub_links: [
				{
					text: 'Publications',
					path: '/publications',
					final: '/rehearsal-1.mp4',
					icon: 'N/A',
				},
				{
					text: 'Semantic Segmentation',
					path: '/segmentation',
					icon: 'N/A',
				},
				{
					text: 'Style Transfer',
					path: '/style_transfer',
					icon: 'N/A',
				},
				{
					text: 'Anime Charts',
					path: '/anime_charts',
					icon: 'N/A',
				}
			]
		},
		{
			text: '3D Projects',
			path: '/3d',
			icon: 'N/A',
			sub_items: 'true',
			sub_links: [
				{
					text: 'Human Figure Sculpting',
					path: '/figure_sculpting',
					icon: 'N/A',
				},
				{
					text: 'Fashion Design',
					path: '/fashion_design',
					icon: 'N/A',
				},
				{
					text: 'Robot Design',
					path: '/robot_design',
					icon: 'N/A',
				},
				{
					text: 'Character Design',
					path: '/character_design',
					icon: 'N/A',
				},
				{
					text: '3D sketches/ideas',
					path: '/3d_sketches',
					icon: 'N/A',
				}
			],
		},
		{
			text: '2D Projects',
			path: '2d',
			icon: 'N/A',
			sub_items: 'true',
			sub_links: [
				{
					text: 'Environmental Paintings',
					path: '/environmental_paintings',
					icon: 'N/A',
				},
				{
					text: 'Studies',
					path: '/2d_studies',
					icon: 'N/A',
				},
				{
					text: '2D sketches/ideas',
					path: '/2d_sketches',
					icon: 'N/A',
				},
			],
		},
		{
			text: 'About',
			path: '/about',
			icon: 'N/A',
			sub_items: 'false'
		}
	];

	const searchCategory = (object, pathname) => {
		if(object.hasOwnProperty('path') && object["path"].replace("/", "") == pathname) {
			console.log("this is hhhhhhhhh", object);
			return object;
		}
        	

		for(var i=0; i<Object.keys(object).length; i++){
			if(typeof object[Object.keys(object)[i]] == "object"){
				var o = searchCategory(object[Object.keys(object)[i]], pathname);
				if(o != null)
					return o;
			}
		}

		return null;
	}


	const renderComponent = () => {
		let pathname = checkPath();
		console.log("this is pathname", pathname);

		return(
			<div>
				<ProjectLayout 
					pathname={pathname}
					projectDetails={projectDetails}
					projectAll={searchCategory(categoryItems, pathname)}
					resourcePath={resourcePath}
				/>
			</div>
		)

		switch(pathname) {
			case '':
				return(
					<div>
						<ProjectLayout />
					</div>
				)
				break;
			default:
				return(
					<div>
						<ProjectLayout />
					</div>
				)
		}
	}

	const renderSelectedSidebar = (path) => {
		let pathname = checkPath();

		if(path.replace('/', '') === pathname) {
			return true;
		}

		return false;
	}

	const renderMenuOrSubItems = () => {
		let sidebar = [];
		let tempItem = '';

		categoryItems.map((obj, index) => {
			if(obj.sub_items === 'false') {
				tempItem = (
					<div>
						<MenuItem
							selected={renderSelectedSidebar(obj.path)}
							button key={obj.text}
							onClick={() => onClickSidebar(obj.text, obj.path)}
						>
							<ListItemText primary={obj.text} />
						</MenuItem>
					</div>
				);

				sidebar.push(tempItem);
			} else {
				tempItem = (
					<div>
						<MenuItem
							selected={renderSelectedSidebar(obj.path)}
							key={obj.text}
							disabled
						>
							<ListItemText primary={obj.text} />
						</MenuItem>
						<List component="div" disablePadding>
							{renderSubItems(obj.sub_links)}
						</List>
					</div>
				);

				sidebar.push(tempItem);
			}
		});

		return sidebar;
	}

	const renderSubItems = (links) => {
		let subItems = [];
		let tempItem = '';

		links.map((obj, index) => {
			tempItem = (
				<ListItem 
					button 
					className={classes.nested}
					onClick={() => onClickSidebar(obj.text, obj.path)}
				>
					<ListItemText secondary={obj.text} style={{paddingLeft: '20px'}} />
				</ListItem>
			)

			subItems.push(tempItem);
		});

		return subItems;
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
						onClick={handleDrawerClick}
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
					<IconButton onClick={handleDrawerClick}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					{renderMenuOrSubItems()}
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