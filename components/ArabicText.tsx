import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import Colors from '../constants/Colors';

type Props = TextProps & {
  size?: number;
  bold?: boolean;
  color?: string;
  children: React.ReactNode;
};

export default function ArabicText({ children, size = 28, bold = false, color, style, ...props }: Props) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        {
          fontSize: size,
          color: color || Colors.text,
          fontFamily: bold ? 'Amiri-Bold' : 'Amiri',
          lineHeight: size * 1.8,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});