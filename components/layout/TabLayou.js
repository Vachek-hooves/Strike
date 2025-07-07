import {StyleSheet, View, SafeAreaView, ImageBackground} from 'react-native';

const TabLayou = ({children}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../../assets/bg/bg1.png')}>
          {children}
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

export default TabLayou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    // padding: 16,
  },
  safeArea: {
    flex: 1,
  },
});
