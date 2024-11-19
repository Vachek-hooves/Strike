import { StyleSheet, Text, View, Image, TouchableOpacity, Alert ,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StackLayout from '../../components/layout/StackLayout';
import ReturnBtn from '../../components/ui/ReturnBtn';
import { useContextApp } from '../../store/context';

const StackCollectionDetailsScreen = ({ route }) => {
  const { collection } = route.params;
  const navigation = useNavigation();
  const { deleteCollection } = useContextApp();

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

  const renderItems = (items) => {
    return items.map(item=>{
      return <Text style={styles.itemTitle} key={item.id}>{item.title}as</Text>
    })
  }

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

        {collection.items.length > 0 && (
          <ScrollView>
            {renderItems(collection.items)}
          </ScrollView>
        )}


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
      </View>
      <ReturnBtn />
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
   
  },
  addButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
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
