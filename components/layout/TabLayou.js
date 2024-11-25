import {StyleSheet, View, SafeAreaView, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TabLayou = ({children,style}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#000B1F', '#000000']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0, 0.5, 1]}
        style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <ImageBackground
            style={styles.imgage}
            source={require('../../assets/bg/bg.png')}>
            {children}
          </ImageBackground>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default TabLayou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
    padding: 16,
  },
  gradient: {
    flex: 1,
  },
  imgage: {
    flex: 1,
  },
});
