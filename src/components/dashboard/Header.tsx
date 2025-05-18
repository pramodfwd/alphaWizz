import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {FC} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {reverseGeoCode} from '@service/mapService';
import {useAuthStore} from '@state/authStore';
import {CustomText} from '@components/global/CustomText';
import {Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {navigate} from '@utils/NavigationUtils';

interface HeaderProps {
  showNotice: () => void;
}

const Header: FC<HeaderProps> = ({showNotice}) => {
  const {user, setUser} = useAuthStore();
  const updateGeoLocation = () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        reverseGeoCode(latitude, longitude, setUser);
      },
      errr => console.log(errr),
      {enableHighAccuracy: false, timeout: 10000},
    );
  };
  React.useEffect(() => {
    // updateGeoLocation();
  });
  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomText variant="h6" style={styles.text} fontFamily={Fonts.Bold}>
          Delivery in
        </CustomText>
        <View style={styles.flexRowGroup}>
          <CustomText
            variant="h2"
            style={styles.noticeBtn}
            fontFamily={Fonts.SemiBold}>
            15 mintues
          </CustomText>
          <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
            <CustomText
              fontSize={12}
              variant="h6"
              style={{color: '#384886'}}
              fontFamily={Fonts.SemiBold}>
              Rain
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.flxRow}>
          <CustomText
            variant="h5"
            numberOfLines={1}
            fontFamily={Fonts.Medium}
            style={styles.text2}>
            {user?.address || ' india, SomeWhere'}
          </CustomText>
          <Icon name="menu-down" size={20} color="#fff" style={{bottom: -1}} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Profile')}>
        <CustomText
          fontSize={12}
          variant="h2"
          style={{color: '#fff'}}
          fontFamily={Fonts.SemiBold}>
          Profile
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  text2: {
    color: 'white',
    width: '90%',
    textAlign: 'center',
  },
  flxRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    width: '70%',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? 10 : 5,
    justifyContent: 'space-between',
  },
  flexRowGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  noticeBtn: {
    backgroundColor: '#E8EAF5',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2,
  },
});
export default Header;
