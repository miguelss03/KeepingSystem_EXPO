
/**
 * CRIAR UM CAMINHO EM STACK A PARTIR DOS DOCUMENTOS PRINCIPAIS DA MIDIA
 * 
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Midia() {
  const navigation = useNavigation();

  function goToPhotos() {
    navigation.navigate('Photos');
  }

  function goToDocs() {
    alert("Função 'Documentos' não criada, em breve será atualizado")
  }

  return (
    <View style={styles.grandContainer}>

      <View style={styles.viewArq}>
        <TouchableOpacity
          onPress={goToPhotos}
          style={styles.btnArq}
        >
          <Text style={styles.txtArq}>Fotos</Text>
          <View style={{ marginLeft: 230, alignItems: 'center', top: -22 }}>
            <Icon name="camera" size={28} color="#000" />
          </View>
        </TouchableOpacity>
      </View>


      <View style={styles.viewArq}>
        <TouchableOpacity
          onPress={goToDocs}
          style={styles.btnArq}>
          <Text style={styles.txtArq}>Documentos</Text>
          <View style={{ marginLeft: 230, alignItems: 'center', top: -21 }}>
            <Icon name="documents" size={28} color="#000" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => { }}
          style={styles.btnCamera}>
          <Icon name="camera" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  grandContainer: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  header: {
    alignItems: 'center',
    backgroundColor: '#2ADC5C',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 60
  },

  title: {
    fontSize: 23,
    fontWeight: '700',
    marginTop: 15,
    height: 52.9,
    color: '#FFF'
  },

  viewArq: {
    marginTop: 45,
    alignItems: 'center',
  },

  btnArq: {
    backgroundColor: '#DCDCDC',
    width: 300,
    height: 65,
    borderRadius: 12,
    elevation: 6,
    zIndex: 9,
  },

  txtArq: {
    marginTop: 22,
    marginLeft: 25,
    fontSize: 17,
    fontWeight: '700',
  },

  btnCamera: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#2ADC5C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    }

  },

});















