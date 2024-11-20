import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useState} from 'react';
import {isFormValid} from '../../utils/validations';
import {useContextApp} from '../../store/context';
import StackLayout from '../../components/layout/StackLayout';
import DropDownMenu from '../../components/CreateCollections/DropDownMenu';
import ReturnBtn from '../../components/ui/ReturnBtn';
import CustomImagePicker from '../../components/ui/ImagePicker';



const StackCreateCollectionScreen = ({navigation}) => {
  const {addCollection} = useContextApp();
  const [collectionName, setCollectionName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageCategory, setImageCategory  ] = useState(null);
  const [customCategory, setCustomCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleCategorySelect = category => {
    // console.log('category', category);
    setSelectedCategory(category);
    if (category !== 'Other') {
      setCustomCategory('');
    }
    setIsDropdownOpen(false);
  };

  const handleImageCategorySelected = image => {
    setImageCategory(image);
  }

  const handleCreate = async () => {
    const finalCategory = selectedCategory === 'Other' ? customCategory : selectedCategory;
    const success = await addCollection(collectionName, finalCategory, imageCategory, description);
    

    if (success) {
      // Clear form
      setCollectionName('');
      setSelectedCategory('');
      setImageCategory(null);
      setCustomCategory('');
      setDescription('');
      // Show success message
      // Alert.alert('Success', 'Collection created successfully!');
      navigation.navigate('StackAllCollectionsScreen')

      // Navigate back or to another screen
      // navigation.goBack(); // If using React Navigation
    } else {
      Alert.alert('Error', 'Failed to create collection. Please try again.');
    }
  };

  const isValid = isFormValid(
    collectionName, 
    selectedCategory === 'Other' ? customCategory : selectedCategory
  );

  return (
    <StackLayout>
      <ScrollView>

    
      <Text style={styles.title}>Create collection</Text>
      <CustomImagePicker onImageSelected={handleImageCategorySelected} />

      {/* Collection Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Collection name"
        value={collectionName}
        onChangeText={setCollectionName}
        placeholderTextColor="#666"
      />

      {/* Description Input */}
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#666"
        multiline={true}
        numberOfLines={3}
        textAlignVertical='top'
        height={100}
        lineHeight={20}
        paddingTop={10}
      />

      {/* Dropdown Header */}
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
        <Text style={styles.dropdownHeaderText}>
          {selectedCategory || 'Collection category'}
        </Text>
      </TouchableOpacity>

      
      <DropDownMenu
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategorySelect}
        isDropdownOpen={isDropdownOpen}
      />

      {/* Custom Category Input - Only shown when "Other" is selected */}
      {selectedCategory === 'Other' && (
        <TextInput
          style={[styles.input, styles.customCategoryInput]}
          placeholder="Enter custom category"
          value={customCategory}
          onChangeText={setCustomCategory}
          placeholderTextColor="#666"
        />
      )}
      
      {/* Create Button - only shown when form is valid */}
      {isValid && (
        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      )}
      </ScrollView>
      <View style={{height:70}}></View>
      <ReturnBtn style={{bottom:50,right:50,marginTop:20}}/>
      
    </StackLayout>
  );
};

export default StackCreateCollectionScreen;

const styles = StyleSheet.create({
 
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1C1C1E',
    padding: 15,
    borderRadius: 8,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  dropdownHeader: {
    backgroundColor: '#1C1C1E',
    padding: 15,
    borderRadius: 8,
    marginBottom: 2,
  },
  dropdownHeaderText: {
    color: '#FFFFFF',
  },
  createButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  customCategoryInput: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
});
