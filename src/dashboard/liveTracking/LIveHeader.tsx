import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import React, {FC} from 'react';
import {useAuthStore} from '@state/authStore';
import {CustomText} from '@components/global/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import {navigate} from '@utils/NavigationUtils';
import {storage} from '@state/storage';

interface Iprops {
  type: 'customer' | 'delivery';
  title: string;
  secondTitle?: string;
}
const LIveHeader: FC<Iprops> = ({type, title, secondTitle}) => {
  const isCustomer = type == 'customer';
  const {currentOrder, setCurrentOrder} = useAuthStore();

  const handlePress = () => {
    if (isCustomer) {
      navigate('ProductDashboard');
      if (currentOrder?.order?.status == 'deliverd') {
        setCurrentOrder(null);
        storage.delete('currentOrderId');
      }
      return;
    }
    navigate('DeliveryDashboard');
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={handlePress}>
        <CustomText variant="h4" fontFamily={Fonts.Bold}>
          Go back
        </CustomText>
      </Pressable>
      <CustomText
        style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}
        variant="h5"
        fontFamily={Fonts.Medium}>
        {title}
      </CustomText>
      <CustomText
        style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}
        variant="h4"
        fontFamily={Fonts.SemiBold}>
        {secondTitle}
      </CustomText>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  titleTextBlack: {
    color: 'black',
  },
  titleTextWhite: {
    color: 'white',
  },
});

export default LIveHeader;
