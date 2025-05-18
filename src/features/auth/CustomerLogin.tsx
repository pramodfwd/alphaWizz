import {
  Alert,
  Animated,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {Colors, Fonts, lightColors} from '@utils/Constants';
import ProductSlider from '@components/login/ProductSlider';
import {CustomBox} from '@components/global/CustomBox';
import Logo from '@assets/images/logo.png';
import {LinearGradient} from 'react-native-linear-gradient';
import {CustomText} from '@components/global/CustomText';
import {CustomInput} from '@components/global/CustomTextInput';
import {CutomButton} from '@components/global/CustomeButton';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import {navigate, resetAndNavigate} from '@utils/NavigationUtils';
import {customerLoginService} from '@service/authService';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

const bottomColors: any = [...lightColors].reverse() as [
  string,
  string,
  ...string[],
];

const CustomerLogin = () => {
  //   remember user movement using useState()
  const [gestureSequence, setGestureSequence] = React.useState<string[]>([]);

  const [phone, setPhone] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  React.useEffect(() => {
    // first keyboard ni khula then khulne per
    if (keyboardOffsetHeight === 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  });

  // two times up and one time left and right open user as a deliverypartner
  const handleGesture = ({nativeEvent}: any) => {
    if (nativeEvent?.state === State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }
      const newSequence = [...gestureSequence, direction.slice(-5)];
      setGestureSequence(newSequence);
      if (newSequence.join(' ') === 'up up left right') {
        setGestureSequence([]);
        navigate('DeliveryLogin'); // Navigate to DeliveryLogin
      }
    }
  };

  const handleAuth = async () => {
    try {
      console.log('handleAuth start');
      setLoading(true);
      await customerLoginService(phone);
    } catch (error: any) {
      Alert.alert('Login Faild', error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeliveryPartnerLogin = () => {
    resetAndNavigate('DeliveryPartnerLogin');
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <ProductSlider />
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.ScrollView
            bounces={false}
            style={{transform: [{translateY: animatedValue}]}} // turn on this will work on real device
            keyboardDismissMode={'on-drag'}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.animatedScrollView}>
            <LinearGradient colors={bottomColors} style={styles.gradient}>
              <CustomBox style={styles.content}>
                <Image source={Logo} style={styles.Logo} />
                <CustomText variant="h1" style={styles.appname}>
                  Grocery Delivery App
                </CustomText>
                <CustomText variant="h4" fontFamily={Fonts.Bold}>
                  Login in or SIgn up
                </CustomText>
                <CustomInput
                  onChangeText={t => setPhone(t.slice(0, 10))}
                  onClear={() => setPhone('')}
                  value={phone}
                  placeholder="Enter mobile number"
                  left={
                    <CustomText style={styles.phoneText} variant="h5">
                      +91
                    </CustomText>
                  }
                />
              </CustomBox>
              <View style={styles.btn}>
                <CutomButton
                  onPress={handleAuth}
                  disabled={phone?.length !== 10}
                  loading={loading}
                  title="Continue"
                />
              </View>
            </LinearGradient>
          </Animated.ScrollView>
        </PanGestureHandler>
        <View style={styles.footer}>
          <CustomText variant="h6">
            By Continuing, You agree to our Terms of services & Privacy Policy
          </CustomText>
        </View>
        <TouchableOpacity
          style={styles.absoluteSwitch}
          onPress={handleDeliveryPartnerLogin}>
          <Icon name="rocket" size={30} color="#900" />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: 'black',
    paddingBottom: 10,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
  absoluteSwitch: {
    position: 'absolute',
    backgroundColor: 'white',
    shadowColor: '#000',
    top: Platform.OS === 'android' ? 20 : 40,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    zIndex: 99,
    shadowRadius: 12,
    elevation: 10,
    padding: 10,
    borderRadius: 20,
    right: 10,
  },
  animatedScrollView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  gradient: {
    width: '100%',
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingBlock: 20,
  },
  Logo: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  appname: {
    fontWeight: '900',
    opacity: 0.8,
  },
  phoneText: {
    marginLeft: 10,
    fontWeight: 700,
  },
  btn: {
    paddingHorizontal: 15,
    width: '100%',
    marginBottom: 15,
  },
});

export default CustomerLogin;
