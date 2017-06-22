package com.modules;

import android.widget.ImageView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Date: 2016-11-30
 * Time: 17:59
 * Description:
 */
public class CustImage extends SimpleViewManager<ImageView> {

    @Override
    public String getName() {
        return "CustImage";
    }

    @Override
    protected ImageView createViewInstance(ThemedReactContext reactContext) {
        return new ImageView(reactContext);
    }

    @ReactProp(name = "url")
    public void loadImage(ImageView view, String url) {
     /*   if (null != url && url.endsWith(".gif")) {
            Glide.with(view.getContext())
                    .load(url)
                    .asGif()
                    .centerCrop()
                    .placeholder(R.drawable.empty_image)
                    .crossFade()
                    .into(view);
            return;
        }
        Glide.with(view.getContext())
                .load(url)
                .centerCrop()
                .placeholder(R.drawable.empty_image)
                .crossFade()
                .into(view);*/
    }

}
