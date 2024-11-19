import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const ReturnBtn = ({style}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.returnBtn, style]} onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" size={32} color="#FFFFFF" />
    </TouchableOpacity>
  )
}

export default ReturnBtn

const styles = StyleSheet.create({
  returnBtn: {
    position: 'absolute',
    // right: 50,
    // bottom: 50,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#1C1C1E',
  },
})