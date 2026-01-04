import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PROPS {
    children: ReactNode;
    style?: StyleProp<ViewStyle>
}

export default function Container({ children, style = {} }: PROPS) {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: '#FFF',
          paddingTop: top,
          paddingBottom: bottom,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
