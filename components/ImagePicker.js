import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';


const ImgPicker = (props) => {

    const [img, setImg] = useState('');

    const verifyPermissions = async ()=> {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Insufficient Permissions!' , 'You need to grant camera permissions to use this app', [{text: 'Okay'}]);
            return false;
        }
        // const result = await Permissions.askAsync(Permissions.CAMERA);
        // if(result.status!=='granted'){
        //     Alert.alert('Insufficient Permissions!' , 'You need to grant camera permissions to use this app', [{text: 'Okay'}]);
        //     return false;
        // }
        return true;
    }

    const takeImageHandler = async()=> {
        const hasPermission = await verifyPermissions();
        if(!hasPermission)
            return;
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        setImg(result.uri);
        props.onImageTaken(result.uri);
    }

    return (
        <View style={styles.imagePicker}> 
            <View style={styles.imagePreview}>
                {
                    img!=='' && img?
                    <Image style={styles.image} source={{uri: img}} />:
                    <Text >No Image picked yet!</Text>
                }
                {
                    img!=='' && img? null:<Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 300,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        height: '100%',
        width: '100%'
    }
});


export default ImgPicker;
