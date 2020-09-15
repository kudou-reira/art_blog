import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Typography from '@material-ui/core/Typography';

class ProjectLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathname: props.pathname,
            projectDetails: props.projectDetails,
            projectTitle: props.projectTitle
        };
    }

    renderProjectLayoutDisplay() {
        return (
            // <ImageResults 
            //     database={this.state.database_id}
            // />
            <div>
                {this.renderText()}
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== undefined) {
            if (this.state.pathname !== nextProps.pathname) {
                this.setState({pathname: nextProps.pathname, projectTitle: nextProps.projectTitle, projectDetails: nextProps.projectDetails});
                console.log("true");
            }
        }
    }

    renderText() {
        let textItems = [];
        let tempText = '';

        tempText = (
            <Typography variant="h2" gutterBottom>
                {this.state.projectTitle}
            </Typography>
        );

        textItems.push(tempText);

        this.state.projectDetails.map((obj, index) => {
            tempText = (
                <Typography variant="h4" gutterBottom>
                    {obj.text}
                </Typography>
            )

            textItems.push(tempText);
        });

        return textItems;
    }

    render() {
        return(
            <div>
                <div>
                    {this.renderProjectLayoutDisplay()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.upload
    };
}


export default connect(mapStateToProps, actions)(withRouter(ProjectLayout));
