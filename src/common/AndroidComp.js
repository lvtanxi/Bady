import React,{PropTypes} from 'react'
import {NativeModules,Image,requireNativeComponent} from 'react-native';

export const SplashScreen = NativeModules.SplashScreen;
export const Toast = NativeModules.Toast;
let iface = {
    name: 'CustImageView',
    propTypes: {
        ...Image.propTypes,
        url: PropTypes.string,
    },
};
export const CustImageView = requireNativeComponent('CustImage', iface);