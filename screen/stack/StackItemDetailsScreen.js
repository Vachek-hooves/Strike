import {StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import StackLayout from '../../components/layout/StackLayout';
import ReturnBtn from '../../components/ui/ReturnBtn';
import {useNavigation} from '@react-navigation/native';
import {useContextApp} from '../../store/context';

const StackItemDetailsScreen = ({route}) => {
  const {item, collectionId} = route.params;
  const navigation = useNavigation();
  const {deleteItemFromCollection} = useContextApp();

  const handleDeleteItem = () => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteItemFromCollection(collectionId, item.id);
            if (success) {
              navigation.goBack();
            } else {
              Alert.alert('Error', 'Failed to delete item');
            }
          },
        },
      ],
    );
  };

  return (
    <StackLayout>
      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>

        {item.image && (
          <View style={styles.imageContainer}>
            <Image
              source={{uri: item.image.uri}}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}

        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}

        <View style={styles.costContainer}>
          <Text style={styles.costLabel}>Estimated cost ($)</Text>
          <Text style={styles.costValue}>{item.cost} $</Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteItem}>
          <Text style={styles.deleteButtonText}>Delete item</Text>
        </TouchableOpacity>
      </View>
      <ReturnBtn style={{top:50,right:50}}/>
    </StackLayout>
  );
};

export default StackItemDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 34,
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
    backgroundColor: '#1C1C1E',
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
  costContainer: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  costLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  costValue: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FF453A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
