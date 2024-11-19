import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CategoryFIlter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  isFilterOpen,
  setIsFilterOpen,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.filterControls}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterOpen(!isFilterOpen)}>
          <Text style={styles.filterButtonText}>
            {selectedCategory || 'Filter by Category'}
          </Text>
        </TouchableOpacity>

        {selectedCategory && (
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setSelectedCategory(null)}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Menu dropdown for categories */}
      {isFilterOpen && (
        <View style={styles.filterMenu}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterItem,
                selectedCategory === category && styles.selectedFilter,
              ]}
              onPress={() => {
                setSelectedCategory(category);
                setIsFilterOpen(false);
              }}>
              <Text style={styles.filterItemText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default CategoryFIlter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  filterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  filterButton: {
    backgroundColor: '#1C1C1E',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  filterMenu: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    marginTop: 10,
    overflow: 'hidden',
  },
  filterItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  selectedFilter: {
    backgroundColor: '#0A84FF',
  },
  filterItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
