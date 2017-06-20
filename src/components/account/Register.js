import React, {Component} from 'react'
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import Button from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/Ionicons';
import registerItems from './../../common/Datas'
export default class Register extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.headerTitle
    });
    state = {
        isDisabled: true,
        canFinish: true,
        inputObj: {},
        code: "",
        timerCount: 60,
        btnTitle: "获取验证码"
    };

    render() {
        return (
            <View style={styles.container}>
                {
                    registerItems.map((item, index) =>
                        <View style={styles.inputView} key={index}>
                            <Icon size={20} name={item.iconName}
                                  color={Colors.primary}/>
                            <TextInput underlineColorAndroid="transparent"
                                       style={styles.inputText}
                                       selectTextOnFocus={true}
                                       placeholder={item.placeholder}
                                       maxLength={item.maxLength}
                                       value={this.state.inputObj[item.stateName]}
                                       secureTextEntry={index > 1}
                                       onChangeText={x => this._onChangeText(x, item.stateName)}
                                       keyboardType={item.keyboardType}
                                       placeholderTextColor={Colors.grey2}/>
                            {
                                item.showBtn && <Button
                                    style={styles.registerView}
                                    textStyle={styles.registerText}
                                    isDisabled={this.state.isDisabled}
                                    onPress={this._getAuthCode}
                                    title="">
                                    {this.state.btnTitle}
                                </Button>
                            }
                        </View>)
                }
                <Button
                    style={styles.submitView}
                    textStyle={styles.registerText}
                    isDisabled={this.state.canFinish}
                    onPress={this._onFinish}
                    title="">
                    完成
                </Button>
            </View>
        )
    }

    _onFinish = () => {
        let {pwd, pwd2} = this.state.inputObj;
        if (isEmpty(pwd) || isEmpty(pwd2)) {
            Toast.warning("密码不能为空喔！")
        } else if (pwd !== pwd2) {
            Toast.warning("两次密码不一致喔！")
        } else {
            HttpUtils.postFatch("api/user/register", this.state.inputObj)
                .then(() => {
                    Toast.success("操作成功！快去登录吧！");
                    this.props.navigation.goBack()
                })
        }
    };
    _getAuthCode = () => {
        HttpUtils.postFatch("api/user/getAuthCode", {phone: this.state.inputObj.phone})
            .then(data => {
                let obj = this.state.inputObj;
                obj.code = data.authCode;
                this.setState({inputObj: Object.assign(obj), canFinish: false, isDisabled: true});
                Toast.success("验证码已下发到您的手机，请注意查收...");
                this._countDownAction()
            })
    };

    _countDownAction() {
        this.interval = setInterval(() => {
            const timer = this.state.timerCount - 1;
            if (timer === 0) {
                this.interval && clearInterval(this.interval);
                this.setState({
                    timerCount: 60,
                    btnTitle: '获取验证码',
                    isDisabled:  this.state.inputObj.phone.length !== 11,
                })
            } else {
                this.setState({
                    timerCount: timer,
                    btnTitle: `重新获取(${timer}s)`,
                })
            }
        }, 1000)
    };

    _onChangeText(text, stateName) {
        let obj = this.state.inputObj;
        obj[stateName] = text;
        this.setState({inputObj: Object.assign(obj)});
        if (stateName === "phone")
            this.setState({isDisabled: text.length !== 11 && this.state.timerCount === 60})
    };

    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.white
    },
    inputView: {
        width: SCREEN_WIDTH * 0.8,
        borderBottomWidth: 1,
        marginTop: 30,
        paddingLeft: 5,
        borderBottomColor: Colors.primary,
        alignItems: "center",
        flexDirection: "row"
    },
    inputText: {
        flex: 1,
        color: Colors.blue,
        padding: 0,
        marginLeft: 15
    },
    registerView: {
        height: 30,
        alignSelf: "center",
        borderRadius: 15,
        padding: 0,
        margin: 0,
        width: 100,
        backgroundColor: "transparent",
        borderColor: Colors.primary,
        borderWidth: 1
    },
    registerText: {
        fontSize: 12,
        color: Colors.primary
    },
    submitView: {
        height: 36,
        alignSelf: "center",
        borderRadius: 18,
        padding: 0,
        marginTop: 30,
        backgroundColor: "transparent",
        borderColor: Colors.primary,
        width: SCREEN_WIDTH * 0.6,
    }
});