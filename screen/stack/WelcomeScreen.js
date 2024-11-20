import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
  const navigation = useNavigation()
  const titleAnim = useRef(new Animated.Value(-200)).current
  const subtitleAnim = useRef(new Animated.Value(200)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start()

    const timer = setTimeout(() => {
      navigation.replace('Tab')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#003399', '#0055FF', '#93C5FD', '#0055FF', '#003399']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.3, 0.5, 0.7, 1]}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <Animated.Text 
            style={[
              styles.title,
              {
                transform: [{ translateY: titleAnim }]
              }
            ]}
          >
            Rare{'\n'}Collections
          </Animated.Text>
          
          <Animated.Text 
            style={[
              styles.subtitle,
              {
                transform: [{ translateY: subtitleAnim }]
              }
            ]}
          >
            Strike Win
          </Animated.Text>
        </View>
      </LinearGradient>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 56,
  },
  subtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontStyle: 'italic',
    opacity: 0.9,
  },
})