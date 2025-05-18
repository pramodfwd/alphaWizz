import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import ScalePress from './scalePress';
import {Custom} from 'react-native-reanimated-carousel/lib/typescript/components/Pagination/Custom';
import {CustomText} from '@components/global/CustomText';
import {navigate} from '@utils/NavigationUtils';

const CategoryContainer = ({data}: any) => {
  const ProductCategoryNavigationHandler = () => {
    navigate('ProductCategory');
  };
  const renderItem = (items: any[]) => {
    return (
      <>
        {items?.map((item, index) => {
          return (
            <ScalePress
              key={index}
              style={styles.item}
              onPress={ProductCategoryNavigationHandler}>
              <View style={styles.imageContainer}>
                <Image source={item?.image} style={styles.img} />
              </View>
              <CustomText variant="h4" style={styles.text}>
                {item?.name}
              </CustomText>
            </ScalePress>
          );
        })}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderItem(data.slice(0, 4))}</View>
      <View style={styles.row}>{renderItem(data?.slice(4))}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
    marginBottom: 50,
  },
  row: {
    height: 80,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  text: {
    textAlign: 'center',
  },
  item: {
    width: '22%',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 6,
    backgroundColor: '#e5f3f3',
    marginBottom: 8,
    // backgroundColor: 'red',
  },
  img: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
});
export default CategoryContainer;
