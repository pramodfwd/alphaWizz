import {StyleSheet, Animated, Image} from 'react-native';
import React from 'react';
import {screenHeight, screenWidth} from '@utils/Scaling';
import {useCollapsibleContext} from '@r0b0t3d/react-native-collapsible';
import {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {darkWeatherColors} from '@utils/Constants';
import LottieView from 'lottie-react-native';

const Visuals = () => {
  const {scrollY} = useCollapsibleContext();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]);
    return {opacity};
  });
  return (
    <Animated.View style={(styles.container, headerAnimatedStyle)}>
      <LinearGradient colors={darkWeatherColors} style={styles.gradient} />
      <Image
        source={require('@assets/images/cloud.png')}
        style={styles.cloud}
      />
      <LottieView
        autoPlay={true}
        enableMergePathsAndroidForKitKatAndAbove={true}
        loop={true}
        style={styles.lottie}
        source={require('@assets/animations/raining.json')}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    width: '100%',
    height: screenHeight * 0.4,
  },
  lottie: {
    height: 150,
    width: '100%',
    transform: [{scaleX: 1}],
    position: 'absolute',
  },
  container: {
    position: 'absolute',
  },
  cloud: {
    width: screenWidth,
    resizeMode: 'stretch',
    height: 0,
  },
});

export default Visuals;
