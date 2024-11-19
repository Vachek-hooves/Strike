import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CollectionItem = ({collection}) => {
    const navigation = useNavigation();

    const handleCollectionPress = () => {
        navigation.navigate('StackCollectionDetailsScreen', {collection});
    }

  return (
    <TouchableOpacity style={styles.container} onPress={handleCollectionPress}>
      {collection.image && (
        <Image 
          source={{uri: collection.image.uri}} 
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{collection.name}</Text>
        <Text style={styles.category}>{collection.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CollectionItem

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1C1C1E',
      borderRadius: 8,
      marginBottom: 10,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 8,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: 'bold',
      marginBottom: 4,
    },
    category: {
      fontSize: 14,
      color: '#999999',
    },
  });