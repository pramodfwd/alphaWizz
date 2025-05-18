import Header from '@components/dashboard/Header';
import {useCollapsibleContext} from '@r0b0t3d/react-native-collapsible';
import {FC} from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

export const AnimatedHeader: FC<{showNotice: () => void}> = ({showNotice}) => {
  const {scrollY} = useCollapsibleContext();

  const headerAnmatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]);
    return {opacity};
  });

  return (
    <Animated.View style={[headerAnmatedStyle]}>
      <Header showNotice={showNotice} />
    </Animated.View>
  );
};
