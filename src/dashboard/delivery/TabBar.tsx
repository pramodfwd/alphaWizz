import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {act, FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import {CustomText} from '@components/global/CustomText';

interface TabBarProps {
  selctedTab: 'available' | 'delivered' | 'cancelled' | 'all';
  onTabChange: (tab: 'available' | 'delivered' | 'cancelled' | 'all') => void;
}
const TabBar: FC<TabBarProps> = ({selctedTab, onTabChange}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tab, selctedTab == 'available' && styles.activetab]}
        onPress={() => onTabChange('available')}>
        <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
          Available
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tab, selctedTab != 'available' && styles.activetab]}
        onPress={() => onTabChange('delivered')}>
        <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
          delivered
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    width: '38%',
    borderColor: Colors.border,
    alignItems: 'center',
  },
  activetab: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  inActivetabText: {
    backgroundColor: Colors.disabled,
    padding: 10,
  },
  text: {
    color: Colors.text,
  },
  activeTabtext: {
    color: '#fff',
  },
});
export default TabBar;
