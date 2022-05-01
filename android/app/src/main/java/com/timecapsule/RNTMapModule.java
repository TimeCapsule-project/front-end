package com.timecapsule;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.skt.Tmap.TMapView;

import java.util.Map;
import java.util.HashMap;

public class RNTMapModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASSNAME = "RNTMapModule";

    RNTMapModule(ReactApplicationContext context) {
        super(context);
        TMapView tmapview = new TMapView(context);
        tmapview.setSKTMapApiKey("l7xx8f76257ae4034b63887609ed0e9257b2");
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASSNAME;
    }
}