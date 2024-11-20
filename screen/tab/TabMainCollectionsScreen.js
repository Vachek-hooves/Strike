import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import TabLayou from '../../components/layout/TabLayou';
import EmptyCollectionCard from '../../components/CreateCollections/EmptyCollectionCard';

const TabMainCollectionsScreen = ({navigation}) => {
  return (
    <TabLayou>
      <View style={styles.container}>
        <Text style={styles.title}>Collection</Text>

    
        <EmptyCollectionCard
          onCreatePress={() =>
            navigation.navigate('StackCreateCollectionScreen')
          }
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StackAllCollectionsScreen')}>
          <Text style={styles.buttonText}>All Collections</Text>
        </TouchableOpacity>
      </View>
    </TabLayou>
  );
};

export default TabMainCollectionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
