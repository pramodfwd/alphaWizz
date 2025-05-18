import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
  Image,
} from 'react-native';
import React, {useCallback} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import {useAuthStore} from '@state/authStore';
import DliveryHeaders from './DliveryHeaders';
import TabBar from './TabBar';
import {reverseGeoCode} from '@service/mapService';
import Geolocation from '@react-native-community/geolocation';
import {REAL_MOBILE_BASE_URL} from '@service/config';
import axios from 'axios';
import DeliveryOrderItems from './DeliveryOrderItems';
import {CustomText} from '@components/global/CustomText';

const DeliveryDashboard = () => {
  const {user, setUser} = useAuthStore();
  // const {currentOrder} = useAuthStore();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any>([]);
  const [refreshing, setRefreshing] = React.useState<any>(false);
  type TabType = 'available' | 'delivered' | 'cancelled' | 'all';
  const [selctedTab, setSelctedTab] = React.useState<TabType>('available');

  const updateLocationDeliveryPartner = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        reverseGeoCode(latitude, longitude, setUser);
      },
      err => console.log(err),
      {
        enableHighAccuracy: false, // not need more accuracy
        timeout: 1500,
      },
    );
  }, [setUser]);

  React.useEffect(() => {
    updateLocationDeliveryPartner();
  }, [updateLocationDeliveryPartner]);

  const fetchData = async () => {
    setLoading(true);
    setData([]);
    setRefreshing(true);
    let uri =
      selctedTab == 'available'
        ? `http://192.168.249.26:3000/api/order?status=${selctedTab}&branchId=${user?.branch._id}`
        : `http://192.168.249.26:3000/api/order?branchId=${user?.branch._id}&deliveryPartnerId=${user?._id}&status=delivered`;
    const response = await axios.get(uri);

    setData(response.data.orders);
    setRefreshing(false);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const renderEmptyComponent = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="small" color={'black'} />
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <CustomText variant="h3" fontFamily={Fonts.Regular}>
          No Order Found
        </CustomText>
      </View>
    );
  };

  const renderItem = ({item}: any) => <DeliveryOrderItems item={item} />;

  return (
    <View style={{flex: 1, backgroundColor: Colors.primary}}>
      <DliveryHeaders user={user} />
      <TabBar selctedTab={selctedTab} onTabChange={setSelctedTab} />
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
        ListEmptyComponent={renderEmptyComponent}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeliveryDashboard;
