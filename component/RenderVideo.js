import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import {useIsFocused} from '@react-navigation/native';

const RenderVideo = ({item, index, currentIndex}) => {
  const isFocused = useIsFocused();
  const videoRef = useRef(null);
  const [mute, setMute] = useState(false);
  const [like, setLike] = useState(item.isLike);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (currentIndex === index) {
      setPaused(false);
    } else {
      setPaused(true);
    }
  }, [currentIndex, index]);

  const handlePress = () => {
    setPaused(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        style={styles.video}>
        <Video
          ref={videoRef}
          source={item.video}
          resizeMode="cover"
          repeat
          muted={mute}
          paused={!isFocused || currentIndex !== index || paused}
          style={styles.video}
        />
      </TouchableOpacity>

      <View style={styles.nameContainer}>
        <TouchableOpacity style={{width: 150}}>
          <View
            style={{width: 200, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>Youtuber Name : {item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  nameContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    zIndex: 1,
    bottom: 0,
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 100,
    fontWeight: 800,
  },
});
export default RenderVideo;
