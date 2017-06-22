package com.modules;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.tastytoast.TastyToast;

/**
 * Date: 2017-06-08
 * Time: 16:29
 * Description:
 */

public class ToastView extends ReactContextBaseJavaModule {

    public ToastView(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Toast";
    }

    /**
     * 该方法用于给JavaScript进行调用
     *
     * @param message
     */
    @ReactMethod
    public void error(String message) {
        show(message, TastyToast.ERROR);
    }

    /**
     * 该方法用于给JavaScript进行调用
     *
     * @param message
     */
    @ReactMethod
    public void confusing(String message) {
        show(message, TastyToast.CONFUSING);
    }

    /**
     * 该方法用于给JavaScript进行调用
     *
     */
    @ReactMethod
    public void success(String message) {
        show(message, TastyToast.SUCCESS);
    }

    /**
     * 该方法用于给JavaScript进行调用
     *
     */
    @ReactMethod
    public void warning(String message) {
        show(message, TastyToast.WARNING);
    }

    /**
     * 该方法用于给JavaScript进行调用
     *
     */
    @ReactMethod
    public void info(String message) {
        show(message, TastyToast.DEFAULT);
    }

    private void show(String message, int type) {
        TastyToast.makeText(getReactApplicationContext().getApplicationContext(), message, TastyToast.LENGTH_SHORT, type);
    }
}
