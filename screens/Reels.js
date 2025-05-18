import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, StatusBar, FlatList} from 'react-native';
import RenderVideo from '../component/RenderVideo';

const {height, width} = Dimensions.get('window');

export const videoData = [
  {
    video: require('../video/part1.mp4'),
    title: 'Mr Beast',
    description: 'Feel the buity of nature',
    likes: '245k',
    isLike: false,
  },
  {
    video: require('../video/part2.mp4'),
    title: 'Mr Beast',
    description: "It's a tea time",
    likes: '656k',
    isLike: false,
  },
];

// Friends Profile Data

const Reels = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({index}) => {
    setCurrentIndex(index);
  };

  const onViewRef = React.useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 80});

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={videoData ? videoData : []}
        renderItem={({item, index}) => (
          <RenderVideo item={item} index={index} currentIndex={currentIndex} />
        )}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate={'fast'}
        snapToAlignment="start"
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(_, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    width,
    height,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Reels;
