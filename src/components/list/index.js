import React, {Component} from 'react'

import IndexItem from './IndexItem'


import UltimateListView from "react-native-ultimate-listview";
export default class index extends Component {
    state = {
        items: [],
        selected: (new Map: Map<string, boolean>),
        refreshing: true,
        lastDataSize: 0
    };

    render() {
        return <UltimateListView
            keyExtractor={(item, index) => index}  //this is required when you are using FlatList
            refreshableMode="advanced" //basic or advanced
            onFetch={this.onFetch}
            rowView={this._renderItem}  //this takes two params (item, index)
        />
    }


    onFetch = async (page = 1, startFetch, abortFetch) => {
        HttpUtils
            .getFatch("api/list?accessToken=123")
            .then(datas => startFetch(datas, 20))
            .finally(() => abortFetch())
    };

    _loadPage =(item)=>{
        this.props.navigation.navigate("Detail",{data:item})
    };

    _renderItem = (item, index) => (
        <IndexItem
            id={index}
            item={item}
            onSelect={this._loadPage}
            navigation={ this.props.navigation}
            selected={!!this.state.selected.get(index)}
        />
    );
}


