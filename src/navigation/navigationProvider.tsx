import React, {createContext, useContext} from 'react';
import {useNavigationUtils} from '../utils/NavigationUtils';

const NavigationContext = createContext<ReturnType<
  typeof useNavigationUtils
> | null>(null);

export const NavigationProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const navigationUtils = useNavigationUtils();

  return (
    <NavigationContext.Provider value={navigationUtils}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
