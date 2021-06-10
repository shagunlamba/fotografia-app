import Place from "../models/Place";
import { ADD_PLACE, SET_PLACES } from "./places-actions";

const initialState = {
    places: []
}

const initialReducer = (state= initialState, action)=> {
    switch(action.type){
        case SET_PLACES:
            return {
                places: action.places.map(pl=>{
                    return new Place(pl.id.toString(), pl.title, pl.imageUri);
                })
            }
        case ADD_PLACE:
            const newPlace= new Place(action.placeData.id.toString(), action.placeData.title, action.placeData.image);
            return {
                places: state.places.concat(newPlace)
            }
        default:
            return state;
    }
}

export default initialReducer;