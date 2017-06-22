package com.tastytoast;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.bady.R;
import com.facebook.rebound.SimpleSpringListener;
import com.facebook.rebound.Spring;
import com.facebook.rebound.SpringConfig;
import com.facebook.rebound.SpringSystem;

public class TastyToast {
    public static final int LENGTH_SHORT = 0;
    public static final int LENGTH_LONG = 1;


    public static final int SUCCESS = 1;
    public static final int WARNING = 2;
    public static final int ERROR = 3;
    public static final int INFO = 4;
    public static final int DEFAULT = 5;
    public static final int CONFUSING = 6;


    public static Toast makeText(Context context, String msg, int length, int type) {

        Toast toast = new Toast(context);
        View layout = LayoutInflater.from(context).inflate(R.layout.toast_layout, null, false);
        TextView text = (TextView) layout.findViewById(R.id.toastMessage);
        text.setText(msg);
        LinearLayout linearLayout = (LinearLayout) layout.findViewById(R.id.linearLayout);
        LinearLayout baseLayout = (LinearLayout) layout.findViewById(R.id.base_layout);
        switch (type) {
            case 1: {
                baseLayout.setBackgroundResource(R.drawable.success_toast);
                SuccessToastView successToastView = new SuccessToastView(context);
                linearLayout.addView(successToastView);
                successToastView.startAnim();
                break;
            }
            case 2: {
                baseLayout.setBackgroundResource(R.drawable.warning_toast);
                final WarningToastView warningToastView = new WarningToastView(context);
                linearLayout.addView(warningToastView);
                SpringSystem springSystem = SpringSystem.create();
                final Spring spring = springSystem.createSpring();
                spring.setCurrentValue(1.8);
                SpringConfig config = new SpringConfig(40, 5);
                spring.setSpringConfig(config);
                spring.addListener(new SimpleSpringListener() {

                    @Override
                    public void onSpringUpdate(Spring spring) {
                        float value = (float) spring.getCurrentValue();
                        float scale = (float) (0.9f - (value * 0.5f));

                        warningToastView.setScaleY(scale);
                    }
                });
                Thread t = new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            Thread.sleep(500);
                        } catch (InterruptedException e) {
                        }
                        spring.setEndValue(0.4f);
                    }
                });

                t.start();
                break;
            }
            case 3: {
                baseLayout.setBackgroundResource(R.drawable.error_toast);
                ErrorToastView errorToastView = new ErrorToastView(context);
                linearLayout.addView(errorToastView);
                errorToastView.startAnim();
                break;
            }
            case 4: {
                baseLayout.setBackgroundResource(R.drawable.info_toast);
                InfoToastView infoToastView = new InfoToastView(context);
                linearLayout.addView(infoToastView);
                infoToastView.startAnim();
                break;
            }
            case 5: {
                baseLayout.setBackgroundResource(R.drawable.info_toast);
                DefaultToastView defaultToastView = new DefaultToastView(context);
                linearLayout.addView(defaultToastView);
                defaultToastView.startAnim();
                break;
            }
            case 6: {
                baseLayout.setBackgroundResource(R.drawable.confusing_toast);
                ConfusingToastView confusingToastView = new ConfusingToastView(context);
                linearLayout.addView(confusingToastView);
                confusingToastView.startAnim();
                break;
            }
        }
        toast.setView(layout);
        toast.setDuration(length);
        toast.show();
        return toast;
    }

}
