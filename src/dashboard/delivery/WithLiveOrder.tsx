// import {View, Text, StyleSheet} from 'react-native';
// import React, {FC, useEffect, useState} from 'react';
// import {Colors} from '@utils/Constants';
// import {useAuthStore} from '@state/authStore';
// import Geolocation from '@react-native-community/geolocation';

// const withLiveOrder: FC = (WrapComponent: any) => {
//   const WithLiveOrder: FC = props => {
//     const {currentOrder, user} = useAuthStore();
//     const [myLocation, setMyLocation] = useState<{
//       latitude: number;
//       longitude: number;
//     } | null>(null);

//     React.useEffect(() => {
//       if (currentOrder) {
//         const watchId = Geolocation.watchPosition(async position => {
//           const {latitude, longitude} = position.coords;
//           console.log(
//             'Live Location0',
//             new Date().toLocaleTimeString(),
//             latitude,
//             longitude,
//           );
//           setMyLocation({latitude, longitude});
//         });
//         return () => Geolocation.clearWatch(watchId);
//       }
//     }, [currentOrder]);

//     // sending the current delivery partner location to delivery partner its means its self
//     useEffect(()=>{
//         async function sendLiveUpdates() {
//             if(currentOrder?.order?.deliveryPartner?._id)
//         }
//     },[])
//     return <View></View>;
//   };
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   flexRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     borderRadius: 15,
//     marginBottom: 15,
//     paddingVertical: 10,
//     padding: 10,
//   },
//   img: {
//     backgroundColor: Colors.backgroundSecondary,
//     borderRadius: 10,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btn: {
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//     borderWidth: 0.7,
//     borderColor: Colors.secondary,
//     borderRadius: 5,
//   },
// });
// export default withLiveOrder;
