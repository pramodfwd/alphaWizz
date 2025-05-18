import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {CustomText} from '@components/global/CustomText';
import {Fonts} from '@utils/Constants';
import {useAuthStore} from '@state/authStore';
import {storage, tokenStorage} from '@state/storage';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {useCartStore} from '@state/cartStore';

const DliveryHeaders = (data: any) => {
  const {logout} = useAuthStore();
  const {clearCart} = useCartStore();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 2,
        }}>
        <Image
          source={require('../../assets/images/delivery_boy.png')}
          style={styles.img}
        />
        <View style={styles.product}>
          <CustomText variant="h4" fontFamily={Fonts.Bold}>
            Hello {data.user.name}
          </CustomText>
          <CustomText variant="h4" fontFamily={Fonts.SemiBold}>
            {data.user.email}
          </CustomText>
        </View>
      </View>
      <View style={{marginLeft: 40}}>
        <TouchableOpacity
          style={{backgroundColor: 'black', padding: 10, borderRadius: 10}}
          onPress={() => {
            clearCart();
            logout();
            tokenStorage.clearAll();
            storage.clearAll();
            resetAndNavigate('CustomerLogin');
          }}>
          <CustomText
            variant="h4"
            fontFamily={Fonts.Medium}
            style={{color: '#ffff'}}>
            LogOut
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    gap: 5,
    flexDirection: 'row',
    // backgroundColor: '#ffff',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  img: {
    width: 50,
    height: 50,
  },
  product: {
    marginLeft: 10,
  },
});
export default DliveryHeaders;
