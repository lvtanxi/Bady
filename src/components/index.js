import React, {Component} from 'react'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DfyTabBar from './../common/DfyTabBar'

import Account from './account'
import Edit from './edit'
import List from './list'
import Picture from './picture'
import Icon from 'react-native-vector-icons/Ionicons';
import {
    TouchableOpacity
} from 'react-native';
export default class index extends Component {
    static navigationOptions = ({navigation}) => ({
        //动态修改标题
        headerTitle: navigation.state.params ? navigation.state.params.tabName : "视频",
        headerTitleStyle: {
            alignSelf: 'center', //这个属性是让文字居中
            color: Colors.white
        },
        headerLeft: navigation.state.params && navigation.state.params.editUser !== null ?
            <Icon size={25} name="ios-analytics-outline" color="transparent"/> : null,
        headerRight: (navigation.state.params && navigation.state.params.editUser !== null ?
            <TouchableOpacity
                onPress={() => navigation.state.params.editUser()}>
                <Icon size={25} name="ios-analytics-outline" color={Colors.white}
                      style={{marginRight: 10}}/>
            </TouchableOpacity> : null)
    });


    state = {
        tabNames: ['视频', '录制', '图片', '我的'],
        tabIconNames: ['ios-paw', 'ios-videocam', 'ios-reverse-camera', 'md-contact'],
    };


    render() {
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;
        return (
            <ScrollableTabView
                renderTabBar={() => <DfyTabBar tabNames={tabNames} tabIconNames={tabIconNames}/>}
                tabBarPosition='bottom'
                locked={false}
                onChangeTab={this._onChangeTab}
                prerenderingSiblingsNumber={1}>
                <List {...this.props}/>
                <Edit {...this.props}/>
                <Picture {...this.props}/>
                <Account {...this.props} ref={acc => this.account = acc}/>
            </ScrollableTabView>
        );
    }

    _onChangeTab = (obj) => {
        let {setParams} = this.props.navigation;
        setParams({
            tabName: this.state.tabNames[obj.i],
            editUser: obj.i === 3 ? this._editUser : null
        });
    };
    _editUser = () => {
        this.account._showD()
    };

}