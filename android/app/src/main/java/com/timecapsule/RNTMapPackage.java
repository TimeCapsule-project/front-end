package com.timecapsule;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.List;

public class RNTMapPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.asList(
                new RNTMapModule(reactContext)
        );
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.asList(
//                new RNNaverMapViewManager(reactContext),
//                new RNNaverMapViewTextureManager(reactContext),
//                new RNNaverMapPolylineOverlayManager(reactContext),
//                new RNNaverMapPathOverlayManager(reactContext),
//                new RNNaverMapMarkerManager(reactContext),
//                new RNNaverMapCircleOverlayManager(reactContext),
//                new RNNaverMapPolygonOverlayManager(reactContext)
        );
    }
}