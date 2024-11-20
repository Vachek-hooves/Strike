import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

const EmptyCollectionCard = ({ onCreatePress }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    floatingAnimation.start();

    // Cleanup animation on component unmount
    return () => floatingAnimation.stop();
  }, []);

  const yOffset = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20], // Adjust this value to control float height
  });

  return (
    <View style={styles.cardContainer}>
      <View style={styles.emptyStateContainer}>
        <Animated.Image 
          source={require('../../assets/image/box.png')}
          style={[
            styles.emptyStateImage,
            {
              transform: [{ translateY: yOffset }]
            }
          ]}
        />
        <Text style={styles.emptyStateTitle}>There's nothing here yet</Text>
        <Text style={styles.emptyStateSubtitle}>
          Tap on the button to create a collection
        </Text>
        
        <TouchableOpacity 
          style={styles.createButton}
          onPress={onCreatePress}
        >
          <Text style={styles.buttonText}>Create a collection</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmptyCollectionCard;

const styles = StyleSheet.create({
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
});