import React, {useState, useEffect, useCallback} from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const MapScreen = (props) => {

    const initialLocation = props.navigation.getParam('initialLocation');
    const readOnly = props.navigation.getParam('readOnly');


    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const selectLocationHandler=(e)=> {
        if(readOnly){
            return;
        }

        setSelectedLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
        })
    }

    const savePickedLocationHandler = useCallback(()=> {
        if(!selectedLocation){
            //could show an alert
            return;
        }
        props.navigation.navigate('NewPlace',{
            pickedLocation: selectedLocation
        });
    },[selectedLocation]);

    useEffect(()=>{
        props.navigation.setParams({
            saveLocation: savePickedLocationHandler
        })
    },[savePickedLocationHandler]);

    const mapRegion = {
        latitude: initialLocation? initialLocation.latitude:37.78,
        longitude: initialLocation? initialLocation.longitude:-122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <MapView 
            region={mapRegion}
            style={styles.map}
            onPress={selectLocationHandler}
        >
        { selectedLocation && <Marker title="Picked Location" coordinate={selectedLocation}></Marker> }
        </MapView>
    )
}

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation');
    const readOnly = navData.navigation.getParam('readOnly');
    if(readOnly){
        return {
            headerTitle: 'Map'
        }
    }

    return {
        headerTitle: 'Map',
        headerRight: ()=>(
            <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
                <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
        )
    }
}





const styles= StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 18,
        color: 'white'
    }
})

export default MapScreen;
