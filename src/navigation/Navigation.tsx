import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '@utils/NavigationUtils';
import SplashScreen from '@features/auth/SplashScreen';
import CustomerLogin from '@features/auth/CustomerLogin';
import ProductDashboard from '../dashboard/product/ProductDashboard';
import DeliveryPartnerLogin from '@features/deliveryPartnerLogin';
import DeliveryDashboard from '../dashboard/delivery/DeliveryDashboard';
import ProductCategory from '@features/Products/ProductCategory';
import ProductOrder from '@features/Products/ProductOrder';
import OrderSuccess from '../dashboard/order/OrderSuccess';
import LiveTracking from '../dashboard/liveTracking/LiveTracking';
import Profile from '../dashboard/profile/Profile';
import DeliveryMap from '../dashboard/delivery/DeliveryMap';

const Stack = createNativeStackNavigator();
const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="DeliveryPartnerLogin"
          component={DeliveryPartnerLogin}
        />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="CustomerLogin"
          component={CustomerLogin}
        />
        <Stack.Screen
          options={{animation: 'fade', headerTintColor: 'red'}}
          name="ProductDashboard"
          component={ProductDashboard}
        />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="DeliveryDashboard"
          component={DeliveryDashboard}
        />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="ProductCategory"
          component={ProductCategory}
        />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="ProductOrder"
          component={ProductOrder}
        />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="OrderSuccess"
          component={OrderSuccess}
        />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="LiveTracking"
          component={LiveTracking}
        />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="DeliveryMap"
          component={DeliveryMap}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
