import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAuthStore} from '@state/authStore';
import {Colors, Fonts} from '@utils/Constants';
import LIveHeader from '../../dashboard/liveTracking/LIveHeader';
import {CustomText} from '@components/global/CustomText';
import OrderSummry from '../../dashboard/order/OrderSummry';
import DeliveryDetails from '../../dashboard/order/DeliveryDetails';
// import {REAL_MOBILE_BASE_URL} from '@service/config';
// import axios from 'axios';
import LiveMap from '../../features/map/LiveMap';
import {useRoute} from '@react-navigation/native';
import {REAL_MOBILE_BASE_URL} from '@service/config';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from '@components/global/CustomeButton';
import {hocStyle} from '@components/global/globalStyle';

const DeliveryMap = () => {
  const user = useAuthStore(state => state.user);
  const [orderData, setOrderData] = React.useState<any>(null);
  const [myLocation, setMyLocation] = React.useState<any>(null);
  const route = useRoute();
  const orderDetails = route?.params as any;
  const {currentOrder, setCurrentOrder} = useAuthStore();

  const fetchOrderDetailsById = async () => {
    const response = await axios.get(
      `${REAL_MOBILE_BASE_URL}/order/${orderDetails.orderId}`,
    );
    setOrderData(response.data);
  };

  React.useEffect(() => {
    fetchOrderDetailsById();
  }, []);

  React.useEffect(() => {
    const watchId = Geolocation.watchPosition(position => {
      const {latitude, longitude} = position.coords;
      setMyLocation({latitude, longitude});
    });
    return () => Geolocation.clearWatch(watchId);
  }, []);
  //   Geolocation.getCurrentPosition(info => console.log('currentPosition', info));

  const OrderAcceptAndConfirm = async () => {
    try {
      const response = await axios.post(
        `${REAL_MOBILE_BASE_URL}/order/${orderData.orderId}/confirm`,
        {
          deliveryPersonLocation: myLocation,
        },
      );
      console.log('🚀 ~ acceptOrder ~ response:', response.data);
      if (response.data) {
        setCurrentOrder(response.data);
        Alert.alert(
          'Order picked up',
          'You have successfully picked up the order',
        );
      } else {
        Alert.alert('Error', 'Failed to pick up the order');
      }
    } catch (error) {
      console.log('Error accepting order:', error);
    }
    fetchOrderDetailsById();
  };

  const orderArrvingAndSendLiveUpdates = async () => {
    try {
      const response = await axios.put(
        `${REAL_MOBILE_BASE_URL}/order/${orderData.orderId}/arriving`,
        {
          deliveryPersonLocation: myLocation,
          status: 'arriving',
        },
      );
      if (response.data) {
        setCurrentOrder(response.data);
        Alert.alert('Order picked up Arriving soon');
      } else {
        Alert.alert('Error', 'Failed to pick up the order');
      }
    } catch (error) {
      console.log('Error sending live order updates:', error);
    }
    fetchOrderDetailsById();
  };

  const orderDeliveredAndSendLiveUpdates = async () => {
    try {
      const response = await axios.put(
        `${REAL_MOBILE_BASE_URL}/order/${orderData.orderId}/delivered`,
        {
          deliveryPersonLocation: myLocation,
          status: 'delivered',
        },
      );
      if (response.data) {
        setCurrentOrder(null);
        Alert.alert('Order Delivered successfully');
      } else {
        Alert.alert('Error', 'Failed to pick up the order');
      }
    } catch (error) {
      console.log('Error sending live order updates:', error);
    }
    fetchOrderDetailsById();
  };

  let msg;

  if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status == 'confirmed'
  ) {
    msg = 'Grab your order';
  } else if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status == 'arriving'
  ) {
    msg = 'Compelte your order';
  } else if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status == 'delivered'
  ) {
    msg = 'Order deliverd';
  } else if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status != 'available'
  ) {
    msg = 'You missed it';
  } else {
    msg = 'lets will comming soon';
  }

  useEffect(() => {
    async function sendLiveUpdates() {
      if (
        orderData?.deliveryPartner?._id == user?._id &&
        orderData?.status != 'delivered' &&
        orderData?.status != 'cancelled'
      ) {
        try {
          const response = await axios.put(
            `${REAL_MOBILE_BASE_URL}/order/${orderData.orderId}/${orderData?.status}`,
            {
              deliveryPersonLocation: myLocation,
              status: orderData?.status,
            },
          );
        } catch (error) {
          console.log('Error sending live order updates:', error);
        }
        fetchOrderDetailsById();
      }
    }
    sendLiveUpdates();
  }, []);
  console.log('deliveryLocation', orderData?.order.deliveryLocation);
  console.log('pickupLocation', orderData?.order.pickupLocation);
  console.log('deliveryPartner', orderData?.order.deliveryPartner);
  console.log(
    'hasAccepted',
    orderData?.order.deliveryPartner?._id == user?._id &&
      orderData?.order.status,
  );
  console.log('hasPickedUp', orderData?.order.status);
  return (
    <View style={styles.container}>
      <LIveHeader
        type="delivery"
        title={msg}
        secondTitle={'Delivery in 10 minutes'}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <LiveMap
          deliveryLocation={orderData?.order.deliveryLocation || null}
          pickupLocation={orderData?.order.pickupLocation || null}
          deliveryPartnerLocation={
            orderData?.order.deliveryPartner || myLocation
          }
          hasAccepted={
            orderData?.order.deliveryPartner?._id == user?._id &&
            orderData?.order.status == 'confirmed'
          }
          hasPickedUp={orderData?.order.status == 'arriving'}
        />
        <DeliveryDetails currentOrder={orderData?.customer} />
        <OrderSummry currentOrder={orderData} />
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
      </ScrollView>

      {orderData?.order.status != 'delivered' &&
        orderData?.order.status != 'cancelled' && (
          <View style={[hocStyle.cartContainer, {padding: 10}]}>
            {orderData?.order.status == 'arriving' &&
              orderData?.order.deliveryPartner?._id ==
                user?._id(
                  <CustomButton
                    onPress={orderDeliveredAndSendLiveUpdates}
                    loading={false}
                    title="Delivered"
                    disabled={false}
                  />,
                )}
            {orderData?.order.status == 'confirmed' &&
              orderData?.order.deliveryPartner?._id ==
                user?._id(
                  <CustomButton
                    onPress={OrderAcceptAndConfirm}
                    loading={false}
                    title="Order picked up"
                    disabled={false}
                  />,
                )}
            {orderData?.order.status == 'available' && (
              <CustomButton
                onPress={OrderAcceptAndConfirm}
                loading={false}
                title="Order picked up"
                disabled={false}
              />
            )}
          </View>
        )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {backgroundColor: '#228B22', flex: 1},
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
export default DeliveryMap;
