import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {screenHeight, screenWidth} from '@utils/Scaling';
import {Colors, Fonts} from '@utils/Constants';
import {CustomText} from '@components/global/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import {navigate} from '@utils/NavigationUtils';

interface carProps {
  cartCount: number;
  cartImage: string;
}

const CartSummary: FC<carProps> = ({cartCount, cartImage}) => {
  return (
    <View style={styles.container}>
      <View style={styles.felxRowGrp}>
        <Image
          source={
            require('@assets/icons/bucket.png')
            // : {uri: cartImage}
          }
          style={styles.img}
        />
        <CustomText>
          {cartCount} ITEM {cartCount > 1 ? 'S' : ''}
        </CustomText>
        {/* <Icon name="arrow-drop-up" color={Colors.secondary} size={30} /> */}
      </View>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.7}
        onPress={() => navigate('ProductOrder')}>
        <CustomText style={styles.btnText} fontFamily={Fonts.Medium}>
          Next
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: screenWidth * 0.05,
    paddingBottom: screenHeight * 0.03,
    paddingTop: screenHeight * 0.014,
  },
  felxRowGrp: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: screenWidth * 0.03,
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: screenWidth * 0.025,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: screenHeight * 0.015,
    borderRadius: screenWidth * 0.025,
    backgroundColor: 'green',
    paddingHorizontal: screenWidth * 0.05,
  },
  btnText: {
    marginLeft: screenWidth * 0.02,
    color: '#fff',
  },
});
export default CartSummary;
