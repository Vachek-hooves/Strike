import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import { useState,useEffect} from 'react';

const CustomImagePicker = ({onImageSelected}) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        onImageSelected(image);
    }, [image]);

    const options = {
        maxWidth: 2000,
        maxHeight: 2000,
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
    };

const handleImagePicker = () => {
    ImagePicker.launchImageLibrary(options,response=>{
        if(response.didCancel){
            console.log('User cancelled image picker');
        }else if(response.error){
            console.log('ImagePicker Error: ', response.error);
        }else{
            const source = { uri: response.assets[0].uri };
            setImage(source);
            // onImageSelected(source);
        }
    });
}

  return (
    <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
        {image ? <Image source={image} style={styles.image} /> : <Icon name="image" size={32} color="#FFFFFF" />}
    </TouchableOpacity>
  )
}

export default CustomImagePicker

const styles = StyleSheet.create({
    imagePicker: {
        // padding: 10,
        borderRadius: 75,
        backgroundColor: '#1C1C1E',
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin:20
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    }

})