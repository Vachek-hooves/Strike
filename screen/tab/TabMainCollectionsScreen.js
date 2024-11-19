import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import TabLayou from '../../components/layout/TabLayou'


const TabMainCollectionsScreen = ({navigation}) => {
 
  return (
    <TabLayou>

    <View style={styles.container}>
      <Text style={styles.title}>Collections</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('StackAllCollectionsScreen')}
        >
        <Text style={styles.buttonText}>All Collections</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.createButton]}
        onPress={() => navigation.navigate('StackCreateCollectionScreen')}
        >
        <Text style={styles.buttonText}>Create Collection</Text>
      </TouchableOpacity>
    </View>
        </TabLayou>
  )
}

export default TabMainCollectionsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#0A84FF', // Blue button for Create Collection
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})