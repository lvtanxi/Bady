export default registerItems = [
    {
        iconName: "md-phone-portrait",
        placeholder: "请输入手机号",
        maxLength: 11,
        keyboardType: "phone-pad",
        stateName: "phone"
    },
    {
        iconName: "ios-brush",
        placeholder: "请输入验证码",
        maxLength: 6,
        keyboardType: "numeric",
        showBtn: true,
        stateName: "code"
    },
    {
        iconName: "ios-lock",
        placeholder: "请输入您的新密码",
        maxLength: 16,
        keyboardType: "numbers-and-punctuation",
        stateName: "pwd"
    },
    {
        iconName: "ios-lock",
        placeholder: "请再次确认您的密码",
        maxLength: 16,
        keyboardType: "numbers-and-punctuation",
        stateName: "pwd2"
    }
]