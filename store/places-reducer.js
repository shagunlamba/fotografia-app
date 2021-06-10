import Place from "../models/Place";
import { ADD_PLACE } from "./places-actions";

const initialState = {
    places: []
}

const initialReducer = (state= initialState, action)=> {
    switch(action.type){
        case ADD_PLACE:
            const newPlace= new Place(new Date.toString(), action.placeData.title);
            return {
                places: state.places.concat(newPlace)
            }
        default:
            return state;
    }
}

export default initialReducer;