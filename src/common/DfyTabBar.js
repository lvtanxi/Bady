import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class DfyTabBar extends Component {
    static propTypes = {
        goToPage: React.PropTypes.func, // 跳转到对应tab的方法
        activeTab: React.PropTypes.number, // 当前被选中的tab下标
        tabs: React.PropTypes.array, // 所有tabs集合
        tabNames: React.PropTypes.array, // 保存Tab名称
        tabIconNames: React.PropTypes.array, // 保存Tab图标

    };  // 注意这里有分号


    render() {
        return (
            <View style={[styles.tabs, BasicStyles.border_top]}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }


    renderTabOption(tab, i) {
        let color = this.props.activeTab === i ? Colors.primary : Colors.grey0; // 判断i是否是当前选中的tab，设置不同的颜色
        return (
            <TouchableOpacity onPress={() => this.props.goToPage(i)}
                              style={BasicStyles.center_container_flex} key={i}>
                <View style={BasicStyles.column_alignItems_center}>
                    <Icon
                        name={this.props.tabIconNames[i]} // 图标
                        size={30}
                        color={color}/>
                    <Text style={[{color: color}, styles.text]}>
                        {this.props.tabNames[i]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }


}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: Colors.white
    },
    text: {
        fontSize: 12
    }
});

