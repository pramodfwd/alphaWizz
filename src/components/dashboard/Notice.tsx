import {View, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {NoticeHeight} from '@utils/Scaling';
import {CustomText} from '@components/global/CustomText';
import {Defs, G, Path, Svg, Use} from 'react-native-svg';
import {wavyData} from '@utils/dummyData';

<StatusBar backgroundColor="#fff" barStyle="dark-content" />;

const Notice = () => {
  return (
    <View style={{height: NoticeHeight}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          {/* <SafeAreaView> */}
          <CustomText style={styles.textCenter}>
            Its Raining near this location
          </CustomText>
          <CustomText variant="h6" style={styles.textCenter}>
            Our delivery partner may take longer to reach you
          </CustomText>
          {/* </SafeAreaView> */}
        </View>
      </View>
      <Svg
        width="100%"
        height="35"
        fill="#CCD5E4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}>
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y="321" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeContainer: {
    width: '100%',
    zIndex: 999,
    backgroundColor: '#ccd5e4',
  },
  textCenter: {
    marginBottom: 8,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#ccd5e4',
  },
  heading: {
    color: '#2d2875',
  },
  wave: {
    transform: [{rotateX: '180deg'}],
    width: '100%',
  },
});

export default Notice;
