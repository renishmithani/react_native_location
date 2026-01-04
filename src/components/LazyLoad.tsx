import { ActivityIndicator, View } from 'react-native';

const LazyLoader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LazyLoader;
