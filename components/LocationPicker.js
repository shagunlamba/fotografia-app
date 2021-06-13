import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import * as Location from 'expo-location';
import MapPreview from './MapPreview';



const LocationPicker = (props) => {

    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const {onLocationPicked} = props;

    const mapPickedLocation = props.navigation.getParam('pickedLocation');

    useEffect(() => {
       if(mapPickedLocation){
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
       }
    }, [mapPickedLocation,onLocationPicked])

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
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude
            });
            props.onLocationPicked({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude
            })
        }
        catch(err){
            Alert.alert('Couldn\'t fetch Location', 'Please try again later or pick a location on map',[{text: 'Okay'}])
        }
        setIsFetching(false);
    }

    const pickOnMapHandler = ()=> {
        props.navigation.navigate('Map');
    }

    return (
        <View style={styles.locationPicker}>
            <View style={styles.mapPreview}>
               {isFetching? <ActivityIndicator size="large" color={Colors.primary}/> : pickedLocation? <MapPreview pickedLocation={pickedLocation} onPress={pickOnMapHandler}/>
            :<Text>No Location picked yet!</Text> }
            </View>
            <View style={styles.actions}>
                <Button title="Get User Location " color={Colors.primary} onPress={getUserLocation}/>
                <Button title="Pick on Map" color={Colors.primary} onPress={pickOnMapHandler}/>
            </View>
        </View>
    );
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
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default LocationPicker;