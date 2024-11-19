import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
// import {COLLECTION_CATEGORIES} from '../../data/categories';
import {useState} from 'react';
import {isFormValid} from '../../utils/validations';
import {useContextApp} from '../../store/context';
import StackLayout from '../../components/layout/StackLayout';
import DropDownMenu from '../../components/CreateCollections/DropDownMenu';
import ReturnBtn from '../../components/ui/ReturnBtn';
const StackCreateCollectionScreen = ({navigation}) => {
  const {addCollection} = useContextApp();
  const [collectionName, setCollectionName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = category => {
    console.log('category', category);
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };
  const handleCreate = async () => {
    // if (isFormValid(collectionName, selectedCategory)) {
    const success = await addCollection(collectionName, selectedCategory);
    

    if (success) {
      // Clear form
      setCollectionName('');
      setSelectedCategory('');

      // Show success message
      Alert.alert('Success', 'Collection created successfully!');

      // Navigate back or to another screen
      // navigation.goBack(); // If using React Navigation
    } else {
      Alert.alert('Error', 'Failed to create collection. Please try again.');
    }
    // }
  };

  const isValid = isFormValid(collectionName, selectedCategory);

  return (
    <StackLayout>
      <Text style={styles.title}>Create collection</Text>

      {/* Collection Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Collection name"
        value={collectionName}
        onChangeText={setCollectionName}
        placeholderTextColor="#666"
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

      {/* Create Button - only shown when form is valid */}
      {isValid && (
        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      )}
      <ReturnBtn />
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
});
