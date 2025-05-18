import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {CustomText} from '@components/global/CustomText';
import {Fonts} from '@utils/Constants';
import {formatISOToCustom} from '@utils/DateUtils';
import {navigate} from '@utils/NavigationUtils';

const DeliveryOrderItems: FC<{item: any}> = ({item}) => {
  return (
    <View style={styles.orderContainer}>
      <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.statusstyle}>Status</Text>
        <CustomText
          variant="h3"
          fontFamily={Fonts.Bold}
          style={[
            item.status == 'available' ? styles.status : styles.deliverd,
          ]}>
          {item.status.slice(0, 1).toUpperCase() + item.status.slice(1)}
        </CustomText>
      </View>
      <FlatList
        data={item.items}
        keyExtractor={subItem => subItem._id}
        renderItem={({item: subItem}) => (
          <View style={styles.itemContainer}>
            <Image source={{uri: subItem.item.image}} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{subItem.item.name}</Text>
              <Text>Qty: {subItem.count}</Text>
              <Text>Price: ₹{subItem.item.price}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.statusContainer}>
        <View>
          <CustomText variant="h5" fontFamily={Fonts.Medium}>
            {item.deliveryLocation.address}
          </CustomText>
          <CustomText variant="h5" fontFamily={Fonts.Medium}>
            {formatISOToCustom(item.createdAt)}
          </CustomText>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigate('DeliveryMap', {...item});
          }}>
          <Image
            source={require('../../assets/images/map.png')}
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    color: '#287',
    marginBottom: 10,
  },
  deliverd: {
    color: 'red',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  statusstyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DeliveryOrderItems;
