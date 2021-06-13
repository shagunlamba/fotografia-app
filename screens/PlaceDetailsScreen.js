import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';

const PlaceDetailsScreen = (props) => {

    const placeId = props.navigation.getParam('placeId');
    // console.log("The placeId", placeId);
    const selectedPlace = useSelector((state)=>{
        const val = state.places.places.find((pl)=>{
            if(pl.id===placeId){
                return pl
            }
        });
        return val;
    })
    // console.log("The selectedPlace", selectedPlace);

    const showMapHandler = ()=> {
        props.navigation.navigate('Map', {
            readOnly: true,
            initialLocation: {
                latitude: selectedPlace.lat,
                longitude: selectedPlace.lng
            }
        });
    }

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <Image source={{uri: selectedPlace.imageUri}} style={styles.image}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{selectedPlace.address}</Text>
                </View>
                <MapPreview 
                    pickedLocation={{
                        latitude: selectedPlace.lat,
                        longitude: selectedPlace.lng
                    }
                    }
                    style={styles.mapPreview}
                    onPress={showMapHandler}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
      height: '35%',
      minHeight: 300,
      width: '100%',
      backgroundColor: '#ccc'
    },
    locationContainer: {
      marginVertical: 20,
      width: '90%',
      maxWidth: 350,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      backgroundColor: 'white',
      borderRadius: 10
    },
    addressContainer: {
      padding: 20
    },
    address: {
      color: Colors.primary,
      textAlign: 'center'
    },
    mapPreview: {
      width: '100%',
      maxWidth: 350,
      height: 300,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    }
});  

PlaceDetailsScreen.navigationOptions = (navData)=> {
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    }
}


export default PlaceDetailsScreen;
