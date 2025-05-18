import {View, StyleSheet, Image} from 'react-native';
import React, {FC, memo, useMemo} from 'react';
import {imageData} from '@utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';
import {screenHeight, screenWidth} from '@utils/Scaling';

const ProductSlider = () => {
  const rowData = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll
        duration={10000}
        endPaddingWidth={0}
        style={styles.autoScroll}>
        <View style={styles.gridContainer}>
          {rowData.map((row: any, rowIndex: number) => {
            return <MemoizedRow row={row} index={rowIndex} key={rowIndex} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row: FC<{row: typeof imageData; index: number}> = ({row, index}) => {
  return (
    <View style={styles.row} key={index}>
      {row?.map((img, imgIndx) => {
        const horizontalShift = index % 2 === 0 ? -18 : 18;
        return (
          <View
            key={imgIndx}
            style={[
              styles.itemContainer,
              {transform: [{translateX: horizontalShift}]},
            ]}>
            <Image source={img} style={styles.img} />
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = memo(Row);

const styles = StyleSheet.create({
  autoScroll: {
    position: 'absolute',
    zIndex: -2,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemContainer: {
    marginHorizontal: 10,
    width: screenWidth * 0.24,
    height: screenHeight * 0.14,
    backgroundColor: '#FFFFF0',
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
  },
});
export default ProductSlider;
