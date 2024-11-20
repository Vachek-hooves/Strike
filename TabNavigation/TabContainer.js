import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  TabAchievScreen,
  TabMainCollectionsScreen,
  TabUserScreen,
} from '../screen/tab';
import {useEffect, useState} from 'react';
import {TouchableOpacity, Text,AppState,StyleSheet,} from 'react-native';
import { toggleBackgroundMusic,setupPlayer,pauseBackgroundMusic,playBackgroundMusic } from '../config/sound/setPlay';

const Tab = createBottomTabNavigator();

const NillComponent = () => null;

const TabContainer = () => {
  const [isPlayMusic, setIsPlayMusic] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && isPlayMusic) {
        playBackgroundMusic();
      } else if (nextAppState === 'inactive' || nextAppState === 'background') {
        pauseBackgroundMusic();
      }
    });
    const initMusic = async () => {
      await setupPlayer();
      await playBackgroundMusic();
      setIsPlayMusic(true);
    };
    initMusic();

    return () => {
      subscription.remove();
      pauseBackgroundMusic();
    };
  }, []);

  const handlePlayMusicToggle = () => {
    const newState = toggleBackgroundMusic();
    setIsPlayMusic(newState);
  };

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
      }}>
      <Tab.Screen
        name="Profile"
        component={TabUserScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person" size={46} color={color} />
          ),
        }}
      />
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
        name="Play"
        component={NillComponent}
        options={{
          tabBarLabel: 'Play',
          tabBarIcon: () => (
            <TouchableOpacity onPress={handlePlayMusicToggle}>
              <Icon
                name="play"
                size={46}
                color={isPlayMusic ? '#0A84FF' : '#ff0000'}
              />
            </TouchableOpacity>
          ),
          // tabBarButton: (props) => (
          //   <TouchableOpacity
          //     {...props}
          //     onPress={handleSoundToggle}
          //     style={{
          //       flex: 1,
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //       marginTop: 10,
          //     }}>
          //     <Icon
          //       name="play"
          //       size={46}
          //       color={isSoundOn ? '#0A84FF' : '#ff0000'}
          //     />
          //     <Text
          //       style={{
          //         color: isSoundOn ? '#0A84FF' : '#ff0000',
          //         fontSize: 12,
          //         marginTop: 4,
          //       }}>
          //       Sound
          //     </Text>
          //   </TouchableOpacity>
          // ),
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
            color: isPlayMusic ? '#0A84FF' : '#ff0000',
          },
        }}
        listeners={{tabPress: e => e.preventDefault()}}
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
  },
});

export default TabContainer;
