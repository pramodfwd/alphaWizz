import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Fonts} from '@utils/Constants';
import {CustomText} from '@components/global/CustomText';
import RollingBar from 'react-native-rolling-bar';
const SearchBar: FC = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Icon name="search" color={Colors.text} size={30} />
      <RollingBar
        interval={300}
        defaultStyle={false}
        customStyle={styles.textContainer}>
        <CustomText variant="h5" fontFamily={Fonts.Medium}>
          Search "Sweets"
        </CustomText>
        <CustomText variant="h5" fontFamily={Fonts.Medium}>
          home
        </CustomText>
        <CustomText variant="h5" fontFamily={Fonts.Medium}>
          Search
        </CustomText>
        <CustomText variant="h5" fontFamily={Fonts.Medium}>
          Search
        </CustomText>
        <CustomText variant="h5" fontFamily={Fonts.Medium}>
          Search
        </CustomText>
      </RollingBar>
      <View style={styles.divider} />
      <Icon name="mic" color={Colors.text} size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.border,
    marginTop: 15,
    overflow: 'hidden',
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  textContainer: {
    width: '90%',
    paddingLeft: 10,
    height: 50,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
});
export default SearchBar;
