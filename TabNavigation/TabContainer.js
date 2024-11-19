import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  TabAchievScreen,
  TabMainCollectionsScreen,
  TabUserScreen,
} from '../screen/tab';
const Tab = createBottomTabNavigator();

const TabContainer = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="TabMainCollectionsScreen"
        component={TabMainCollectionsScreen}
      />
      <Tab.Screen name="TabAchievScreen" component={TabAchievScreen} />
      <Tab.Screen name="TabUserScreen" component={TabUserScreen} />
    </Tab.Navigator>
  );
};

export default TabContainer;
