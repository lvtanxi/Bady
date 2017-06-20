import React, {Component} from 'react'
import {
    StyleSheet,
    Modal,
    View
} from 'react-native';


export default class BaseDialog extends Component {

    state = {
        showLoading: false,
        animationType: "slide"
    };

    render() {
        let {opacity, backgroundColor} = this.props;
        return (
            <Modal onRequestClose={() => this.dismiss()} visible={this.state.showLoading}
                   transparent
                   animationType={this.state.animationType}>
                <View style={ [bStyles.confirmCont, {
                    opacity: opacity || 0.5,
                    backgroundColor: backgroundColor || 'gray'
                }]}/>
                <View style={ bStyles.loadingImageView }>
                    {this.renderChildView()}
                </View>
            </Modal>
        )
    }

    renderChildView() {
        return <View/>
    }

    show() {
        this.startAnim();
        this.setState({
            showLoading: true
        })
    }

    startAnim() {

    }

    cancelAnim() {

    }

    isShow() {
        return this.state.showLoading
    }

    dismiss() {
        this.cancelAnim();
        this.setState({
            showLoading: false
        });
        this.props.dismissBack && this.props.dismissBack()
    }
}

const bStyles = StyleSheet.create({
    confirmCont: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(52,52,52,0.5)'
    },
    loadingImageView: {
        position: 'absolute',
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

BaseDialog.propTypes = {
    opacity: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    dismissBack: React.PropTypes.func
};