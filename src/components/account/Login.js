import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Image,
    View
} from 'react-native';
import Button from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationActions} from 'react-navigation'
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Home'})
    ]
});
export default class Login extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle: {
            height: 0// 这是隐藏导航栏
        }
    });
    state = {
        codeAlreaySend: false,
        seePassWorld: false,
        cooperationAccounts: ["qq_leftdrawer_normal", "ic_weixin_login_normal", "ic_weibo_login_normal", "btn_zhifubao"],
        passWord: "",
        phone: ""
    };

    componentWillMount() {
        AsyncStorage.getItem("phone")
            .then(data => this.setState({phone: data}))
            .catch((error) => Toast.error(error.toString()))
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: "login_large_ic"}} style={styles.topImage}/>
                <View style={styles.inputView}>
                    <Icon size={20} name="md-person" color={Colors.white}/>
                    <TextInput underlineColorAndroid="transparent"
                               style={styles.inputText}
                               selectTextOnFocus={true}
                               placeholder="请输入手机号"
                               maxLength={11}
                               onChangeText={text => this.setState({phone: text})}
                               keyboardType={"phone-pad"}
                               value={this.state.phone}
                               placeholderTextColor={Colors.grey2}/>
                </View>
                <View style={styles.inputView}>
                    <Icon size={20} name="md-lock" color={Colors.white}/>
                    <TextInput underlineColorAndroid="transparent"
                               style={styles.inputText}
                               placeholder="请输入登录密码"
                               maxLength={16}
                               onChangeText={text => this.setState({passWord: text})}
                               keyboardType={'numbers-and-punctuation'}
                               selectTextOnFocus={true}
                               secureTextEntry={!this.state.seePassWorld}
                               placeholderTextColor={Colors.grey2}/>
                    <TouchableOpacity style={{marginRight: 5}} onPress={this._changeSeePassWorld}>
                        <Icon size={20} name={this.state.seePassWorld ? "md-eye-off" : "md-eye"}
                              color={Colors.white}/>
                    </TouchableOpacity>
                </View>
                <Button
                    style={styles.btnView}
                    textStyle={styles.btnText}
                    onPress={this._login}
                    title="">
                    登录
                </Button>
                <View style={styles.operation}>
                    <TouchableOpacity style={{marginLeft: 20}}
                                      onPress={() => this._toRegister("忘记密码")}>
                        <Text style={styles.registerText}>忘记密码</Text>
                    </TouchableOpacity>
                    <Button
                        style={styles.registerView}
                        textStyle={styles.registerText}
                        onPress={() => this._toRegister("注册")}
                        title="">
                        注册
                    </Button>
                </View>
                <View style={[styles.operation, {marginTop: 25}]}>
                    <View style={styles.loginByOtherLine}/>
                    <Text style={styles.registerText}>合作帐号登录</Text>
                    <View style={styles.loginByOtherLine}/>
                </View>
                <View style={styles.operation}>
                    {
                        this.state.cooperationAccounts.map((item, index) =>
                            <TouchableOpacity onPress={this._login} key={index}>
                                <Image source={{uri: item}}
                                       style={styles.cooperationAccount}/>
                            </TouchableOpacity>)
                    }
                </View>
            </View>
        )
    }

    _toRegister(name) {
        this.props.navigation.navigate("Register", {headerTitle: name})
    };

    _login = () => {
        let {phone, passWord} = this.state;
        if (isEmpty(phone)) {
            Toast.warning("手机号不能为空！")
        } else if (isEmpty(passWord)) {
            Toast.warning("密码不能为空！")
        } else if (phone.length !== 11) {
            Toast.warning("请输入正确的手机号！")
        } else {
            HttpUtils.postFatch("api/user/login", {phone: phone, passWord: passWord})
                .then(data => {
                    Toast.success("登录成功！");
                    AsyncStorage.multiSet([['phone', this.state.phone], ['user', JSON.stringify(data)]], (error) => {
                            if (error)
                                Toast.error(error.toString());
                            else
                                this.props.navigation.dispatch(resetAction)
                        }
                    );
                })
        }
    };
    _changeSeePassWorld = () => {
        this.setState({seePassWorld: !this.state.seePassWorld})
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.primary,
        justifyContent: "center"
    },
    topImage: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    inputView: {
        width: SCREEN_WIDTH * 0.7,
        borderBottomWidth: 1,
        marginTop: 40,
        paddingLeft: 5,
        borderBottomColor: Colors.grey2,
        alignItems: "center",
        flexDirection: "row"
    },
    inputText: {
        flex: 1,
        color: Colors.white,
        padding: 0,
        marginLeft: 15
    },
    btnView: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        width: SCREEN_WIDTH * 0.7,
        height: 40,
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "transparent",
        alignSelf: "center"
    },
    btnText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "bold"
    },
    operation: {
        width: SCREEN_WIDTH * 0.7,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15
    },
    registerView: {
        height: 30,
        alignSelf: "center",
        borderRadius: 15,
        width: 110,
        backgroundColor: "transparent",
        borderColor: Colors.grey2,
        borderWidth: 0.5
    },
    registerText: {
        fontSize: 14,
        color: Colors.white
    },
    loginByOtherLine: {
        width: SCREEN_WIDTH * 0.18,
        backgroundColor: Colors.grey2,
        height: 1
    },
    cooperationAccount: {
        width: 50,
        height: 50,
        borderRadius: 25
    }
});