import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  TabAchievScreen,
  TabMainCollectionsScreen,
  TabUserScreen,
} from '../screen/tab';

const Tab = createBottomTabNavigator();

const TabContainer = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#0A84FF',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
      }}
    >
      <Tab.Screen
        name="Collection"
        component={TabMainCollectionsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="folder" size={46} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Progress"
        component={TabAchievScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="trophy" size={46} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile"
        component={TabUserScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person" size={46} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000000',
    borderTopWidth: 0,
    height: 100,
    paddingBottom: 5,
    
  },
  tabBarItem: {
    paddingTop: 2,
    height: 95,
    // backgroundColor:'red'
  },
  tabLabel: {
    fontSize: 12,
    // marginTop: 3,
  },
  tabBarIcon: {
    // backgroundColor:'red',
    // paddingTop: 6,
    height: 60,
    width: 60,
  }
});

export default TabContainer;
