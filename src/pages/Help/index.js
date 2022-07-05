import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Header from '../../components/Header/index';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Help() {
  return (
    <View style={styles.container}>

      <View style={styles.head}>
        <Text style={styles.title}>Ajuda e Suporte</Text>
        <Header />
      </View>

      <View style={styles.presents}>
        <Text style={styles.txtPresent}>Precisa de ajuda em alguma coisa?{'\n'}
          Entre em contato pelas plataformas de comunicação. {'\n'}
        </Text>
      </View>


      <View style={styles.viewArq}>
        <TouchableOpacity style={styles.btnArq}
        >
          <Text style={styles.txtArq}>WhatsApp</Text>
          <View style={styles.logo}>
            <Icon name="logo-whatsapp" size={38} color="#25d366" />
          </View>
        </TouchableOpacity>
      </View>


      <View style={styles.viewArq}>
        <TouchableOpacity style={styles.btnArq}>
          <Text style={styles.txtArq}>Telegram</Text>
          <View style={styles.logo}>
            <Icon name="paper-plane" size={38} color="#0088cc" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.viewArq}>
        <TouchableOpacity style={styles.btnArq}>
          <Text style={styles.txtArq}>E-mail</Text>
          <View style={styles.logo}>
            <Icon name="mail" size={38} color="#c71610" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.call}>
        <Text style={styles.Txtcall}>Ou ligue (61) 98182-3244.</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  head: {
    alignItems: 'center',
    backgroundColor: '#2ADC5C',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 60
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
    height: 30,
    color: '#FFF',
    top: 4,
  },

  presents: {
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 5
  },

  txtPresent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000'
  },

  viewArq: {
    marginTop: 25,
    alignItems: 'center',
  },

  btnArq: {
    backgroundColor: '#DCDCDC',
    width: 220,
    height: 65,
    borderRadius: 12,
    elevation: 1.8,
  },

  txtArq: {
    marginTop: 22,
    marginLeft: 25,
    fontSize: 17,
    fontWeight: '700',
  },

  call: {
    alignItems: 'center',
    marginTop: 35,
  },

  Txtcall: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000'
  },

  logo:{
    alignSelf: 'flex-end',
    top: -30,
    marginRight: 20
  }

});

