import React from 'react';
import { View,TouchableWithoutFeedback, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';


export default function Header() {
    const navigation = useNavigation();

 return (
   <View style={styles.container}>
       <TouchableWithoutFeedback style={styles.btnMenu} onPress={ () => navigation.toggleDrawer()}>
           <Icon name="menu" color="#FFF" size={28}/>
       </TouchableWithoutFeedback>
   </View>
  );
}
const styles = StyleSheet.create({
    container:{
        alignSelf:'flex-start',
        marginLeft:25,
        width: 100,
        top: -23        
    },

});