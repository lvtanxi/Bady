import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    View
} from 'react-native';
import CommentDialog from './CommentDialog'
import VideoPlayerAndroid from '../../common/VideoPlayerAndroid'
export default class Detail extends Component {
    state = {
        datas: []
    };

    render() {
        let data = this.props.navigation.state.params.data;
        return (
            <View style={BasicStyles.flex}>
               {/*  <VideoPlayerAndroid videoUrl={data.video}/>*/}
                <FlatList
                    keyExtractor={ (item, index) => index}
                    data={this.state.datas}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this._ListHeaderComponent}
                    renderItem={this._renderItem}
                />
                <CommentDialog ref={(c) => this.commentDialog = c} refreshComments={this._refreshComments}/>
            </View>
        )
    }

    _ListHeaderComponent = () => {
        let data = this.props.navigation.state.params.data;
        return (
            <View style={styles.listHeader}>
                <View style={styles.infoBox}>
                    <Image
                        style={styles.avatar}
                        source={{uri: data.author.avatar}}/>
                    <View style={styles.descBox}>
                        <Text style={styles.nickname}>{data.author.nickname}</Text>
                        <Text style={styles.title}>{data.title}</Text>
                    </View>
                </View>
                <View style={styles.commentBox}>
                    <TouchableOpacity style={styles.comment} onPress={this._showDialog}>
                        <Text  style={styles.content}>过来评论一下了...</Text>
                    </TouchableOpacity>
                    <View style={styles.commentArea}>
                        <Text style={styles.commentTitle}>精彩评论</Text>
                    </View>
                </View>
            </View>
        )
    };
    _refreshComments =(comment)=>{
        this.setState({
            datas:[comment].concat(this.state.datas)
        })
    };
    _showDialog = () => {
        this.commentDialog.show();
    };
    _renderItem = ({item}) => {
        return (
            <View style={styles.replyBox}>
                <Image
                    style={styles.replyavatar}
                    source={{uri: item.replyBy.avatar}}/>
                <View style={styles.reply}>
                    <Text style={styles.replynickname}>{item.replyBy.nickname}</Text>
                    <Text style={styles.replytitle}>{item.content}</Text>
                </View>
            </View>
        )
    };

    componentDidMount() {
        HttpUtils.getFatch("api/comments", {accessToken: "ads", id: "123"})
            .then(data => this.setState({datas: data}))
    }
}

const styles = StyleSheet.create({
    infoBox: {
        flexDirection: "row",
        width: SCREEN_WIDTH,
        justifyContent: "center",
        marginTop: 10
    },
    avatar: {
        width: 60,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:20
    },
    descBox: {
        flex: 1,
        marginLeft: 10
    },
    nickname: {
        fontSize: 18,
        color: Colors.grey3
    },
    title: {
        fontSize: 16,
        marginTop: 8,
        color: "#666"
    },
    replyBox: {
        flexDirection: "row",
        width: SCREEN_WIDTH,
        marginTop: 0.5,
        backgroundColor: Colors.white,
        paddingTop: 3,
        paddingBottom: 3
    },
    replynickname: {
        fontSize: 14,
        color: Colors.primary
    },
    replytitle: {
        fontSize: 12,
        color: Colors.blue,
        marginTop: 3
    },
    replyavatar: {
        width: 60,
        height: 60,
        marginLeft: 10,
        marginRight: 10
    },
    listHeader: {
        marginTop: 10,
        width: SCREEN_WIDTH,
        backgroundColor: Colors.white
    },
    commentBox: {
        marginTop: 6,
        padding: 8,
        width: SCREEN_WIDTH
    },
    comment: {
        justifyContent:"center",
        height: 50,
        borderWidth: 0.5,
        borderColor: Colors.grey1,
        borderRadius: 4
    },
    content: {
        paddingLeft: 4,
        color: Colors.grey0,
        fontSize: 14
    },
    commentArea: {
        width: SCREEN_WIDTH,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10
    },
    commentTitle: {
        color: "red",
        marginTop: 10
    }
});