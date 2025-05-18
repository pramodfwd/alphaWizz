import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useAuthStore} from '@state/authStore';
import {Colors, Fonts} from '@utils/Constants';
import LIveHeader from './LIveHeader';
import {CustomText} from '@components/global/CustomText';
import OrderSummry from '../../dashboard/order/OrderSummry';
import DeliveryDetails from '../../dashboard/order/DeliveryDetails';
// import {REAL_MOBILE_BASE_URL} from '@service/config';
// import axios from 'axios';
import LiveMap from '../../features/map/LiveMap';

const LiveTracking = () => {
  const {currentOrder} = useAuthStore();

  let msg;
  let time;
  if (currentOrder?.order?.status == 'confirmed') {
    msg = 'Arriving soon';
    time = 'Arriving in 10 minutes';
  } else if (currentOrder?.order?.status == 'arriving') {
    msg = 'Order pciked up';
    time = 'Arriving in 6 minutes';
  } else if (currentOrder?.order?.status == 'delivered') {
    msg = 'Order deliverd';
    time = 'Fastest delivery';
  } else {
    msg = 'picking your order';
    time = 'Arrving in 10 mintues';
  }
  return (
    <View style={styles.container}>
      <LIveHeader type="customer" title={msg} secondTitle={time} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <LiveMap
          deliveryLocation={currentOrder?.order?.deliveryLocation}
          pickupLocation={currentOrder?.order?.pickupLocation}
          deliveryPartnerLocation={currentOrder?.order?.deliveryPartner}
          hasAccepted={currentOrder?.order?.status == 'confirmed'}
          hasPickedUp={currentOrder?.order?.status == 'arriving'}
        />
        <View style={styles.mainContainer}>
          <CustomText
            style={styles.titleTextWhite}
            variant="h5"
            fontFamily={Fonts.SemiBold}>
            {currentOrder?.order.deliveryPartner?.name ||
              'We will soon assign delivery partner'}
          </CustomText>
          {currentOrder?.order.deliveryPartner && (
            <CustomText
              style={styles.titleTextWhite}
              variant="h6"
              fontFamily={Fonts.Medium}>
              {currentOrder?.order.deliveryPartner?.phone}
            </CustomText>
          )}
          <CustomText
            style={styles.titleTextWhite}
            variant="h6"
            fontFamily={Fonts.Medium}>
            {currentOrder?.order.deliveryPartner
              ? 'For delivery instruction you can contact here'
              : msg}
          </CustomText>
        </View>
        <DeliveryDetails currentOrder={currentOrder} />
        <OrderSummry currentOrder={currentOrder} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {backgroundColor: Colors.primary, gap: 4, flex: 1},
  titleTextWhite: {
    color: 'black',
  },
  scroll: {
    backgroundColor: Colors.backgroundSecondary,
    paddingBottom: 250,
    paddingHorizontal: 10,
  },
  mainContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
});
export default LiveTracking;
