import {View, Alert, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {DeliveryPartnerLoginService} from '@service/authService';
import {CustomerSafeAreaView} from '@components/global/CutomerSafeAreaView';
import {CustomText} from '@components/global/CustomText';
import {screenHeight} from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import {Fonts} from '@utils/Constants';
import {CustomInput} from '@components/global/CustomTextInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CutomButton} from '@components/global/CustomeButton';

const DeliveryPartnerLogin = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDeliveryPartnerLogin = async () => {
    try {
      setLoading(true);
      await DeliveryPartnerLoginService(email, password);
    } catch (error: any) {
      Alert.alert('Login Faild', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CustomerSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              autoPlay
              loop
              style={styles.lottie}
              source={require('@assets/animations/delivery_man.json')}
              hardwareAccelerationAndroid
            />
          </View>
          <CustomText variant="h1" fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText variant="h3" fontFamily={Fonts.SemiBold}>
            Faster then flash
          </CustomText>
          <CustomInput
            onChangeText={setEmail}
            value={email}
            inputMode="email"
            placeholder="Email"
            right={false}
            left={
              <Icon
                name="mail"
                size={30}
                color="#f8890e"
                style={{marginLeft: 10}}
              />
            }
          />
          <CustomInput
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry
            right={false}
            left={
              <Icon
                name="key"
                size={30}
                color="#f8890e"
                style={{marginLeft: 10}}
              />
            }
          />
          <CutomButton
            onPress={handleDeliveryPartnerLogin}
            loading={loading}
            title="Login"
          />
        </View>
      </ScrollView>
      <CustomText>DeliveryLogin</CustomText>
    </CustomerSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: '100%',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  btn: {
    paddingHorizontal: 15,
    width: '100%',
    marginBottom: 15,
  },
});

export default DeliveryPartnerLogin;
