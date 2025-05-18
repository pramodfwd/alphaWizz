import {Colors, Fonts} from '../../utils/Constants';
import React from 'react';
import {TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {CustomBox} from './CustomBox';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface InputProps {
  left?: React.ReactNode;
  onClear?: () => void;
  right?: boolean;
}

export const CustomInput: React.FC<
  InputProps & React.ComponentProps<typeof TextInput>
> = ({left, onClear, right, placeholder, ...props}) => {
  return (
    <CustomBox style={styles.flexRow}>
      {left}
      <TextInput
        style={styles.inputContainer}
        {...props}
        placeholder={placeholder}
      />
      <CustomBox
        style={{
          width: '5%',
          marginRight: 10,
        }}>
        {props?.value?.length != 0 && right && (
          <TouchableOpacity onPress={onClear}>
            <Icon name="close-circle-sharp" size={16} color="#ccc" />
          </TouchableOpacity>
        )}
      </CustomBox>
    </CustomBox>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '70%',
    fontFamily: Fonts.SemiBold,
    fontSize: 12,
    paddingVertical: 14,
    paddingBottom: 15,
    height: '100%',
    color: Colors.text,
    bottom: -1,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.5,
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowColor: Colors.border,
    borderColor: Colors.border,
  },
});
