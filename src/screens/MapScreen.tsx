import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { INITIAL_REGION } from '../constant';
import { useScreenReady } from '../hooks/useScreenReady';
import LazyLoader from '../components/LazyLoad';
import Container from '../components/Container';
import { requestLocationPermission } from '../Permissions';

const MapScreen = () => {
  const isReady = useScreenReady();
  const mapRef = useRef<MapView>(null);

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const handleMyLocationPress = useCallback(async () => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Location access is required to use this feature. Please enable it in the app settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      );
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });

        const newRegion: Region = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        mapRef.current?.animateToRegion(newRegion, 1000);
      },
      error => {
        Alert.alert('Error', error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, [mapRef]);

  if (!isReady) {
    return <LazyLoader />;
  }

  return (
    <Container>
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.button} onPress={handleMyLocationPress}>
          <Text style={styles.buttonText}>My Location</Text>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>
            Latitude: {location ? location.lat : '-'}
          </Text>
          <Text style={styles.label}>
            Longitude: {location ? location.lng : '-'}
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={INITIAL_REGION}
          onRegionChange={console.log}
        >
          {location && (
            <Marker
              coordinate={{ latitude: location.lat, longitude: location.lng }}
              title="Current Location"
            />
          )}
        </MapView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  topSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 200,
    marginBottom: 10,
    borderWidth: 1,
  },
  buttonText: {
    color: '#000',
  },
  infoContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 5,
  },
  bottomSection: {
    flex: 0.6,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
