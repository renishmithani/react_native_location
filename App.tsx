import { View, Text } from 'react-native';
import React from 'react';
import MapScreen from './src/screens/MapScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <MapScreen />
    </SafeAreaProvider>
  );
}
