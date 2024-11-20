import { StyleSheet, Text, View, Animated, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
  const navigation = useNavigation()
  const titleAnim = useRef(new Animated.Value(-200)).current
  const subtitleAnim = useRef(new Animated.Value(200)).current
  const flashScale = useRef(new Animated.Value(0)).current
  const flashOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Text animations
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
    ]).start(() => {
      // After text animations complete, animate the flash
      Animated.sequence([
        Animated.delay(400), // Small delay before flash appears
        Animated.parallel([
          
          Animated.timing(flashScale, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(flashOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ]).start()
    })

    const timer = setTimeout(() => {
      navigation.replace('Tab')
    }, 3000)

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
          <View style={styles.textContainer}>
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

            <Animated.Image 
              source={require('../../assets/ui/flash.png')}
              style={[
                styles.flash,
                {
                  opacity: flashOpacity,
                  transform: [
                    { scale: flashScale },
                    { translateY: -400 } // Adjust this value to position the flash
                  ]
                }
              ]}
              resizeMode="contain"
            />
          </View>
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
  textContainer: {
    alignItems: 'center',
    position: 'relative',
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
  flash: {
    position: 'absolute',
    width: 400, // Adjust size as needed
    height: 600, // Adjust size as needed
    // top: '10%',
    // alignSelf: 'center',
    zIndex: 10,
   
  },
})