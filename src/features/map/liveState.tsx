import {CustomText} from '@components/global/CustomText';
import {hocStyle} from '../../components/global/globalStyle';
import {useNavigationState} from '@react-navigation/native';
import {REAL_MOBILE_BASE_URL, SOCKET_URL} from '@service/config';
import {useAuthStore} from '@state/authStore';
import {Colors} from '@utils/Constants';
import axios from 'axios';
import {useCallback, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {io} from 'socket.io-client';
import {navigate} from '@utils/NavigationUtils';
import {storage} from '@state/storage';

// const withLiveStatus = (WrapComponent: any) => {
const LiveStatus = (props: any) => {
  // realTime web Communication
  const {currentOrder, setCurrentOrder} = useAuthStore();
  console.log('🚀 ~ LiveStatus ~ currentOrder:', currentOrder);
  const rountName = useNavigationState(
    state => state.routes[state.index]?.name,
  );

  const fetchOrderDetails = useCallback(async () => {
    try {
      const response = await axios.post(
        `${REAL_MOBILE_BASE_URL}/order/${currentOrder?._id}`,
      );
      const orderData = response.data;
      console.log('🚀 ~ fetchOrderDetails ~ orderData:', orderData);
      setCurrentOrder(orderData);
    } catch (error) {
      console.log('fetch by id order error', error);
      return null;
    }
  }, []);
  console.log('value', currentOrder);

  const getAllDetailsOfOrder = async () => {
    try {
      const response = await axios.get(
        `http://192.168.249.26:3000/api/order/${currentOrder?.order?.orderId}`,
      );
      console.log('🚀 ~ fetchOrderDetails ~ liveTracking:', response.data);
      const orderData = response.data;
      setCurrentOrder(orderData);
    } catch (error) {
      console.log('getAllDetailsOfOrder', error);
      return null;
    }
  };

  useEffect(() => {
    getAllDetailsOfOrder();
  }, [currentOrder?.order?.orderId]);

  // real Time location update
  useEffect(() => {
    if (currentOrder) {
      const socketInstance = io(SOCKET_URL, {
        transports: ['websocket'],
        withCredentials: true,
      });
      socketInstance.emit('joinRoom', currentOrder?._id);
      socketInstance?.on('liveTrackingUpdates', updatedOrder => {
        fetchOrderDetails();
        console.log('Receving live updates');
      });
      socketInstance.on('orderConfirmed', confirmOrder => {
        fetchOrderDetails();
        console.log('order confirmation live updates');
      });
      return () => {
        socketInstance.disconnect();
      };
    }
  }, []);

  return (
    <View styles={styles.container}>
      {currentOrder && rountName === 'ProductDashboard' && (
        <View
          style={[
            hocStyle.cartContainer,
            {flexDirection: 'row', alignItems: 'center'},
          ]}>
          <View style={styles.flexRow}>
            <View style={styles.img}>
              <Image
                source={require('../../assets/icons/bucket.png')}
                style={{width: 20, height: 20}}
              />
            </View>
            <View style={{width: '68%'}}>
              <CustomText> order is {currentOrder?.status}</CustomText>
              <CustomText>
                order is
                {/* {currentOrder?.items![0]?.item.name +
                  (currentOrder?.items?.length - 1 > 0
                    ? `and ${currentOrder?.items?.length - 1}+ items`
                    : '')} */}
                {currentOrder?.order.items![0]?.item.name +
                  (currentOrder?.items?.length - 1 > 0
                    ? `and ${currentOrder?.items?.length - 1}+ items`
                    : '')}
              </CustomText>
            </View>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigate('OrderSuccess')}>
            <CustomText>View</CustomText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 0.5,
    gap: 10,
    padding: 10,
  },
  img: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },
  btn: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderWidth: 0.7,
    borderColor: Colors.secondary,
    borderRadius: 5,
  },
});

export default LiveStatus;
