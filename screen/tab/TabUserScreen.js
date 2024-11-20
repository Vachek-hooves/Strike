import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import TabLayou from '../../components/layout/TabLayou';
import CustomImagePicker from '../../components/ui/ImagePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const TabUserScreen = () => {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  console.log('User image:', userImage);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedName = await AsyncStorage.getItem('userName');
      const savedImage = await AsyncStorage.getItem('userImage');

      if (savedName) setUserName(savedName);
      if (savedImage) setUserImage(JSON.parse(savedImage));
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleImageSelected = image => {
    setUserImage(image);
  };

  const handleSave = async () => {
    try {
      if (!userName.trim()) {
        Alert.alert('Error', 'Please enter your name');
        return;
      }

      await AsyncStorage.setItem('userName', userName);
      if (userImage) {
        await AsyncStorage.setItem('userImage', JSON.stringify(userImage));
      }

      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save profile data');
    }
  };

  return (
    <TabLayou>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              <CustomImagePicker
                onImageSelected={handleImageSelected}
                initialImage={userImage}
              />
            </View>
            {/* <Image
              source={{uri: userImage.image.uri}}
              style={styles.image}
              resizeMode="cover"
            /> */}
            {/* <ImageBackground
              source={require('../../assets/profilebg/level31.png')}
              style={styles.levelBackground}
              resizeMode="contain"
            /> */}
          </View>

          {isEditing ? (
            <View style={styles.editContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="#666"
                  value={userName}
                  onChangeText={setUserName}
                />
                <Icon
                  name="pencil"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
              </View>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.displayContainer}>
              <TouchableOpacity
                style={styles.nameContainer}
                onPress={() => setIsEditing(true)}>
                <Text style={styles.userName}>
                  {userName || 'Add your name'}
                </Text>
                <Icon
                  name="pencil"
                  size={20}
                  color="#0A84FF"
                  style={styles.editIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}>
                <Icon
                  name="create-outline"
                  size={20}
                  color="#FFFFFF"
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TabLayou>
  );
};

export default TabUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
  },
  editContainer: {
    width: '100%',
    alignItems: 'center',
  },
  displayContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    position: 'relative',
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#1C1C1E',
    padding: 15,
    paddingRight: 40, // Make room for the icon
    borderRadius: 8,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333',
  },
  inputIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{translateY: -10}],
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  userName: {
    fontSize: 24,
    color: '#FFFFFF',
    marginRight: 10,
  },
  editIcon: {
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  imageContainer: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  imageWrapper: {
    width: 150,
    height: 150,
    position: 'relative',
    zIndex: 1,
  },
  levelBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    top: 0,
    left: 0,
  },
  cameraButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0A84FF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
