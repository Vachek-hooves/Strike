import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ContextProvider} from './store/context';
import TabContainer from './TabNavigation/TabContainer';
import {
  StackAllCollectionsScreen,
  StackCreateCollectionScreen,
  StackCollectionDetailsScreen,
  StackItemDetailsScreen,
  WelcomeScreen
} from './screen/stack';
import StackCreateCollectionItemScreen from './screen/stack/StackCreateCollectionItemScreen';
import Toast from 'react-native-toast-message';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='Welcome' component={WelcomeScreen}/>
          <Stack.Screen name="Tab" component={TabContainer} />
          <Stack.Screen
            name="StackAllCollectionsScreen"
            component={StackAllCollectionsScreen}
          />
          <Stack.Screen
            name="StackCreateCollectionScreen"
            component={StackCreateCollectionScreen}
          />
          <Stack.Screen
            name="StackCollectionDetailsScreen"
            component={StackCollectionDetailsScreen}
          />
          <Stack.Screen
            name="StackCreateCollectionItemScreen"
            component={StackCreateCollectionItemScreen}
          />
          <Stack.Screen
            name="StackItemDetailsScreen"
            component={StackItemDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </ContextProvider>
  );
}

export default App;
