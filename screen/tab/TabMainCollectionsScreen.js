import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import TabLayou from '../../components/layout/TabLayou'


const TabMainCollectionsScreen = ({navigation}) => {
  return (
    <TabLayou>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Collection</Text>
          
          <View style={styles.cardContainer}>
            <View style={styles.emptyStateContainer}>
              <Image 
                source={require('../../assets/image/box.png')}
                style={styles.emptyStateImage}
              />
              <Text style={styles.emptyStateTitle}>There's nothing here yet</Text>
              <Text style={styles.emptyStateSubtitle}>Tap on the button to create a collection</Text>
              
              <TouchableOpacity 
                style={styles.createButton}
                onPress={() => navigation.navigate('StackCreateCollectionScreen')}
              >
                <Text style={styles.buttonText}>Create a collection</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('StackAllCollectionsScreen')}
          >
            <Text style={styles.buttonText}>All Collections</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TabLayou>
  )
}

export default TabMainCollectionsScreen

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
    minHeight: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
  },
  emptyStateContainer: {
    alignItems: 'center',
  },
  emptyStateImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  createButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})