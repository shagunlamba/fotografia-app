import React from 'react';
import { View, Text } from 'react-native';

const PlaceDetailsScreen = () => {
    return (
        <View>
            <Text>Place Details Screen</Text>
        </View>
    )
}


PlaceDetailsScreen.navigationOptions = (navData)=> {
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    }
}


export default PlaceDetailsScreen;
