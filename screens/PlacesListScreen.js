import React, { useEffect } from 'react';
import { Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import * as placesAction from '../store/places-actions';

const PlacesListScreen = (props) => {

    const places = useSelector((state)=>{
        return state.places.places;
    })
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(placesAction.loadPlaces());
    },[dispatch]);

    return (
        <FlatList 
            data={places} 
            keyExtractor={(item)=>item.id} 
            renderItem={
                (itemData)=> {
                    return <PlaceItem 
                            image={itemData.item.imageUri} 
                            title={itemData.item.title} 
                            address={null} 
                            onSelect={()=>{
                                props.navigation.navigate('PlaceDetail', {placeTitle: itemData.item.title, placeId: itemData.item.id
                            })
                            }}
                            />
            }} 
        />
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
