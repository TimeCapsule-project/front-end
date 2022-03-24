package com.timecapsule;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // SPLASH SCREEN

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "timecapsule";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this); // SPLASH SCREEN
    super.onCreate(null);
  }
}
