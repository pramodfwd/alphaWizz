import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Slider from '../component/Slider';

const {width} = Dimensions.get('window');

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cur, setCur] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        setPhotos(data.products.slice(0, 5));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching photos:', err);
        setLoading(false);
      });
  }, []);

  const renderResumeItem = ({item}) => (
    <View style={styles.resumeItem}>
      <Image
        source={{uri: item.images[0]}}
        style={styles.resumeThumbnail}
        resizeMode={'contain'}
      />
      <Text style={styles.smallText}>{item.title.slice(0, 10) + '...'}</Text>
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#007bff"
        style={{flex: 1, justifyContent: 'center'}}
      />
    );
  }
  return (
    <SafeAreaView style={styles.scrolV}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        <Image
          source={require('../image/notification.jpg')}
          style={{width: 50, height: 50}}
        />
      </View>
      <View style={styles.headText}>
        <Text
          style={[
            {
              fontSize: 20,
              fontWeight: '800',
              color: 'white',
            },
          ]}>
          Feature
        </Text>
        <Text style={{fontSize: 20, color: 'white'}}>Trending</Text>
        <Text style={{fontSize: 20, color: 'white'}}>Featured</Text>
        <Text style={{fontSize: 20, color: 'white'}}>New</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={photos}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCur(Number((x / width).toFixed(0)));
          }}
          renderItem={({item, index}) => (
            <Slider item={item} index={index} cur={cur} />
          )}
          keyExtractor={item => item.id.toString()}
        />

        {photos.length > 0 && (
          <View style={styles.paginationContainer}>
            {photos.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {backgroundColor: cur === i ? 'red' : 'white'},
                  {borderColor: cur === i ? 'red' : 'white'},
                  {borderColor: cur === i ? 'red' : 'white'},
                  {width: cur === i ? 10 : 8},
                  {height: cur === i ? 10 : 8},
                ]}
              />
            ))}
          </View>
        )}
        <Text style={styles.sectionTitle}>Resume Watching</Text>
        <FlatList
          data={photos.slice(0, 2)}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderResumeItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.resumeList}
        />
        <Text style={styles.sectionTitle}>Must watch</Text>
        <FlatList
          data={photos}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderResumeItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.resumeList}
        />
        <Text style={styles.sectionTitle}>Trending this week</Text>
        <FlatList
          data={photos}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderResumeItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.resumeList}
        />
        <Text style={styles.sectionTitle}>Yout Might be Like</Text>
        <FlatList
          data={photos}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderResumeItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.resumeList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrolV: {
    flex: 1,
    backgroundColor: 'black',
  },
  listContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headText: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    height: 50,
  },
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginHorizontal: 10,
  },
  thumbnail: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    padding: 30,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: 'white',
    marginBottom: 10,
  },
  resumeList: {
    paddingLeft: 16,
    height: 220,
  },
  resumeItem: {
    width: 120,
    height: 250,
    marginRight: 10,
    overflow: 'hidden',
  },
  resumeThumbnail: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    height: 180,
    padding: 20,
  },
  img: {
    width: 300,
    height: 350,
    backgroundColor: '#857790',
    borderRadius: 20,
  },
  smallText: {
    fontWeight: 700,
    fontSize: 15,
    marginVertical: 5,
    marginLeft: 5,
    color: 'white',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#f2f2f2',
    color: '#333',
    borderRadius: 12,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    marginVertical: 20,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default Home;
