import {StyleSheet, Text, View, ScrollView} from 'react-native';
import StackLayout from '../../components/layout/StackLayout';
import ReturnBtn from '../../components/ui/ReturnBtn';
import {useContextApp} from '../../store/context';
import {useState} from 'react';
import CategoryFIlter from '../../components/AllCollections/CategoryFIlter';
import CollectionItem from '../../components/AllCollections/CollectionItem';

const StackAllCollectionsScreen = () => {
  const {collections} = useContextApp();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // console.log(collections);

  // Get unique categories from collections
  const categories = [...new Set(collections.map(col => col.category))];

  // Filter collections based on selected category
  const filteredCollections = selectedCategory
    ? collections.filter(col => col.category === selectedCategory)
    : collections;


  const renderCollections = () => {
    if (collections.length === 0) {
      return <Text style={styles.noCollectionsText}>No collections found</Text>;
    }
    return filteredCollections.map(collection => (
      <CollectionItem key={collection.id} collection={collection} />
    ));
  };

  return (
    <StackLayout>
      <View style={styles.header}>
        <Text style={styles.title}>All Collections</Text>
      </View>

      {/* {renderFilterMenu()} */}
      <CategoryFIlter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
      <ScrollView>
        {renderCollections()}
      </ScrollView>
      <ReturnBtn style={{bottom:50,right:50}}/>
    </StackLayout>
  );
};

export default StackAllCollectionsScreen;

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
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
    marginBottom: 20,
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
  noCollectionsText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  collectionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  collectionImage: {
    width: 100,
    height: 100,
  },
});
