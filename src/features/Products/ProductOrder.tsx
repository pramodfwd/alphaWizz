import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import React from 'react';
import CustomerHeader from '../../dashboard/categories/CustomerHeader';
import {Colors, Fonts} from '@utils/Constants';
import {useCartStore} from '@state/cartStore';
import {CustomText} from '@components/global/CustomText';
import UniversalAdd from '../../dashboard/product/UniversalAdd';
import {screenWidth} from '@utils/Scaling';
import {useAuthStore} from '@state/authStore';
import BillDetails from './BillDetails';
import PlaceOrderButton from './PlaceOrderButton';
import {navigate} from '@utils/NavigationUtils';
// import {createOrder} from '../../service/orderService';
import {BRANCH_ID, REAL_MOBILE_BASE_URL} from '../../service/config';
import {appAxios} from '../../service/apiInterceptors';
import axios from 'axios';
import {storage} from '@state/storage';

const ProductOrder = () => {
  const cartItem = useCartStore(state => state.cart);
  const totalItem = cartItem?.reduce((acc, item) => acc + item?.count, 0);
  const {getTotalPrice, cart, clearCart} = useCartStore();
  const {user, setCurrentOrder, currentOrder} = useAuthStore();
  const totalItemPrice = getTotalPrice();
  const [loading, setLoading] = React.useState(false);

  const placeOrder = async () => {
    const paramData = cart.map(item => ({
      id: item._id,
      item: item,
      count: item.count,
    }));
    const finalData = {
      userId: user?._id,
      items: paramData,
      branch: BRANCH_ID,
      totalPrice: totalItemPrice,
    };

    if (paramData.length === 0) {
      Alert.alert('please create at least one order');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${REAL_MOBILE_BASE_URL}/order`,
        finalData,
      );
      const orderData = response.data;
      const orderId = response.data.order._id;

      if (orderData != null) {
        setCurrentOrder(orderData);
        storage.set('currentOrderId', orderId);
        clearCart();
        navigate('OrderSuccess', {...orderData});
      } else {
        Alert.alert('there was an error on create order data');
      }
    } catch (error) {
      console.log('Create order error', error);
      return null;
    }
    setLoading(false);
  };

  const obj = {
    deliverCharge: 29,
    HandelingCharge: 2,
    surgeCharge: 3,
  };

  return (
    <View style={styles.container}>
      <CustomerHeader title="Checkout" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.orderContainer}>
          <Image
            source={require('../../assets/icons/clock.png')}
            style={{width: 40, height: 40}}
          />
          <View>
            <CustomText variant="h4" fontFamily={Fonts.Regular}>
              Delivery in 12 mintuts
            </CustomText>
            <CustomText variant="h4" fontFamily={Fonts.Regular}>
              Shippment of{' '}
              {totalItem === 1
                ? `${totalItem} ${''}item`
                : `${totalItem} ${''}items`}
            </CustomText>
          </View>
        </View>
        {cartItem?.map(item => {
          return (
            <View key={item._id} style={styles.productContainer}>
              <View style={styles.maineContainer}>
                <Image
                  source={{uri: item?.item.image}}
                  style={styles.imgContainer}
                />
                <View style={{marginLeft: 10, width: 200}}>
                  <CustomText>{item?.item.name}</CustomText>
                  <CustomText>{item?.item.quantity}</CustomText>
                </View>
              </View>
              <View
                style={{
                  marginRight: 15,
                }}>
                <UniversalAdd item={item.item} />
                <CustomText
                  variant="h5"
                  fontFamily={Fonts.Bold}
                  style={{textAlign: 'right'}}>
                  ₹ {item.count * item.item.price}
                </CustomText>
              </View>
            </View>
          );
        })}
        <BillDetails totalItemPrice={totalItemPrice} />
      </ScrollView>
      {/* <View style={styles.payment}> */}
      <PlaceOrderButton
        loading={loading}
        price={
          totalItemPrice +
          obj.deliverCharge +
          obj.HandelingCharge +
          obj.surgeCharge
        }
        title="Place the Order"
        onPress={placeOrder}
      />
      {/* </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    padding: 10,
    paddingBottom: 250,
    backgroundColor: Colors.backgroundSecondary,
  },
  maineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderContainer: {
    justifyContent: 'flex-start',
    gap: 5,
    backgroundColor: '#ffff',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  imgContainer: {
    height: 50,
    width: 50,
  },
  productContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    width: screenWidth,
    borderBottomColor: Colors.border,
    borderBottomWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});
export default ProductOrder;
