import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/places-actions';
import ImgPicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = (props) => {

    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");

    const titleChangeHandler = (text)=> {
        setTitle(text)
    }
    const imgTakenHandler = (path)=> {
        setImg(path);
    }
    const dispatch = useDispatch();
    const savePlaceHandler = ()=> {
        dispatch(placesActions.addPlace(title, img));
        props.navigation.goBack();
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput  
                    style={styles.textInput}
                    value={title}
                    onChangeText={titleChangeHandler}
                />
                <ImgPicker onImageTaken={imgTakenHandler} />
                <LocationPicker />
                <Button title="Save Photo" color={Colors.primary} onPress={savePlaceHandler} />
            </View>
        </ScrollView>
    )
}

export default NewPlaceScreen;


NewPlaceScreen.navigationOptions = ()=> {
    return {
        headerTitle: 'Add Place'
    }
}

const styles= StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 4,
        marginBottom: 15,
        paddingHorizontal: 2
    }
});