import React from 'react';
import { View, Text, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';

const PlacesListScreen = () => {
    return (
        <View>
            <Text>Places List Screen</Text>
        </View>
    )
}

export default PlacesListScreen;


PlacesListScreen.navigationOptions = (navData)=> {
    return {
        headerTitle: 'All Places',
        headerRight: ()=> <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Add Place" iconName={Platform.OS==='android'? 'md-add': 'ios-add'} onPress={()=>{
                navData.navigation.navigate('NewPlace');
            }}/>
        </HeaderButtons>
    }
}
