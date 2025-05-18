import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {screenHeight, screenWidth} from '@utils/Scaling';
import Carousel from 'react-native-reanimated-carousel';
import ScalePress from './scalePress';
import {adData} from '../../utils/dummyData';

const AddCarosel: FC<{adData: any}> = () => {
  const baseOptions = {
    vartical: false,
    width: screenWidth,
    height: screenHeight * 0.24,
  };
  return (
    <View>
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={3000}
        mode="parallax"
        data={adData}
        modeConfig={{parallaxScrollingOffset: 0, parallaxScrollingScale: 0.94}}
        renderItem={({item}: any) => {
          return (
            <ScalePress style={styles.imageContainer}>
              <Image source={item} style={styles.img} />
            </ScalePress>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 30,
  },
});

export default AddCarosel;
