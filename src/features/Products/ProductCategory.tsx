import {
  View,
  // Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomerHeader from '../../dashboard/categories/CustomerHeader';
import {Colors, Fonts} from '@utils/Constants';
import Sidebar from '../../dashboard/categories/Sidebar';
// import {
//   getAllCategories,
//   getProductsByCategoryId,
// } from '@service/ProductService';
// import ProdctList from '../../dashboard/categories/ProdctList';
import axios from 'axios';
import {CustomText} from '@components/global/CustomText';
import UniversalAdd from '../../dashboard/product/UniversalAdd';
import {useCartStore} from '@state/cartStore';
// import {BASE_URL, MOBILE_BASE_URL, REAL_MOBILE_BASE_URL} from '@service/config';
import {REAL_MOBILE_BASE_URL} from '@service/config';
import CartAminationWrapper from '@components/cart/CartAminationWrapper';
import CartSummary from '@components/cart/CartSummary';

const ProductCategory = () => {
  const [categories, setCategories] = useState<any>([]);
  // console.log('🚀 ~ ProductCategory ~ categories:', categories);
  const [selectCategories, setSelectCategories] = useState<any>([]);
  const [product, setProduct] = useState<any>([]);
  const [cateLoading, setCateLoading] = useState<boolean>(false);
  const [ProductLoading, setProductLoading] = useState<boolean>(false);

  const cart = useCartStore(state => state.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.count, 0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('fetching category');
        const res: any = await axios.get(`${REAL_MOBILE_BASE_URL}/categories`);
        setCategories(res.data);
        if (res.data.length > 0) {
          setSelectCategories(res.data[0]);
        }
      } catch (error) {
        console.log('fetching Categories Error', error);
      } finally {
        setCateLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async (id: any) => {
      try {
        setProductLoading(true);
        const response = await axios.get(
          `${REAL_MOBILE_BASE_URL}/products/${id}`,
        );
        console.log('🚀 ~ useEffect ~ products:', response.data);
        if (response.data.length > 0) {
          setProduct(response.data);
        }
      } catch (error) {
        console.log('fetching Product Error', error);
      } finally {
        setProductLoading(false);
      }
    };
    if (selectCategories?._id) {
      fetchProducts(selectCategories?._id);
    }
  }, [selectCategories]);

  return (
    <View style={styles.mainContainer}>
      <CustomerHeader title={selectCategories?.name || 'Categories'} search />
      <View style={styles.subContainer}>
        {cateLoading ? (
          <ActivityIndicator size={'small'} color={Colors.border} />
        ) : (
          <Sidebar
            categories={categories.length > 0 ? categories : []}
            selectCategories={selectCategories}
            onCategoryPress={(category: any) => setSelectCategories(category)}
          />
        )}
        {ProductLoading ? (
          <ActivityIndicator
            size={'large'}
            color={'black'}
            style={styles.center}
          />
        ) : (
          <View>
            <FlatList
              data={product}
              keyExtractor={item => item.id}
              renderItem={({item, index}: {item: any; index: number}) => {
                return (
                  <View key={index} style={styles.Productcontainer}>
                    <Image source={{uri: item.image}} style={styles.img} />
                    <CustomText>{item.name}</CustomText>
                    <CustomText variant="h4" fontFamily={Fonts.Bold}>
                      Price : {item.price}
                    </CustomText>
                    <CustomText>{item.discountPrice}</CustomText>
                    <UniversalAdd item={item} />
                  </View>
                );
              }}
              style={styles.container}
              contentContainerStyle={styles.content}
            />
          </View>
        )}
      </View>
      {cartCount > 0 && (
        <View>
          <CartSummary
            cartCount={cartCount}
            cartImage={cart![0]?.item?.image || null}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.backgroundSecondary,
  },
  Productcontainer: {
    width: '100%',
    backgroundColor: '#fff36788',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingVertical: 10,
    paddingBottom: 100,
  },

  img: {
    width: '20%',
    height: 50,
  },
});
export default ProductCategory;
