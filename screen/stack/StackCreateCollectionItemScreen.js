import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useState} from 'react';
import StackLayout from '../../components/layout/StackLayout';
import ReturnBtn from '../../components/ui/ReturnBtn';
import CustomImagePicker from '../../components/ui/ImagePicker';
import {useContextApp} from '../../store/context';

const StackCreateCollectionItemScreen = ({route, navigation}) => {
  const {collectionId, collectionName} = route.params;
  const {addItemToCollection} = useContextApp();

  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [itemImage, setItemImage] = useState(null);

  const handleImageSelected = image => {
    setItemImage(image);
  };

  const handleAddItem = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    const success = await addItemToCollection(collectionId, {
      title,
      cost: parseFloat(cost) || 0,
      description,
      image: itemImage,
      createdAt: new Date().toISOString(),
    });

    if (success) {
      setTitle('');
      setCost('');
      setDescription('');
      setItemImage(null);

      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to add item');
    }
  };

  return (
    <StackLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Add item</Text>

        <CustomImagePicker
          onImageSelected={handleImageSelected}
          style={styles.imagePicker}
        />

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          placeholder="Estimated cost ($)"
          value={cost}
          onChangeText={setCost}
          keyboardType="decimal-pad"
          placeholderTextColor="#666"
        />

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description of the item"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          placeholderTextColor="#666"
        />

        {title.trim() !== '' && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>Add item</Text>
          </TouchableOpacity>
        )}
      </View>
      <ReturnBtn style={{bottom: '6%', right: 40}} />
    </StackLayout>
  );
};

export default StackCreateCollectionItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  imagePicker: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1C1C1E',
    padding: 15,
    borderRadius: 8,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  addButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    borderColor: '#000',
    borderWidth:2
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
