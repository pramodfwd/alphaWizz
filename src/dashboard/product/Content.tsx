import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {adData, categories} from '../../utils/dummyData';
import AddCarosel from './addCarosel';
import {CustomText} from '@components/global/CustomText';
import {Fonts} from '@utils/Constants';
import CategoryContainer from './CategoryContainer';

const Content = () => {
  return (
    <View>
      <AddCarosel adData={adData} />
      <CustomText
        variant="h3"
        fontFamily={Fonts.SemiBold}
        style={{paddingHorizontal: 10}}>
        Grcery & kitchen
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText
        variant="h3"
        fontFamily={Fonts.SemiBold}
        style={{paddingHorizontal: 10}}>
        Best Sellers
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText
        variant="h3"
        fontFamily={Fonts.SemiBold}
        style={{paddingHorizontal: 10}}>
        Snaks and Drinks
      </CustomText>
      <CategoryContainer data={categories} />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//   },
// });
export default Content;
