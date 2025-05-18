import {View, Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack} from '@utils/NavigationUtils';
import {CustomText} from '@components/global/CustomText';

const CustomerHeader: FC<{title: string; search?: boolean}> = ({
  title,
  search,
}) => {
  return (
    <SafeAreaView>
      <View style={styles.flexRow}>
        <Pressable onPress={() => goBack()}>
          <CustomText
            style={{color: 'black'}}
            variant="h4"
            fontFamily={Fonts.Bold}>
            Go back
          </CustomText>
          {/* <Icon name="chevron-back" size={26} color={Colors.text} /> */}
        </Pressable>
        <CustomText variant="h5" style={styles.text}>
          {title}
        </CustomText>
        <View>
          {search && <Icon name="search" color={Colors.text} size={24} />}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'space-between',
    padding: 10,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: Colors.border,
  },
  text: {
    textAlign: 'center',
  },
});
export default CustomerHeader;
