import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {CustomText} from '@components/global/CustomText';
import {Fonts} from '@utils/Constants';

const DeliveryDetails: FC<{currentOrder: any}> = ({currentOrder}) => {
  return (
    <View style={styles.container}>
      <CustomText variant="h4" fontFamily={Fonts.SemiBold}>
        Delivered at
      </CustomText>
      <CustomText variant="h4" fontFamily={Fonts.Medium}>
        address : {currentOrder?.order?.customer?.address}
      </CustomText>
      <CustomText variant="h4" fontFamily={Fonts.Medium}>
        {currentOrder?.order?.customer
          ? currentOrder?.order?.customer?.name
          : 'Name not available'}{' '}
        , {currentOrder?.order?.customer?.phone}
      </CustomText>
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
});
export default DeliveryDetails;
