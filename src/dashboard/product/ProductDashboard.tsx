import {
  View,
  Animated as RNAnimated,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import {NoticeHeight, screenHeight} from '@utils/Scaling';
import {
  CollapsibleContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  CollapsibleHeaderContainer,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import {CustomText} from '@components/global/CustomText';
import NoticeAnimation from './NoticeAnimation';
import Visuals from './Visuals';
import Icon from 'react-native-vector-icons/Ionicons';
import {Fonts} from '@utils/Constants';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {AnimatedHeader} from './AnimatedHeader';
import Content from './Content';
import StickySearchBar from './StickySearchBar';
import LiveStatus from '../../features/map/liveState';
import Geolocation from '@react-native-community/geolocation';
import {reverseGeoCode} from '@service/mapService';
import {useAuthStore} from '../../state/authStore';

const noticeHeight = -(NoticeHeight + 12);

const ProductDashboard = () => {
  console.log('ProductDashboard page landing');
  const {scrollY, expand} = useCollapsibleContext();
  const noticePosition = useRef(new RNAnimated.Value(noticeHeight)); // Correct
  const previousScroll = useRef<number>(0);
  const {user, setUser} = useAuthStore();

  const slideUp = () => {
    console.log('slideUp');
    RNAnimated.timing(noticePosition.current, {
      toValue: noticeHeight,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    console.log('slideDown');
    RNAnimated.timing(noticePosition.current, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  // // address set acording to ur location when i logged
  React.useEffect(() => {
    console.log('useEffect start');
    const updateUser = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          reverseGeoCode(latitude, longitude, setUser);
        },

        err => console.log(err),
        {
          enableHighAccuracy: false, // not need more accuracy
          timeout: 1500,
        },
      );
    };
    slideDown();
    const timeout = setTimeout(() => {
      slideUp();
      return () => clearTimeout(timeout);
    }, 1500);
  }, []);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 0 : 10, {duration: 300});

    previousScroll.current = scrollY.value;

    return {
      opacity,
      transform: [{translateY}],
    };
  });

  return (
    <NoticeAnimation noticePosition={noticePosition.current}>
      <>
        <Visuals />
        <SafeAreaView />
        <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
          <TouchableOpacity
            style={styles.backToTopButtonTouch}
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}>
            <Icon name="arrow-up-circle-outline" size={25} color="#4F8EF7" />
            <CustomText
              variant="h6"
              style={styles.text}
              fontFamily={Fonts.SemiBold}>
              Back to top
            </CustomText>
          </TouchableOpacity>
        </Animated.View>
        <CollapsibleContainer style={styles.pannelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            />
            <StickySearchBar />
          </CollapsibleHeaderContainer>

          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.pannelContainer}
            showsVerticalScrollIndicator={false}>
            <Content />
            <View style={{backgroundColor: '#f8f', padding: 10}}>
              <CustomText
                variant="h1"
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2, fontSize: 50}}>
                Grocery Delivery App
              </CustomText>
              <CustomText
                fontSize={32}
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2, marginTop: 10, paddingBottom: 100}}>
                Developed by Pramod mishra
              </CustomText>
              <LiveStatus />
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  pannelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTopButton: {
    alignSelf: 'center',
    top: Platform.OS === 'android' ? 100 : screenHeight * 0.18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
  backToTopButtonTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    color: 'white',
  },
});
export default withCollapsibleContext(ProductDashboard);
