import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CollectionItemCard = ({item,collectionId}) => {
  // console.log(collectionId)
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.itemCard} onPress={() => navigation.navigate('StackItemDetailsScreen', {item,collectionId})}>
          {item.image && (
            <Image 
              source={{uri: item.image.uri}} 
              style={styles.itemImage}
              resizeMode="cover"
            />
          )}
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemCost}>{item.cost}$</Text>
          </View>
        </TouchableOpacity>
      );
}

export default CollectionItemCard

const styles = StyleSheet.create({
    itemCard: {
      backgroundColor: '#1C1C1E',
      borderRadius: 12,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
    },
    itemImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    itemInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    itemTitle: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 4,
    },
    itemCost: {
      color: '#30D158',
      fontSize: 14,
      fontWeight: '600',
    },
  });