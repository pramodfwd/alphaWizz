import React from 'react';
import MapView, {Polyline} from 'react-native-maps';
import {customMapStyle, customMapStyleLight} from '../../utils/CustomMap';
import Markers from './Markers';
import {getPoints} from '../../utils/getPoints.js';
import {Colors} from '@utils/Constants';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAP_API_KEY} from '../../service/config';

const MapViewComponent = ({
  mapRef,
  setMapRef,
  camera,
  deliveryLocation,
  pickupLocation,
  deliveryPartnerLocation,
  hasAccepted,
  hasPickedUp,
}: any) => {
  return (
    <MapView
      ref={setMapRef}
      style={{flex: 1}}
      provider="google"
      camera={camera}
      customMapStyle={customMapStyle}
      showsUserLocation={true}
      userLocationCalloutEnabled={true}
      userLocationPriority="high"
      showsBuildings={false}
      showsCompass={true}
      showsIndoors={false}
      showsScale={false}
      showsTraffic={false}
      showsIndoorLevelPicker={false}>
      {deliveryPartnerLocation && (hasPickedUp || hasAccepted) && (
        <MapViewDirections
          origin={deliveryPartnerLocation}
          destination={hasAccepted ? pickupLocation : deliveryLocation}
          precision="high"
          apikey={GOOGLE_MAP_API_KEY}
          strokeColor="#2871f2"
          strokeWidth={5}
          onError={err => console.log(err)}
        />
      )}
      <Markers
        deliveryLocation={deliveryLocation}
        pickupLocation={pickupLocation}
        deliveryPartnerLocation={deliveryPartnerLocation}
      />
      {!hasPickedUp && deliveryLocation && pickupLocation && (
        <Polyline
          coordinates={getPoints({pickupLocation, deliveryLocation})}
          strokeColor={'#fff'}
          strokeWidth={2}
          geodestic={true}
          lineDashPattern={[12, 10]}
        />
      )}
      {hasPickedUp && deliveryLocation && pickupLocation && (
        <Polyline
          coordinates={getPoints({pickupLocation, deliveryLocation})}
          strokeColor={Colors.text}
          strokeWidth={2}
          geodestic={true}
          lineDashPattern={[12, 10]}
        />
      )}
    </MapView>
  );
};

export default MapViewComponent;
