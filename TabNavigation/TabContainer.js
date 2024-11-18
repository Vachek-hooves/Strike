import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabCreateCollection, TabMainCollectionsScreen} from '../screen/tab';
const Tab = createBottomTabNavigator();

const TabContainer = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="TabMainCollectionsScreen" component={TabMainCollectionsScreen} />
      <Tab.Screen name="TabCreateCollection" component={TabCreateCollection} />
    </Tab.Navigator>
  );
};

export default TabContainer;
