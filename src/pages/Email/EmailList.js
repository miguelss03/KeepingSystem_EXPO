
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, 
  TouchableWithoutFeedback, Linking } from 'react-native';

import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/Ionicons';

export default function EmailList({ data,  editItem, touchTable }) {
  return (
    <Animatable.View
      animation="bounceIn"
      useNativeDriver
    >

      <View style={styles.labelTitle}>      
        <Text style={styles.nameLabel}>{data.fornecedor}</Text>
        <View style={styles.edit}>
          <TouchableOpacity
            onPress={() => editItem(data)}>
            <Icon name="create-outline" color="#F0F0F0" size={28} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={() => {
        Linking.openURL(`mailto:${data.email}`)
      }}>
        <View style={styles.containerList}>
          <Text style={styles.empres}>{data.empresa}</Text>
          <Text style={styles.mail}>{data.email}</Text>
          <Text style={{ color: '#363636', marginLeft: 95, fontSize: 12, marginTop: 5 }}>
            Ir ao Email do fornecedor
              </Text>
        </View>
      </TouchableWithoutFeedback>


    </Animatable.View>

  );
}
const styles = StyleSheet.create({

  labelTitle: {
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: '#FC1423',
    marginLeft: 8,
    marginRight: 8.1,
    height: 50,
    top: 8,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    elevation: 1
  },

  nameLabel: {
    alignSelf: 'center',
    top: 14,
    fontSize: 20,
    color: '#FFF',
    fontWeight: '700',
  },

  containerList: {
    flex: 1,
    margin: 8,
    height: 100,
    backgroundColor: '#FFFAFA',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 1
  },

  empres: {
    marginTop: 10,
    paddingLeft: 15,
    fontSize: 16.5,
    fontWeight: '700',
    flexDirection: 'row',
    color: '#000',
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 5,
    paddingBottom: 5,
    elevation: 0.5
  },

  mail: {
    paddingLeft: 15,
    fontSize: 16.5,
    fontWeight: '700',
    flexDirection: 'row',
    color: '#000',
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 5,
    paddingBottom: 5,
    elevation: 0.5
  },


  edit: {
    alignSelf: 'flex-end',
    marginRight: 12,
    bottom: 25,
    top: -15


  }

});

/**
 * container:{
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    borderRadius: 12,
    padding: 7,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 3,
    shadowOffset: {
      width: 1,
      height: 3
    }
  },

 */