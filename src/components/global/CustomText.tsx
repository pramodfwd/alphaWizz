import {Colors, Fonts} from '@utils/Constants';
import React from 'react';
import {Text, TextStyle} from 'react-native';

interface ITextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body';
  fontFamily?: Fonts;
  fontSize?: Number;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (e: object) => void;
}

// Create a wrapper for the Text component
export const CustomText: React.FC<ITextProps> = ({
  variant,
  fontFamily,
  numberOfLines,
  onLayout,
  children,
  style,
  ...props
}) => {
  let computedFontSize: number = 14; // Default font size
  switch (variant) {
    case 'h1':
      computedFontSize = 24;
      break;
    case 'h2':
      computedFontSize = 20;
      break;
    case 'h3':
      computedFontSize = 18;
      break;
    case 'h4':
      computedFontSize = 16;
      break;
    case 'h5':
      computedFontSize = 14;
      break;
    case 'h6':
      computedFontSize = 12;
      break;
  }

  const fontFamilyStyle = {
    fontFamily,
  };

  return (
    <Text
      style={[
        {
          textAlign: 'left', // Example default style
          color: Colors.text,
          fontSize: computedFontSize,
        },
        fontFamilyStyle,
        style,
      ]}
      numberOfLines={numberOfLines != undefined ? numberOfLines : undefined}
      onLayout={onLayout}
      {...props}>
      {children}
    </Text>
  );
};
