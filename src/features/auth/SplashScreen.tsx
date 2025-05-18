import {View, StyleSheet, Image, Alert} from 'react-native';
import React, {FC, useCallback, useEffect} from 'react';
import Logo from '@assets/images/logo.png';
import {Colors} from '@utils/Constants';
import {screenHeight, screenWidth} from '@utils/Scaling';
import Geolocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {tokenStorage} from '@state/storage';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {jwtDecode} from 'jwt-decode';
import {reFetchUser, refresh_Token} from '@service/authService';

//This sets up global configuration for geolocation behavior in your React Native app.
Geolocation.setRNConfiguration({
  skipPermissionRequests: false, // Automatically request location permissions from the user
  authorizationLevel: 'always', // Only relevant on iOS.  access location even in the background
  enableBackgroundLocationUpdates: true, //Enables background location tracking, allowing your app to continue receiving location updates when not actively used.
  locationProvider: 'auto', //Will choose the best available provider (e.g., GPS or network).
});

interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const {user, setUser} = useAuthStore();

  const tokenCheck = useCallback(async () => {
    const accessToken: any = tokenStorage.getString('accessToken');
    const refreshToken: any = tokenStorage.getString('refreshToken');

    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      const currentTime = Date.now() / 1000;
      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert('session expire : Please login again');
        return false;
      }
      if (decodedAccessToken?.exp < currentTime) {
        try {
          refresh_Token(); // return new access token
          await reFetchUser(setUser); // updated user data return
        } catch (error) {
          console.log(error);
          Alert.alert('There was an error refreshing token');
          return false;
        }
      }
      if (user?.role === 'customer') {
        resetAndNavigate('ProductDashboard');
      } else {
        resetAndNavigate('DeliveryDashboard');
      }
      return true;
    }

    resetAndNavigate('CustomerLogin');
    return false;
  }, [setUser, user?.role]);

  // const navigation: any = useNavigation();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        Geolocation.requestAuthorization();
        tokenCheck();
      } catch (error) {
        Alert.alert(
          'Sorry we need location service to give you better experience',
        );
      }
    };
    const timeoutId = setTimeout(fetchInitialData, 1000);
    return () => clearTimeout(timeoutId);
  }, [tokenCheck]);

  return (
    <View style={styles.Container}>
      <Image source={Logo} style={styles.imageLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    height: screenHeight * 0.4,
    width: screenWidth * 0.4,
    resizeMode: 'contain',
  },
});
export default SplashScreen;
