import React from 'react'
import {
    StyleSheet,
} from 'react-native';


export default StyleSheet.create({
    flex: {
        flex: 1
    },
    // 水平容器
    row_flex: {
        flex: 1,
        flexDirection: 'row',
    },
    // 水平容器
    row: {
        flexDirection: 'row',
    },
    // 居中容器
    center_container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    // 居中容器
    center_container_flex: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    column_alignItems_center: {
        flexDirection: 'column',
        alignItems: 'center',
    },


    // 垂直容器
    column_container: {
        flex: 1,
        flexDirection: 'column',
    },
    // 垂直居中容器
    column_center_container: {
        justifyContent: 'center',
    },
    // 水平居中容器
    row_center_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    border_top: {
        borderTopWidth: 0.5,
        borderTopColor: "#dddddd"
    }
})