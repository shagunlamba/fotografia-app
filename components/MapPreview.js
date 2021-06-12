import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

const MapPreview = (props) => {
    return (
        <View>
            <MapView
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            />
        </View>
    )
}

export default MapPreview;

const styles = StyleSheet.create({});
