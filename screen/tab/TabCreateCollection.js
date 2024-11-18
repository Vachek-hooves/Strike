import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { isFormValid } from '../../utils/validations';
import { useState } from 'react';
import { useContextApp } from '../../store/context';
import { COLLECTION_CATEGORIES } from '../../data/categories';
// const COLLECTION_CATEGORIES = [
//   'Coins',
//   'Stamps',
//   'Toys',
//   'Antiques',
//   'Books',
//   'Cards',
//   'Other'
// ];

const TabCreateCollection = () => {
  const { addCollection } = useContextApp();
  const [collectionName, setCollectionName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (category) => {
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
    <View style={styles.container}>
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
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Text style={styles.dropdownHeaderText}>
          {selectedCategory || 'Collection category'}
        </Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <View style={styles.dropdownMenu}>
          {COLLECTION_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.dropdownItem,
                selectedCategory === category && styles.selectedItem
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={styles.dropdownItemText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Create Button - only shown when form is valid */}
      {isValid && (
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreate}
        >
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TabCreateCollection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
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
  dropdownMenu: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  selectedItem: {
    backgroundColor: '#0A84FF',
  },
  dropdownItemText: {
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