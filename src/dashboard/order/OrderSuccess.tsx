import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {replace} from '@utils/NavigationUtils';
import {CustomText} from '@components/global/CustomText';
import {Colors, Fonts} from '@utils/Constants';

const OrderSuccess = () => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      replace('LiveTracking');
    }, 2300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.maineContainer}>
      <CustomText variant="h1" fontFamily={Fonts.Bold} style={{color: 'green'}}>
        OrderSuccess
      </CustomText>
      <View style={styles.border} />
    </View>
  );
};
const styles = StyleSheet.create({
  maineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'green',
  },

  border: {
    width: 150,
    height: 2,
    marginTop: 20,
    backgroundColor: 'green',
  },
});
export default OrderSuccess;
