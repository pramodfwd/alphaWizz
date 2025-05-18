import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {CustomText} from '@components/global/CustomText';
import {Fonts} from '@utils/Constants';

const ProfileItem = ({currentOrder}: any) => {
  return (
    <View>
      <View style={styles.container}>
        <CustomText variant="h4" fontFamily={Fonts.SemiBold}>
          #{currentOrder?.order?.orderId}
        </CustomText>
        {currentOrder?.order?.items.map((data: any) => {
          return (
            <CustomText
              key={data?.item._id}
              variant="h4"
              fontFamily={Fonts.Medium}>
              {'=>'} {data?.item?.name}
            </CustomText>
          );
        })}
        <CustomText variant="h4" fontFamily={Fonts.Medium}>
          Status: {currentOrder?.order?.status}
        </CustomText>
        <CustomText variant="h4" fontFamily={Fonts.Medium}>
          Status: {currentOrder?.order?.createdAt.slice(0, 10)}
        </CustomText>
        <CustomText variant="h4" fontFamily={Fonts.SemiBold}>
          ₹{' '}
          {currentOrder?.order?.items.reduce(
            (acc: number, item: any) => acc + item?.item?.price,
            0,
          )}
        </CustomText>
      </View>
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
});
export default ProfileItem;
