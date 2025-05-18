import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {mmkvStorage} from './storage';

interface cartItem {
  _id: string | number;
  item: any;
  count: number;
}
interface cartStore {
  cart: cartItem[];
  addItem: (item: any) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
  getItemCount: (id: string | number) => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<cartStore>()(
  persist<cartStore>(
    (set, get) => ({
      cart: [],
      addItem: item => {
        const currentCart = get().cart;
        const existingCartItemIndex = currentCart?.findIndex(
          i => i._id === item._id,
        );
        // const updateCart = [...currentCart];
        // if (existingCartItemIndex >= 0) {
        //   updateCart[existingCartItemIndex] = {
        //     ...updateCart[existingCartItemIndex],
        //     count: updateCart[existingCartItemIndex].count + 1,
        //   };
        //   set({cart: updateCart});
        // }
        if (existingCartItemIndex >= 0) {
          const updateCartItem = currentCart.map((currentItem, index) =>
            index === existingCartItemIndex
              ? {...currentItem, count: currentItem.count + 1}
              : currentItem,
          );
          set({cart: updateCartItem});
        } else {
          set({cart: [...currentCart, {_id: item._id, item: item, count: 1}]});
        }
      },
      removeItem: id => {
        const currentCart = get().cart;
        const existingCartItemIndex = currentCart.findIndex(
          item => item?._id === id,
        );
        if (existingCartItemIndex >= 0) {
          const updateCart = [...currentCart];
          const exsitingItem = updateCart[existingCartItemIndex];
          if (exsitingItem.count > 1) {
            updateCart[existingCartItemIndex] = {
              ...exsitingItem,
              count: exsitingItem?.count - 1,
            };
          } else {
            updateCart.splice(existingCartItemIndex, 1);
          }
          set({cart: updateCart});
        }
        // set({
        //   cart: get().cart.filter(item => item._id !== id),
        // });
      },
      clearCart: () => set({cart: []}),
      getItemCount: id => {
        const currentItem = get().cart.find(cartItem => cartItem._id === id);
        return currentItem ? currentItem?.count : 0;
      },
      getTotalPrice: () => {
        let totalPrice = get().cart.reduce((acc, next) => {
          const priceAndItem = next.item.price * next.count;
          const FinalPriceWIthItem = acc + priceAndItem;
          return FinalPriceWIthItem;
        }, 0);
        // console.log('totalPrice', totalPrice);
        return totalPrice;
      },
    }),
    {name: 'cart-storage', storage: createJSONStorage(() => mmkvStorage)},
  ),
);
