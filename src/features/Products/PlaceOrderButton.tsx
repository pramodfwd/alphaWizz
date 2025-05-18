import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {FC} from 'react';
import {CustomText} from '@components/global/CustomText';
import {Colors, Fonts} from '@utils/Constants';

interface IProps {
  loading: boolean;
  price: number;
  title: string;
  onPress: () => void;
}
const PlaceOrderButton: FC<IProps> = ({loading, price, title, onPress}) => {
  return (
    <View style={styles.placeOrder}>
      {loading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <TouchableOpacity onPress={onPress}>
          <CustomText
            variant="h4"
            fontFamily={Fonts.Regular}
            style={{color: '#fff'}}>
            {title} ₹{price}
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  placeOrder: {
    width: '95%',
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
    paddingLeft: 15,
  },
});
export default PlaceOrderButton;
