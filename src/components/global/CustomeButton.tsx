import {
  ActivityIndicator,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import {CustomText} from './CustomText';
import {Colors} from '../../utils/Constants';

interface ContainerProps extends TextInputProps {
  style?: object;
  title: string;
  loading?: boolean;
  disabled?: any;
}

const CustomButton: React.FC<ContainerProps> = ({
  onPress,
  loading,
  title,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? Colors.disabled : Colors.secondary,
        },
      ]}>
      {loading ? (
        <ActivityIndicator color={'#fff'} size={'small'} />
      ) : (
        <CustomText style={styles.text} variant="h5">
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 700,
    color: Colors.backgroundSecondary,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    width: '100%',
  },
});
export default CustomButton;
