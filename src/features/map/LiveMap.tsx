import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors} from '@utils/Constants';
import {screenHeight} from '@utils/Scaling';
import {useMapRefStore} from '@state/mapStore';
import {handleFitToPath} from '../../components/map/MapUtills';
import MapViewComponent from './MapViewComponent';

interface IProps {
  deliveryLocation: any;
  pickupLocation: any;
  deliveryPartnerLocation: any;
  hasAccepted: boolean;
  hasPickedUp: boolean;
}

const LiveMap: FC<IProps> = ({
  deliveryLocation,
  pickupLocation,
  deliveryPartnerLocation,
  hasAccepted,
  hasPickedUp,
}) => {
  const {mapRef, setMapRef} = useMapRefStore();
  useEffect(() => {
    if (mapRef) {
      handleFitToPath(
        mapRef,
        deliveryLocation,
        pickupLocation,
        deliveryPartnerLocation,
        hasAccepted,
        hasPickedUp,
      );
    }
  }, [
    deliveryLocation,
    deliveryPartnerLocation,
    hasAccepted,
    hasPickedUp,
    mapRef,
    pickupLocation,
  ]);

  return (
    <View style={styles.container}>
      <MapViewComponent
        mapRef={mapRef}
        setMapRef={setMapRef}
        deliveryLocation={deliveryLocation}
        pickupLocation={pickupLocation}
        deliveryPartnerLocation={deliveryPartnerLocation}
        hasAccepted={hasAccepted}
        hasPickedUp={hasPickedUp}
      />
      <TouchableOpacity
        style={styles.fitbutton}
        onPress={() =>
          handleFitToPath(
            mapRef,
            deliveryLocation,
            pickupLocation,
            deliveryPartnerLocation,
            hasAccepted,
            hasPickedUp,
          )
        }>
        <Image
          source={require('../../assets/images/target.png')}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.35,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
    marginVertical: 10,
  },

  fitbutton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
    borderColor: Colors.border,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
});
export default LiveMap;
