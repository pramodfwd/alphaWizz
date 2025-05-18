import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ActionButton from '../../components/global/ActionButton';
import {useAuthStore} from '../../state/authStore';
// import axios from 'axios';
// import {REAL_MOBILE_BASE_URL} from '@service/config';
import CustomerHeader from '../../dashboard/categories/CustomerHeader';
import {CustomText} from '@components/global/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import {useCartStore} from '../../state/cartStore';
import {storage, tokenStorage} from '@state/storage';
import {resetAndNavigate} from '@utils/NavigationUtils';
import ProfileItem from './ProfileItem';

const Profile = () => {
  const {user, currentOrder, logout} = useAuthStore();
  const {clearCart} = useCartStore();

  return (
    <View>
      <CustomerHeader title="Profile" />
      <View style={styles.container}>
        <Text>
          Your Profile{' '}
          <CustomText variant="h4" fontFamily={Fonts.SemiBold}>
            {currentOrder?.order?.customer?.name}
          </CustomText>
        </Text>
        <CustomText variant="h4" fontFamily={Fonts.Medium}>
          {currentOrder?.order?.customer?.phone}
        </CustomText>
        <CustomText variant="h4" fontFamily={Fonts.Medium}>
          {currentOrder?.order?.customer
            ? currentOrder?.order?.customer?.name
            : 'Name not available'}{' '}
          , {currentOrder?.order?.customer?.phone}
        </CustomText>
      </View>
      <View style={styles.container}>
        <CustomText variant="h4" fontFamily={Fonts.SemiBold}>
          wallet balance
        </CustomText>
        <CustomText variant="h4" fontFamily={Fonts.Medium}>
          Support
        </CustomText>
        <CustomText variant="h4" fontFamily={Fonts.Medium}>
          Payment
        </CustomText>
      </View>
      <ProfileItem currentOrder={currentOrder} />
      <ActionButton
        title="Logout"
        onPress={() => {
          clearCart();
          logout();
          tokenStorage.clearAll();
          storage.clearAll();
          resetAndNavigate('CustomerLogin');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    gap: 5,
    backgroundColor: '#ffff',
    borderRadius: 10,
    alignItems: 'flex-start',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  mainContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Productcontainer: {
    width: '100%',
    backgroundColor: '#fff36788',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingVertical: 10,
    paddingBottom: 100,
  },
  img: {
    width: '20%',
    height: 50,
  },
});

export default Profile;

// {
//     "liveLocation": {
//         "latitude": 23.219337,
//         "longitude": 77.455669
//     },
//     "_id": "6813d2cfedc40abb41bc6287",
//     "name": "Pramod kumar mishra",
//     "isActivated": true,
//     "role": "customer",
//     "phone": 8754433222,
//     "isProfileComplete": false,
//     "__v": 0,
//     "address": "शक्ति नगर Habib Ganj Bhopal, Madhya Pradesh"
// }
