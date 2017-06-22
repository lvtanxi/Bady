import React from 'react'
import {
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    Button,
    View
} from 'react-native';
import BaseDialog from './../../common/BaseDialog'
import Icon from 'react-native-vector-icons/Ionicons';
export default class CommentDialog extends BaseDialog {
    renderChildView() {
        return (
            <View style={styles.commentBox}>
                <View style={styles.comment}>
                    <Text style={{padding: 10}}>评论内容：</Text>
                    <TextInput placeholder="请输入你的评论..." style={styles.content} multiline={true}
                               onChangeText={(text) => this.setState({text})}
                               value={this.state.text}
                               selectTextOnFocus={true}
                               underlineColorAndroid="transparent"/>
                    <View style={{margin: 15}}>
                        <Button title="确定" onPress={this._submit}/>
                    </View>
                </View>
                <TouchableOpacity onPress={this.dismiss.bind(this)} style={{padding: 5}}>
                    <Icon size={40} name="ios-close" color={Colors.blue}/>
                </TouchableOpacity>
            </View>
        )
    }

    componentDidMount() {
        this.setState({isSendingComment: false})
    }

    _submit = () => {
        if (this.state.isSendingComment)return;
        if (!this.state.text)
            return  Toast.warning("评论不能为空");
        this.setState({isSendingComment: true}, () => {
            HttpUtils.postFatch("api/comment", {
                accessToken: "1",
                id_video: "1",
                content: this.state.text
            }).then(() => {
                this.dismiss();
                Toast.success("评论成功！");//刷新
                let comment = {
                    content: this.state.text,
                    _id: "123",
                    replyBy: {
                        nickname: "Donna Robinson",
                        avatar: "http://dummyimage.com/640X640/ac79f2)"
                    }
                };
                this.props.refreshComments && this.props.refreshComments(comment)
                this.setState({isSendingComment: false})
            })
        })
    };
    static defaultProps = {
        refreshComments: null
    }
}

const styles = StyleSheet.create({
    commentBox: {
        width: SCREEN_WIDTH * 0.8,
        alignItems: "center"
    },
    comment: {
        backgroundColor: Colors.white,
        width: SCREEN_WIDTH * 0.8,
        borderRadius: 5,
        marginBottom: 20
    },
    content: {
        paddingLeft: 4,
        color: Colors.grey3,
        borderWidth: 0.5,
        marginLeft: 15,
        marginRight: 15,
        borderColor: Colors.grey1,
        fontSize: 14,
        borderRadius: 4
    },
    commentArea: {
        width: SCREEN_WIDTH,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10
    }
});