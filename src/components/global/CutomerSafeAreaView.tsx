import {CustomContainer} from './CustomeContainer';
import {FC, ReactNode} from 'react';
import {SafeAreaView, ViewStyle} from 'react-native';

interface CustomerSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}
export const CustomerSafeAreaView: FC<CustomerSafeAreaViewProps> = ({
  children,
}) => {
  return (
    <CustomContainer>
      <SafeAreaView />
      {children}
    </CustomContainer>
  );
};
