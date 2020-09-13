import React, { Component } from 'react';
import AppWrapper from '../components/appWrapperComponent';
import AppWrapperTest from '../components/appWrapperComponentTest';


class DefaultScreen extends Component {
  render() {
    return (
        <div>
            This is default screen
            <AppWrapper />
        </div>
    );
  }
}

export default DefaultScreen;
