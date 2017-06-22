import React from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    AsyncStorage,
    View
} from 'react-native';
import BaseDialog from './../../common/BaseDialog'
import {SegmentedControls} from 'react-native-radio-buttons';
import Button from 'apsl-react-native-button'
const options = [
    {label: '男宝宝', value: 'male'},
    {label: '女宝宝', value: 'female'}
];
export default class EditUserDialog extends BaseDialog {
    componentWillMount() {
        this.setState({
            selectedCustomSegment: options[0],
            age:userInfo.age,
            nickname:userInfo.nickname
        });
        if(userInfo&&userInfo.sex)
            this.setState({selectedCustomSegment: JSON.parse(userInfo.sex)||options[0]})
    }

    renderChildView() {
        console.log(this.state, userInfo.age, userInfo);
        return (
            <View style={styles.commentBox}>
                <View style={styles.comment}>
                    <Text style={styles.lable}>昵称</Text>
                    <TextInput
                               value={this.state.nickname}
                               underlineColorAndroid="transparent"
                               placeholder="请输入您的昵称"
                               onChangeText={nickname => this.setState({nickname})}
                               placeholderTextColor={Colors.grey2}
                               style={BasicStyles.flex}/>
                </View>
                <View style={styles.comment}>
                    <Text style={styles.lable}>年龄</Text>
                    <TextInput
                               value={this.state.age}
                               underlineColorAndroid="transparent"
                               style={BasicStyles.flex}
                               placeholderTextColor={Colors.grey2}
                               placeholder="请输入您的年龄"
                               onChangeText={age => this.setState({age})}
                               keyboardType="number-pad"/>
                </View>
                <View style={styles.comment}>
                    <Text style={styles.lable}>性别</Text>
                    <View style={styles.segmented}>
                        <SegmentedControls
                            tint={'#f80046'}
                            selectedTint={'white'}
                            backTint={'#1e2126'}
                            optionStyle={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                fontFamily: 'Snell Roundhand'
                            }}
                            options={ options }
                            onSelection={ this.setSelectedOption.bind(this) }
                            selectedOption={this.state.selectedCustomSegment }
                            extractText={ (option) => option.label }
                            testOptionEqual={ (a, b) => a.label === b.label}
                        />
                    </View>
                </View>
                <Button
                    style={styles.btnView}
                    textStyle={styles.btnText}
                    onPress={this._save}
                    title="">
                    保存
                </Button>
            </View>
        )
    }

    setSelectedOption(option) {
        this.setState({
            selectedCustomSegment: option
        });
    }

    _save = () => {
        HttpUtils.postFatch("api/user/update", {
            age: this.state.age,
            nickname: this.state.nickname,
            sex: this.state.selectedCustomSegment.value,
        }).then(() => {
            userInfo["nickname"] = this.state.nickname;
            userInfo["age"] = this.state.age;
            userInfo["sex"] = JSON.stringify(this.state.selectedCustomSegment);
            AsyncStorage.setItem('user', JSON.stringify(userInfo), (error) => {
                    if (error) return Toast.error(error.toString());
                    Toast.success("修改用户信息成功");
                    this.dismiss()
                }
            );
        })
    };
}
const styles = StyleSheet.create({
    commentBox: {
        width: SCREEN_WIDTH * 0.8,
        alignItems: "center"
    },
    comment: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
        width: SCREEN_WIDTH * 0.8,
        justifyContent: "space-between",
        borderBottomColor: Colors.primary,
        borderBottomWidth: 0.5
    },
    lable: {
        paddingLeft: 15,
        paddingRight: 10
    },
    segmented: {
        width: 110,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20
    },
    btnView: {
        backgroundColor: Colors.white,
        width: SCREEN_WIDTH * 0.7,
        height: 40,
        marginTop: 20,
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
});