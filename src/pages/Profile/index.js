import React, { useContext } from 'react';
import {
  View, Text, TouchableOpacity,
  Image, StyleSheet, SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header/index';

export default function Profile() {

  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>

      <View style={styles.viewContent}>
        <View style={styles.head}>
          <Text style={styles.title}>Minha conta</Text>
          <Header />
        </View>

        <Image
          source={require('../../../assets/ksy_logo2.jpeg')}
          style={styles.logo}
        />

        <View style={styles.viewName}>
          <Text style={styles.name}>Keeping System</Text>
        </View>

        <View style={styles.viewUser}>
          <View style={styles.User}>
            <Icon name="person-circle-outline"
              color="#808080" size={25} style={{ top: -2 }} />
            <Text style={styles.txtName}>Usuário: {user && user.nome}</Text>
          </View>
          <View style={styles.User}>
            <Icon name="mail" color="#808080" size={25} />
            <Text style={styles.txtName}>Email: {user && user.email}</Text>
          </View>
        </View>

        <View style={styles.viewBtn}>
          <TouchableOpacity style={styles.Btn} onPress={() => signOut()}>
            <Text style={styles.txtBtn}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
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

  logo: {
    alignSelf: 'center',
    marginTop: 25,
    width: 137,
    height: 134
  },

  viewName: {
    justifyContent: 'center',
    marginTop: 34
  },

  name: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 21,
    marginTop: -20,
    fontWeight: 'bold',
  },

  viewUser: {
    alignSelf: 'center',
    marginTop: 50,
  },

  User: {
    flexDirection: 'row',
    paddingVertical: 5
  },

  txtName: {
    fontSize: 18,
    fontWeight: '700'
  },

  viewBtn: {
    alignSelf: 'center',
    marginTop: 60
  },

  Btn: {
    backgroundColor: '#808080',
    width: 170,
    height: 50,
    justifyContent: 'center',
    borderRadius: 12,
  },

  txtBtn: {
    textAlign: 'center',
    fontSize: 17.5,
    fontWeight: '700',
    color: '#FFF'
  },


});

