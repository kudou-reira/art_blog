import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Typography from '@material-ui/core/Typography';

class ProjectLayout extends Component {
    constructor() {
        super();
        this.state = {
            task_id: '',
            database_id: '',
            upload: false
        };
    }

    renderProjectLayoutDisplay() {
        return (
            // <ImageResults 
            //     database={this.state.database_id}
            // />
            <div>
                this is the project layout display (temporary)
            </div>
        )
    }

    render() {
        return(
            <div>
                <Typography variant="h4" gutterBottom>
                    Project Layout Results
                </Typography>
                <div style={{ textAlign: "center" }}>
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
