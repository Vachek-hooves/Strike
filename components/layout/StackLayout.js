import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const StackLayout = ({children}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {children}
      </SafeAreaView>
    </View>
  )
}

export default StackLayout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  safeArea: {
    flex: 1,
  },
})
