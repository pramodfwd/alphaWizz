import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {CustomText} from '@components/global/CustomText';
import {Colors, Fonts} from '@utils/Constants';

const ReportItem: FC<{title: string; price: number}> = ({title, price}) => {
  return (
    <View style={styles.container}>
      <CustomText variant="h4" fontFamily={Fonts.Medium}>
        {title}
      </CustomText>
      <CustomText variant="h4" fontFamily={Fonts.Medium}>
        ₹ {price}
      </CustomText>
    </View>
  );
};

export const obj = {
  deliverCharge: 29,
  HandelingCharge: 2,
  surgeCharge: 3,
};

const BillDetails: FC<{totalItemPrice: number}> = ({totalItemPrice}) => {
  return (
    <View style={{marginTop: 10}}>
      <CustomText
        variant="h2"
        fontFamily={Fonts.Bold}
        style={{marginVertical: 5}}>
        BillDetails
      </CustomText>
      <View>
        <ReportItem title="Item total" price={totalItemPrice} />
        <ReportItem title="Delivery charge" price={obj.deliverCharge} />
        <ReportItem title="Handiling charge" price={obj.HandelingCharge} />
        <ReportItem title="Surge charge" price={obj.surgeCharge} />
      </View>
      <View style={styles.border} />
      <View style={styles.container}>
        <CustomText
          variant="h4"
          fontFamily={Fonts.SemiBold}
          style={{marginVertical: 5}}>
          Total Bill
        </CustomText>
        <CustomText
          variant="h4"
          fontFamily={Fonts.SemiBold}
          style={{marginVertical: 5}}>
          ₹{' '}
          {totalItemPrice +
            obj.deliverCharge +
            obj.HandelingCharge +
            obj.surgeCharge}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  border: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.border,
  },
});
export default BillDetails;
