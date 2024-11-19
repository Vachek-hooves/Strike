import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert ,ScrollView} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import StackLayout from '../../components/layout/StackLayout';
import ReturnBtn from '../../components/ui/ReturnBtn';
import { useContextApp } from '../../store/context';
import CollectionItemCard from '../../components/AllCollections/CollectionItemCard';

const StackCollectionDetailsScreen = ({ route }) => {
  const { collection: initialCollection } = route.params;
  const [collection, setCollection] = useState(initialCollection);
  const navigation = useNavigation();
  const { deleteCollection, getCollectionById } = useContextApp();
  const isFocused = useIsFocused();

  // Refresh collection data when screen is focused
  useEffect(() => {
    if (isFocused) {
      const updatedCollection = getCollectionById(collection.id);
      if (updatedCollection) {
        setCollection(updatedCollection);
      }
    }
  }, [isFocused, collection.id]);

  const handleDeleteCollection = () => {
    Alert.alert(
      'Delete Collection',
      `Are you sure you want to delete "${collection.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteCollection(collection.id);
            if (success) {
              navigation.goBack();
            } else {
              Alert.alert('Error', 'Failed to delete collection');
            }
          },
        },
      ]
    );
  };

  const handleAddItem = () => {
    navigation.navigate('StackCreateCollectionItemScreen', {
      collectionId: collection.id,
      collectionName: collection.name,
    });
  };

  console.log(collection.items.map(item=>item.title));

  const renderItems = () => {
    if (collection.items.length === 0) {
      return null;
    }

    return (
      <ScrollView  style={styles.itemsSection}>
        <Text style={styles.sectionTitle}>Items</Text>
        {collection.items.map(item => (
          <CollectionItemCard key={item.id} item={item} />
        ))}
      </ScrollView>
    );
  };

  return (
    <StackLayout>
      <View style={styles.container}>
        <Text style={styles.title}>{collection.name}</Text>

        {collection.image && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: collection.image.uri }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}

        {collection.description && (
          <Text style={styles.description}>{collection.description}</Text>
        )}

        
      {  renderItems()}


        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddItem}
          >
            <Text style={styles.addButtonText}>Add item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteCollection}
          >
            <Text style={styles.deleteButtonText}>Delete collection</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{height:80}}></View> */}
      </View>
      {/* <ReturnBtn /> */}
    </StackLayout>
  );
};

export default StackCollectionDetailsScreen;

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
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  description: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 20,
    lineHeight: 24,
  },
  buttonsContainer: {
    gap: 12,
    flexDirection:'row',
   
  },
  addButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex:1
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FF453A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex:1
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
    itemsContainer: {
    marginBottom: 20,
  },
  itemsCount: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 20,
  },
});
