import React, { useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';
import * as Location from 'expo-location';
import MapPreview from './MapPreview';
import MapView, { Marker } from 'react-native-maps';


const LocationPicker = () => {

    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const verifyPermissions = async ()=> {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Insufficient Permissions!' , 'You need to grant location permissions to use this app', [{text: 'Okay'}]);
            return false;
        }
        return true;
    }

    const getUserLocation= async ()=>{
        const hasPermission = await verifyPermissions();
        if(!hasPermission)
            return;
        try {
            setIsFetching(true);
            const loc = await Location.getCurrentPositionAsync({
                    timeout: 5000
            })
            console.log("The loc", loc);
            setPickedLocation({
                lat: loc.coords.latitude,
                lng: loc.coords.longitude
            });
        }
        catch(err){
            Alert.alert('Couldn\'t fetch Location', 'Please try again later or pick a location on map',[{text: 'Okay'}])
        }
        setIsFetching(false);
    }

    return (
        <View style={styles.locationPicker}>
            <View style={styles.mapPreview}>
               {isFetching? <ActivityIndicator size="large" color={Colors.primary}/> : pickedLocation? <MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: pickedLocation.lat,
                    longitude: pickedLocation.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                >
                <Marker 
                    coordinate={{
                    latitude: pickedLocation.lat,
                    longitude: pickedLocation.lng,
                    }}
                />
                </MapView>
            :<Text>No Location picked yet!</Text> }
            </View>
            <Button title="Get User Location" color={Colors.primary} onPress={getUserLocation}/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        backgroundColor: 'pink',
        width: '100%',
        height: 150,
        // marginTop: 20
    }
});

export default LocationPicker;