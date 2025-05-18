import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const ActionButton = ({title, onPress}: any) => {
  return (
    <View style={styles.logoutButton}>
      <Text style={styles.logoutButtonText} onPress={onPress}>
        {title}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default ActionButton;
