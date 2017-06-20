import React, {Component} from 'react'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DfyTabBar from './../common/DfyTabBar'

import Account from './account'
import Edit from './edit'
import List from './list'
import Picture from './picture'
import Icon from 'react-native-vector-icons/Ionicons';
export default class index extends Component {
    static navigationOptions = ({navigation}) => ({
        //动态修改标题
        headerTitle: navigation.state.params ? navigation.state.params.tabName : "视频",
        headerTitleStyle: {
            alignSelf: 'center', //这个属性是让文字居中
            color: Colors.white
        },
        headerLeft:  <Icon size={25} name="ios-analytics-outline" color="transparent"/>,
        headerRight: (  <Icon size={25} name="ios-analytics-outline" color={Colors.white}/>)
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
                <Account {...this.props}/>
            </ScrollableTabView>
        );
    }

    _onChangeTab = (obj) => {
        let {setParams} = this.props.navigation;
        setParams({tabName: this.state.tabNames[obj.i]});
    };

}