import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {COLLECTION_CATEGORIES} from '../../data/categories';

const DropDownMenu = ({
  selectedCategory,
  setSelectedCategory,
  isDropdownOpen,
}) => {
  return (
    <>
      {isDropdownOpen && (
        <ScrollView
          // style={styles.dropdownMenu}
          contentContainerStyle={styles.dropdownMenu}>
          {COLLECTION_CATEGORIES.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.dropdownItem,
                selectedCategory === category && styles.selectedItem,
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text style={styles.dropdownItemText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {/* <View style={{height:100}}></View> */}
    </>
  );
};

export default DropDownMenu;

const styles = StyleSheet.create({
  dropdownMenu: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    overflow: 'hidden',
    height: '30%',
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
});
