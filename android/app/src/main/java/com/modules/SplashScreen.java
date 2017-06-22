package com.modules;

import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.app.Activity;
import android.app.Dialog;
import android.widget.ImageView;

import com.bady.R;

import java.lang.ref.WeakReference;


public class SplashScreen {
    private static Dialog mSplashDialog;
    private static WeakReference<Activity> mActivity;
    private static ImageView mIvEntry;

    public static void show(final Activity activity, final boolean fullScreen) {
        if (activity == null) return;
        mActivity = new WeakReference<Activity>(activity);
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!activity.isFinishing()) {

                    mSplashDialog = new Dialog(activity, fullScreen ? R.style.SplashScreen_Fullscreen : R.style.SplashScreen_SplashTheme);
                    mSplashDialog.setContentView(R.layout.launch_screen);
                    mIvEntry = (ImageView) mSplashDialog.findViewById(R.id.iv_entry);
                    mSplashDialog.setCancelable(false);

                    if (!mSplashDialog.isShowing()) {
                        mSplashDialog.show();
                        scaleAnim();
                    }
                }
            }
        });
    }

    private static void scaleAnim() {
        ObjectAnimator scaleX = ObjectAnimator.ofFloat(mIvEntry, "scaleX", 1f, 1.12f);
        ObjectAnimator scaleY = ObjectAnimator.ofFloat(mIvEntry, "scaleY", 1f, 1.12f);
        AnimatorSet animatorSet = new AnimatorSet();
        animatorSet
                .setDuration(1000)
                .play(scaleX)
                .with(scaleY);
        animatorSet.start();
    }

    static void hide(Activity activity) {
        if (activity == null) activity = mActivity.get();
        if (activity == null) return;

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mSplashDialog != null && mSplashDialog.isShowing()) {
                    mSplashDialog.dismiss();
                }
            }
        });
    }
}
