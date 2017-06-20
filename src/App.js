import React from 'react'
import './common/Global'
import {StackNavigator} from 'react-navigation'
import HomeTab from './components'
import Detail from './components/list/Detail'
import Register from './components/account/Register'
import Login from './components/account/Login'
import {
    AsyncStorage,
} from 'react-native';
import {NavigationActions} from 'react-navigation'
let time = 0;

class App extends React.Component {

    componentWillMount() {
        AsyncStorage.getItem("user")
            .then(data => {
                if (data)
                    setLoaded(data);
                let resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: isLoaded ? "Home" : "Login"})
                    ]
                });
                this.props.navigation.dispatch(resetAction)
            })
            .catch((error) => Toast.error(error.toString()))
    }

    render() {
        return null
    }
}

const StackNavigators = StackNavigator({
        App: {screen: App},
        Home: {screen: HomeTab},
        Detail: {screen: Detail, navigationOptions: {headerTitle: "视频详情界面"}},
        Register: {screen: Register},
        Login: {screen: Login}
    }, {
        mode: 'screen',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        headerMode: 'float', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
        gesturesEnabled: true,  // 是否可以右滑返回
        initialRouteName: "App",
        navigationOptions: ({navigation}) => ( {
            headerStyle: {
                backgroundColor: Colors.primary,
            },
            headerTitleStyle: {
                color: Colors.white
            },
            headerTintColor: Colors.white //设置返回按钮颜色
        })
    }
);

const defaultGetStateForAction = StackNavigators.router.getStateForAction;

StackNavigators.router.getStateForAction = (action, state) => {
    console.log(action);
    if (state && action.type === NavigationActions.BACK && state.routes.length === 1) {
        let nowTime = Date.now();
        if ((nowTime - time > 3000)) {
            Toast.warning("再按一次退出程序");
            time = nowTime;
            const routes = [...state.routes];
            return {
                ...state,
                routes,
                index: routes.length - 1,
            };
        }
    }
    return defaultGetStateForAction(action, state);
};
export default StackNavigators








