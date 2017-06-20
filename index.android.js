/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    AsyncStorage,
} from 'react-native';


import {SplashScreen} from './src/common/AndroidComp'

class LaunchView extends Component {
    state = {
        showImage: true
    };

    render() {
        return (
            this.state.showImage ?
                null : <App/>
        )
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                showImage: false
            });
            SplashScreen.hide();
        }, 800)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
}
import App from './src/App'
AppRegistry.registerComponent('Bady', () => LaunchView);
