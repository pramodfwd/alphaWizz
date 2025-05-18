import React from 'react';
import {Marker} from 'react-native-maps';

const Markers = ({
  deliveryLocation,
  pickupLocation,
  deliveryPartnerLocation,
}: any) => {
  return (
    <>
      {deliveryLocation && (
        <Marker
          image={require('../../assets/icons/my_pin.png')}
          coordinate={deliveryLocation}
          style={{width: 20, height: 20}}
        />
      )}
      {deliveryLocation && (
        <Marker
          image={require('../../assets/icons/store.png')}
          coordinate={pickupLocation}
          style={{width: 20, height: 20}}
        />
      )}
      {deliveryPartnerLocation && (
        <Marker
          image={require('../../assets/icons/delivery.png')}
          coordinate={pickupLocation}
          style={{width: 20, height: 20, position: 'absolute'}}
        />
      )}
    </>
  );
};

export default Markers;
