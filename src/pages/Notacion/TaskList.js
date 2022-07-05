import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';

import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/Ionicons';

export default function TaskList({data, deleteItem, editItem}) {
 return (                               
        <Animatable.View 
        style={styles.container}
        animation="bounceIn"
        useNativeDriver
        >
          <View>
            <TouchableOpacity 
            onPress={() => deleteItem(data.key)}>
                <Icon style={styles.trash} name="trash" color="#696969" size={26} />
            </TouchableOpacity>
          </View>

          <View>               
            <TouchableOpacity 
            onPress={() => editItem(data)}>
              <Text style={styles.task}>{data.nome}</Text> 
              <Text style={{color: '#696969', marginLeft: 95, fontSize: 12, marginTop: 5}}>
                Toque para editar
              </Text>
            </TouchableOpacity>   
          </View>
        
        </Animatable.View>   

  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin: 4,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    borderRadius: 12,
    padding: 7,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 3,
    shadowOffset: {
      width: 1,
      height: 3
    }
  },

  task: {
    color: '#000',
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 25,
  },

  trash: {
    top: 0,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',    
    bottom: 150,
  },

});


