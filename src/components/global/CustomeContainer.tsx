import React from 'react';
import {StyleSheet, TextInputProps, View} from 'react-native';

interface ContainerProps extends TextInputProps {
  style?: object;
}

export const CustomContainer: React.FC<ContainerProps> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
