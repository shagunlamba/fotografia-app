import * as FileSystem from 'expo-file-system';
import { add } from 'react-native-reanimated';
import { insertPlace, fetchPlaces } from '../db/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, img, location)=> {
    return async dispatch => {
        const fileName= img.split("/").pop();
        const newPath = FileSystem.documentDirectory + fileName;

        const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=zJfNJ3WHDsz4um7KzL3t1dXbLt4AXlnj&location=${location.latitude},${location.longitude}&includeRoadMetadata=true&includeNearestIntersection=true`)
        if(!response.ok){
            throw new Error("Something went Wrong!");
        }
        const resData = await response.json();
        console.log("The geocodeing resData", resData);
        if(!resData.results){
            throw new Error("Something went Wrong!");
        }
        const address = resData.results[0].locations[0].adminArea3;
        console.log("The final address", address);

        try{
            await FileSystem.moveAsync({
                from: img,
                to: newPath
            });

            const dbResult = await insertPlace(title, newPath, address, location.latitude, location.longitude);
            console.log(dbResult);
            dispatch({ 
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title,
                    image: newPath,
                    address: address,
                    coords: {
                        lat: location.latitude,
                        lng: location.longitude
                    }
                }
            })
        }
        catch(err){
            console.log(err);
            throw err;
        }
        
    }
}


export const loadPlaces = ()=>{
    return async dispatch=>{
        try{
            const dbResult = await fetchPlaces();
            dispatch({type: SET_PLACES, places: dbResult.rows._array})
        }
        catch(err) {
            throw err;
        }
    }
}