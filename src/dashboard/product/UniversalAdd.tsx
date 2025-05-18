import {View, StyleSheet, Pressable} from 'react-native';
import React, {FC} from 'react';
import {useCartStore} from '@state/cartStore';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomText} from '@components/global/CustomText';
import {Fonts} from '@utils/Constants';

const UniversalAdd: FC<{item: any}> = ({item}) => {
  const count = useCartStore((state: any) => state.getItemCount(item._id));
  const {addItem, removeItem} = useCartStore();
  return (
    <View style={styles.numberOfItem}>
      {count === 0 ? (
        <Pressable
          onPress={() => addItem(item)}
          style={[styles.btnStyle, {backgroundColor: '#743888'}]}>
          <CustomText style={{color: '#fff'}}>Add</CustomText>
        </Pressable>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}>
          <Pressable
            onPress={() => removeItem(item._id)}
            style={styles.btnStyle}>
            <CustomText variant="h1" fontFamily={Fonts.Bold}>
              -
            </CustomText>
          </Pressable>
          <CustomText
            variant="h5"
            fontFamily={Fonts.SemiBold}
            style={{marginHorizontal: 5}}>
            {count}
          </CustomText>
          <Pressable onPress={() => addItem(item)} style={styles.btnStyle}>
            <CustomText variant="h1" fontFamily={Fonts.Bold}>
              +
            </CustomText>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  numberOfItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
  btnStyle: {
    // width: 50,
    borderRadius: 5,
    // height: 30,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#f27',
  },
});
export default UniversalAdd;
