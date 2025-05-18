import {CartStore, useCartStore} from '@state/cartStore';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import CartAminationWrapper from './CartAminationWrapper';
import CartSummary from './CartSummary';

const withCart = <p extends object>(
  WrappedComponent: React.ComponentType<p>,
): FC<p> => {
  const WithCartComponent: FC<p> = props => {
    const cart = useCartStore(state => state.cart);
    const cartCount = cart.reduce((acc, item) => acc + item.count, 0);

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        <CartAminationWrapper cartCount={cartCount}>
          <CartSummary
            cartCount={cartCount}
            cartImage={cart![0]?.item?.image || null}
          />
        </CartAminationWrapper>
      </View>
    );
  };
  return WithCartComponent;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default withCart;
