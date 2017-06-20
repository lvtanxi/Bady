import React, {Component} from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    AsyncStorage,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker'
import Sha1 from 'sha1'
export default class index extends Component {
    static navigationOptions = ({navigation}) => ({
            headerRight: <TouchableOpacity>
                <Icon size={30} name="ios-analytics-outline"/>
            </TouchableOpacity>
    });


    state = {
        avatarSource: null,
        avatarProgress: 0,
        avatarUploading: false
    };

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.avatarUploading ?
                        <View style={styles.avatar}><ActivityIndicator size="large"/></View> :
                        <TouchableOpacity onPress={this._chooseImage}>
                            <Image
                                source={this.state.avatarSource || {uri: userInfo.avatar || "empty_image"}}
                                style={styles.avatar}/>
                        </TouchableOpacity>
                }
            </View>
        )
    }

    _chooseImage = () => {
        let options = {
            title: '请选择头像',
            cancelButtonTitle: "取消",
            takePhotoButtonTitle: "拍照",
            chooseFromLibraryButtonTitle: "从相册",
            durationLimit: 10,
            maxWidth: 600,
            maxHeight: 600,
            quality: 0.8,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};
                let avatarUri = 'data:image/jpeg;base64,' + response.data;

                //开始上传图片
                //生成自己的时间戳
                HttpUtils.postFatch("api/signature", {
                    accessToken: userInfo.accessToken,
                    timestamp: Date.now(),
                    tags: "app,avatar",
                    folder: "avatar"
                })
                    .then(() => {
                        let time = Date.now();
                        let signature = 'folder=avatar&tags=app,avatar&timestamp=' + time + cloudinary.api_secret;
                        //sha1加密
                        signature = Sha1(signature);
                        console.log(signature);
                        //开始上传
                        let body = new FormData();
                        body.append("folder", "avatar");
                        body.append("tags", "app,avatar");
                        body.append("api_key", cloudinary.api_key);
                        body.append("timestamp", time);
                        body.append("signature", signature);
                        body.append("resource_type", "image");
                        body.append("file", avatarUri);
                        this._upLoadImage(body, source)
                    })

            }
        });
    };

    _upLoadImage(body, source) {
        let upload = new XMLHttpRequest();
        let url = cloudinary.image;
        upload.open("POST", url);
        upload.send(body);
        this.setState({
            avatarProgress: 0,
            avatarUploading: true
        });
        upload.onload = () => {
            this.setState({avatarUploading: false});
            if (upload.status !== 200)
                return Toast.error("请求失败了" + upload.responseText);
            if (!upload.responseText)
                return Toast.error("服务器返回了空的消息体");
            let result = JSON.parse(upload.responseText);
            console.log(result);
            if (result && result.public_id) {
                this.setState({
                    avatarSource: source
                });
                userInfo["avatar"] = result.url;
                AsyncStorage.setItem('user', JSON.stringify(userInfo), () => {
                        Toast.success("上传成功了");
                    }
                );

            }
        };
        if (upload.upload) {
            upload.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    let percent = Number((event.loaded / event.total).toFixed(2));
                    console.log(percent);
                    this.setState({
                        avatarProgress: percent
                    })
                }
            }
        }

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.primary,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    }
});