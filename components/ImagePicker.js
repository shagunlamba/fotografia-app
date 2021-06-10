import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const ImgPicker = () => {

    const [img, setImg] = useState('');

    const verifyPermissions = async ()=> {
        const result = await Permissions.askAsync(Permissions.CAMERA);
        if(result.status!=='granted'){
            Alert.alert('Insufficient Permissions!' , 'You need to grant camera permissions to use this app', [{text: 'Okay'}]);
            return false;
        }
        return true;
    }

    const takeImageHandler = async()=> {
        const hasPermission = await verifyPermissions();
        if(!hasPermission)
            return;
        const img = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5
        });
        console.log(img);
        setImg(img.uri);
        props.onImageTaken(image.uri);
    }

    return (
        <View style={styles.imagePicker}> 
            <View style={styles.imagePreview}>
                {
                    img!==''? 
                    <Image style={styles.image} source={{uri: img}} />:
                    <Text >No Image picked yet!</Text>
                }
                <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
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
        height: 200,
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
