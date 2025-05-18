import {View, StyleSheet, Animated} from 'react-native';
import React, {FC} from 'react';
import {NoticeHeight} from '@utils/Scaling';
import Notice from '@components/dashboard/Notice';

const notice_Height = -(NoticeHeight + 12);

const NoticeAnimation: FC<{
  noticePosition: Animated.Value;
  children: React.ReactElement;
}> = ({noticePosition, children}) => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.noticeContainer,
          {transform: [{translateY: noticePosition}]},
        ]}>
        <Notice />
      </Animated.View>

      <Animated.View
        style={[
          styles.contentContainer,
          {
            paddingTop: noticePosition.interpolate({
              inputRange: [notice_Height, 0],
              outputRange: [0, notice_Height + 20], // Reverse padding
            }),
          },
        ]}>
        {children}
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  noticeContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 999,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default NoticeAnimation;
