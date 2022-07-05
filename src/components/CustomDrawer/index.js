import React, {useContext} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { AuthContext } from '../../contexts/auth';

export default function CustomDrawer(props) {
    const {user} = useContext(AuthContext);

 return (
   <DrawerContentScrollView {...props}>
       <View style={styles.container}>
        <Image
        source={require('../../../assets/ksy_logo2.jpeg')}
        style={{width: 85, height: 90}}
        resizeMode="contain"
        />

        <Text style={{fontSize: 18, marginTop: 10}}>
            Bem-vindo
        </Text>

        <Text style={styles.nameUser}>
            {user && user.nome}
        </Text>
       </View>       

    <DrawerItemList {...props}/>
       
   </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
    
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25
    },

    nameUser:{
        color: '#000',
        fontSize:18,
        fontWeight: 'bold',
        paddingBottom: 25
    }

});