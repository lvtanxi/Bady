import React from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class IndexItem extends React.PureComponent {

    state = {
        up: false
    };

    render() {
        return (
            <TouchableOpacity style={styles.itemView} onPress={() =>this.props.onSelect(this.props.item)}>
                <Text style={styles.title}>{this.props.item.title}</Text>
                <Image style={styles.image} source={{uri: this.props.item.thumb}}>
                    <Icon name="ios-play" size={30} style={styles.play}/>
                </Image>
                <View style={[styles.itemFooter, BasicStyles.border_top]}>
                    <TouchableOpacity style={styles.handleBox} onPress={this._up}>
                        <Icon name={this.state.up ? "ios-heart" : "ios-heart-outline"}
                              size={30}
                              style={ this.state.up ? styles.up : styles.down}/>
                        <Text style={styles.handleText}>喜欢</Text>
                    </TouchableOpacity>
                    <View style={styles.handleBox}>
                        <Icon name="ios-chatbubbles-outline" size={30} style={styles.down}/>
                        <Text style={styles.handleText}>评论</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _up = () => {
        HttpUtils.postFatch(BaseUrl + "api/up", {
            accessToken: "123",
            up: this.state.up ? "no" : "yes"
        }).then(() => {
                Toast.success("操作成功");
                this.setState({up: !this.state.up})
            })

    }
}

const styles = StyleSheet.create({
    itemView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        marginBottom: 0.5
    },
    title: {
        fontSize: 18,
        padding: 10,
        color: Colors.grey3
    },
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * 0.56,
        resizeMode: "cover"
    },
    play: {
        position: "absolute",
        bottom: 14,
        right: 14,
        width: 46,
        height: 46,
        paddingTop: 9,
        paddingLeft: 18,
        backgroundColor: 'transparent',
        borderColor: Colors.white,
        borderWidth: 0.5,
        borderRadius: 23,
        color: Colors.primary
    },
    itemFooter: {
        flexDirection: "row",
        width: SCREEN_WIDTH,
        justifyContent: "space-between",
        backgroundColor: "#e8e8e8"
    },
    handleBox: {
        padding: 10,
        flexDirection: "row",
        width: SCREEN_WIDTH / 2 - 0.25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white
    },
    up: {
        fontSize: 22,
        color: Colors.primary
    },
    down: {
        fontSize: 22,
        color: Colors.grey3
    },
    handleText: {
        fontSize: 14,
        marginLeft: 10,
        color: Colors.grey3
    }
});