import React from 'react';
import PlacesNavigator from './navigation/PlacesNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import placesReducer from './store/places-reducer';
import { init } from './db/db';
import { StatusBar } from 'expo-status-bar';
 
init()
.then(()=>{
  console.log("Initialized database");
})
.catch((err)=>{
  console.log("Initialize database failed", err);
});

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
      <Provider store={store}>
        <PlacesNavigator />
        <StatusBar style="light" backgroundColor="black" />
      </Provider>
  );
}
