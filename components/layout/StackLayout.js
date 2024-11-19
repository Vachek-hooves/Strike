import {StyleSheet, View, SafeAreaView} from 'react-native';
import ReturnBtn from '../ui/ReturnBtn';

const StackLayout = ({children}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {children}
        {/* <ReturnBtn style={{bottom:50,right:50,marginTop:20}}/> */}
      </SafeAreaView>
      {/* <View style={{height:100,zIndex:100,}}></View> */}
    </View>
  );
};

export default StackLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  safeArea: {
    flex: 1,
  },
});
