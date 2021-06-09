import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const NewPlaceScreen = () => {

    const [title, setTitle] = useState("");
    const titleChangeHandler = (text)=> {
        setTitle(text)
    }

    const savePlaceHandler = ()=> {
        
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

                <Button title="Save Photo" color={Colors.primary} />
            </View>
        </ScrollView>
    )
}

export default NewPlaceScreen;


NewPlaceScreen.navigationOptions = (navData)=> {
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