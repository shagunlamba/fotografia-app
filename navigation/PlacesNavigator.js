import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen';
import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlacesListScreen from '../screens/PlacesListScreen';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';

const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailsScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white': Colors.primary
    }
});

export default createAppContainer(PlacesNavigator);
