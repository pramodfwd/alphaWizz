import {Animated} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import {hocStyle} from '@components/global/globalStyle';

interface carProps {
  cartCount: number;
  children: React.ReactNode;
}
const CartAminationWrapper: FC<carProps> = ({cartCount, children}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [hasAnimated, setHasAnimated] = useState(false);

  React.useEffect(() => {
    if (cartCount > 0 && !hasAnimated) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setHasAnimated(true));
    } else if (cartCount === 0 && hasAnimated) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setHasAnimated(false));
    }
  }, [cartCount, hasAnimated, slideAnim]);

  const slideUpStyle: any = {
    transform: [
      {
        trandlateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
    opacity: slideAnim,
  };

  return (
    <Animated.View style={[hocStyle.cartContainer, slideUpStyle]}>
      {children}
    </Animated.View>
  );
};
export default CartAminationWrapper;
