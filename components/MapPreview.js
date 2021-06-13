import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapPreview = (props) => {
    return (
           <MapView
                    style={{...styles.map, ...props.style}}
                    initialRegion={{
                        latitude: props.pickedLocation.latitude,
                        longitude: props.pickedLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onPress={props.onPress}
                >
                <Marker
                    coordinate={{
                        latitude: props.pickedLocation.latitude,
                        longitude: props.pickedLocation.longitude,
                    }}
                />
                </MapView>
    )
}

export default MapPreview;

const styles = StyleSheet.create({
    map: {
        backgroundColor: 'pink',
        width: '100%',
        height: 150,
    },
});
