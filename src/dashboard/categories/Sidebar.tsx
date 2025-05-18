import {
  View,
  // Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {FC} from 'react';
// import Animated, {
//   runOnJS,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
import {Colors} from '@utils/Constants';
import {CustomText} from '@components/global/CustomText';

const Sidebar: FC<{
  categories: any;
  selectCategories: any;
  onCategoryPress: any;
}> = ({categories, selectCategories, onCategoryPress}) => {
  // const scrollViewRef = useRef<ScrollView>(null);
  // const indicatorPosition = useSharedValue(0);

  // const SharedValue = () => {
  //   return useSharedValue(0);
  // };
  // const animatedValues = categories?.map(SharedValue);

  // useEffect(() => {
  //   let targetIndex = -1;
  //   categories?.forEach((cate: any, index: number) => {
  //     const isSelected = selectCategories?._id === cate?._id;
  //     animatedValues[index].value = withTiming(isSelected ? 2 : -15, {
  //       duration: 500,
  //     });
  //     if (isSelected) targetIndex = index;
  //     if (targetIndex !== -1) {
  //       indicatorPosition.value = withTiming(targetIndex * 100, {
  //         duration: 500,
  //       });
  //       runOnJS(() => {
  //         scrollViewRef.current?.scrollTo({
  //           y: targetIndex * 100,
  //           animated: true,
  //         });
  //       });
  //     }
  //   });
  // }, [selectCategories]);

  // const indicatorStyle = useAnimatedStyle(() => ({
  //   transform: [{translateY: indicatorPosition.value}],
  // }));

  return (
    <View style={styles.sideBar}>
      <ScrollView>
        <View>
          {categories?.map((cat: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={styles.cateBtn}
                onPress={() => onCategoryPress(cat)}>
                <View
                  style={[
                    styles.imgContainer,
                    selectCategories.id === cat?._id &&
                      styles.selectedImgContainer,
                  ]}>
                  {/* <Animated.Image
                    source={{uri: cat.image}}
                    style={[styles.img, animatedStyle]}
                  /> */}
                  <Image source={{uri: cat.image}} style={styles.img} />
                </View>
                <CustomText>{cat.name}</CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {/* <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{paddingBottom: 50}}
        showsHorizontalScrollIndicator={false}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
        <View>
          {categories?.map((cat: any, index: number) => {
            const animatedStyle = useAnimatedStyle(() => ({
              bottom: animatedValues[index].value,
            }));
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={styles.cateBtn}
                onPress={() => onCategoryPress(cat)}>
                <View
                  style={[
                    styles.imgContainer,
                    selectCategories.id === cat?._id &&
                      styles.selectedImgContainer,
                  ]}>
                  <Animated.Image
                    source={{uri: cat.image}}
                    style={[styles.img, animatedStyle]}
                  />
                </View>
                <CustomText>{cat.name}</CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  sideBar: {
    width: '24%',
    backgroundColor: 'white',
    borderRightWidth: 0.8,
    borderRightColor: '#eee',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    right: 0,
    width: 4,
    height: 80,
    top: 10,
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  cateBtn: {
    padding: 10,
    height: 100,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imgContainer: {
    borderRadius: 100,
    height: '50%',
    marginBottom: 10,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f7',
    overflow: 'hidden',
  },
  selectedImgContainer: {
    backgroundColor: '#cfffdb',
  },
  img: {
    width: '100%',
    height: 40,
  },
});
export default Sidebar;
