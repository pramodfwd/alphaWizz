import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {Custom} from 'react-native-reanimated-carousel/lib/typescript/components/Pagination/Custom';
import {CustomText} from '@components/global/CustomText';
import BillDetails from '@features/Products/BillDetails';
import {Fonts} from '@utils/Constants';

const OrderSummry: FC<{currentOrder: any}> = ({currentOrder}) => {
  const totalPrice =
    currentOrder?.order?.items?.reduce(
      (total: number, cartItem: any) =>
        total + cartItem.item.price * cartItem.count,
      0,
    ) || 0;

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <CustomText variant="h3" fontFamily={Fonts.SemiBold}>
          Your delivery Details
        </CustomText>
        <CustomText variant="h4" fontFamily={Fonts.Medium}>
          {/* OrderId : {currentOrder?.order?.orderId} */}
          Details of your current order
        </CustomText>
      </View>
      {currentOrder?.order?.items?.map((data: any) => {
        return (
          <View style={styles.container} key={data._id}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 2,
              }}>
              <Image source={{uri: data.item.image}} style={styles.img} />
              <View style={styles.product}>
                <CustomText variant="h4" fontFamily={Fonts.Medium}>
                  {data.item.name.slice(0, 30)}
                </CustomText>
                <CustomText variant="h4" fontFamily={Fonts.Medium}>
                  {data.item.quantity}
                </CustomText>
              </View>
              <View style={{marginLeft: 40}}>
                <CustomText variant="h4" fontFamily={Fonts.Medium}>
                  ₹ {data.item.price}
                </CustomText>
                <CustomText variant="h4" fontFamily={Fonts.Medium}>
                  {data.count} x
                </CustomText>
              </View>
            </View>
          </View>
        );
      })}
      <BillDetails totalItemPrice={totalPrice} />
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
  },
  img: {
    width: 50,
    height: 50,
  },
  product: {
    marginLeft: 10,
  },
});
export default OrderSummry;
