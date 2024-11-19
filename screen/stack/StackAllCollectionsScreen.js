import {StyleSheet, Text} from 'react-native';
import StackLayout from '../../components/layout/StackLayout';
import ReturnBtn from '../../components/ui/ReturnBtn';
import { useContextApp } from '../../store/context';

const StackAllCollectionsScreen = () => {
  const {collections,getCollectionsGroupedByCategory,getCollectionsByCategory} = useContextApp();
  const collectionsGroupedByCategory = getCollectionsGroupedByCategory();
  const collectionsByCategory = getCollectionsByCategory('Art');
  console.log(collectionsByCategory);
  console.log(collectionsGroupedByCategory);

  const renderCollections = () => {
    if (collections.length === 0) {
      return <Text style={styles.noCollectionsText}>No collections found</Text>;
    }
    return collections.map(collection => (
      <Text style={styles.collectionText} key={collection.id}>{collection.name}</Text>
    ));
  };


  return (
    <StackLayout>
      <Text style={styles.title}>All Collections</Text>
      {renderCollections()}
      <ReturnBtn />
    </StackLayout>
  );
};

export default StackAllCollectionsScreen;

const styles = StyleSheet.create({
  noCollectionsText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  collectionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
});
