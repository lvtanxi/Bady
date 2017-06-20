/**
 * Created by Rabbit on 2017/4/20.
 */
import React from 'react';
import {Dimensions, PixelRatio, Platform} from 'react-native';
import Colors from './Colors'
import BasicStyles from './BasicStyles'
import px2dp from './px2dp'
import HttpUtils from './HttpUtils'
import {Toast} from './AndroidComp'

let {height, width} = Dimensions.get('window');

// 获取屏幕宽度
global.SCREEN_WIDTH = width;
// 获取屏幕高度
global.SCREEN_HEIGHT = height;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');
// 常用颜色
global.Colors = Colors;
global.isLoaded = false;
global.userInfo = null;
global.setLoaded = (user) => {
    if (user === undefined || user === null) {
        this.isLoaded = false;
    } else {
        this.userInfo = JSON.parse(user);
        this.isLoaded = true
    }
};

global.cloudinary = {
    cloud_name: 'dcpiwtyxt',
    api_key: '269618545854392',
    api_secret: 'XPV1f8SdED6LDbdqgeZeBQ_cmNg',
    base_image_url:"https://res.cloudinary.com/dcpiwtyxt",
    image: "https://api.cloudinary.com/v1_1/dcpiwtyxt/image/upload",
    video: "https://api.cloudinary.com/v1_1/dcpiwtyxt/video/upload",
    audio: "https://api.cloudinary.com/v1_1/dcpiwtyxt/raw/upload"
};

global.BasicStyles = BasicStyles;
global.px2dp = px2dp;
global.Toast = Toast;
global.HttpUtils = HttpUtils;
global.BaseUrl = "http://rapapi.org/mockjs/20433/";
global.isEmpty = function (text) {
    return text === undefined || text === ""
};






