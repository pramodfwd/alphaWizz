import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

const Slider = ({item, index, cur}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Reels')}
      style={styles.container}
      key={index}>
      <Image source={{uri: item.images[0]}} style={styles.resumeThumbnail} />
      <Text style={styles.text}>{item.title.slice(0, 20)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  resumeThumbnail: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: 300,
    height: 400,
  },
  text: {
    fontWeight: '700',
    fontSize: 25,
    color: 'white',
    marginTop: 10,
  },
});

export default Slider;
