import {StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '@utils/Constants';
import {
  StickyView,
  useCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import SearchBar from './SearchBar';

const StickySearchBar = () => {
  const {scrollY} = useCollapsibleContext();

  // animation accroding to scrollY
  const animatedShadow = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [1, 140], [0, 1]);
    return {opacity};
  });

  // change background color according to scrollY
  const backgroundColorChanges = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [1, 80], [0, 1]);

    return {
      backgroundColor: `rbga(255,255,255, ${opacity})`,
    };
  });

  return (
    <StickyView style={backgroundColorChanges}>
      <SearchBar />
      <Animated.View style={[styles.shadow, animatedShadow]} />
    </StickyView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: 'red',
    width: '100%',
    borderStartWidth: 1,
    borderBottomColor: Colors.border,
  },
});
export default StickySearchBar;
