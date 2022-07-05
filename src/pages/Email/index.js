
import React, { useEffect, useState, useContext } from 'react';
import {
  FlatList, Keyboard,
  Linking, Modal, SafeAreaView, StyleSheet, Text,
  TextInput, TouchableOpacity, View, ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header/index';
import firebase from '../../services/firebaseConnection';
import EmailList from '../Email/EmailList';
import { AuthContext } from '../../contexts/auth';

const AnimatableBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function Email() {

  const [open, setOpen] = useState(false);
  const [newProvider, setNewProvider] = useState('');
  const [newMail, setNewMail] = useState('');
  const [newEmpresa, setNewEmpresa] = useState('');
  const [key, setKey] = useState('');
  const [email, setEmail] = useState([]);

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  useEffect(() => {

    async function loadMail() {
      await firebase.database().ref('mail').child(uid).on('value', (snapshot) => {
        setEmail([]);

        snapshot.forEach((childItem) => {
          let data = {
            key: childItem.key,
            email: childItem.val().email,
            empresa: childItem.val().empresa,
            fornecedor: childItem.val().fornecedor
          };
          setEmail(oldArray => [...oldArray, data].reverse());
        })
      });
    }
    loadMail();
  }, []);

  async function handleAdd() {
    if (newMail, newEmpresa, newProvider !== '') {

      if (key !== '') {

        let uid = await firebase.auth().currentUser.uid;
        await firebase.database().ref('mail').child(uid).child(key).update({
          key: key,
          email: newMail,
          empresa: newEmpresa,
          fornecedor: newProvider
        });
        Keyboard.dismiss();
        setNewMail('');
        setNewEmpresa('');
        setKey('');
        setNewProvider('');
        setOpen(false);
        return;
      }
      let mail = await firebase.database().ref('mail').child(uid).push().key;
      await firebase.database().ref('mail').child(uid).child(mail).set({
        email: newMail,
        empresa: newEmpresa,
        fornecedor: newProvider
      });

      Keyboard.dismiss();
      setNewMail('');
      setNewEmpresa('');
      setNewProvider('');
      setKey('');
      setOpen(false);

    }
  }

  async function handleDelete() {
    await firebase.database().ref('mail').child(uid).child(key).remove();
    setOpen(false);
  }

  function handleEdit(data) {
    setNewMail(data.email);
    setNewEmpresa(data.empresa);
    setNewProvider(data.fornecedor);
    setKey(data.key);
    setOpen(true);
  }

//criar uma função para abrir o modal do email
// para cancelar as strings ja existentes nela

function OpenMail(){
  setOpen(true);
  setNewProvider('');
  setNewEmpresa('');
  setNewMail('');

}


  return (
    <View style={styles.container}>

      <View style={styles.head}>
        <Text style={styles.title}>Seus Fornecedores</Text>
        <Header />
      </View>

      <View style={styles.contBtn}>
        <TouchableOpacity
          style={styles.btnEmail}
          onPress={() => {
            Linking.openURL('mailto:');
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.txt}>Ir para o seu Email</Text>
            <Icon style={{ paddingLeft: 15 }} name="mail-outline" size={30} color='#FC1423' />
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        marginHorizontal={20}
        showsVerticalScrollIndicator={false}
        duration={800}
        data={email}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <EmailList data={item}
            editItem={handleEdit}
          />
        )}
      />

      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Icon style={{ marginLeft: 5, marginRight: 5 }} name="md-arrow-back" size={35} color="#2ADC5C" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Fornecedores</Text>
            </View>

            <Animatable.View
              animation="fadeInUp"
              style={styles.modalBody}>

              <View>
                <Text style={styles.txtInput}>Nome da Manutenção</Text>
                <TextInput
                  multiline={true}
                  duration={1000}
                  useNativeDriver
                  placeholderTextColor="#747474"
                  placeholder="Ex: Extintores"
                  style={styles.input}
                  value={newProvider}
                  onChangeText={(texto) => setNewProvider(texto)}
                />

                <Text style={styles.txtInput}>Empresa</Text>
                <TextInput
                  multiline={true}
                  duration={1000}
                  useNativeDriver
                  placeholderTextColor="#747474"
                  placeholder="Ex: Ms Systemas"
                  style={styles.input}
                  value={newEmpresa}
                  onChangeText={(texto) => setNewEmpresa(texto)}
                />

                <Text style={styles.txtInput}>Email do seu fornecedor</Text>
                <TextInput
                  multiline={true}
                  duration={1000}
                  useNativeDriver
                  placeholderTextColor="#747474"
                  placeholder="Ex: msystemas@gmail.com"
                  style={styles.input}
                  value={newMail}
                  onChangeText={(texto) => setNewMail(texto)}
                />
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity style={styles.excBtn} onPress={handleDelete} >
                  <Text style={styles.addText}>Excluir</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addBtn} onPress={handleAdd} >
                  <Text style={styles.addText}>Concluído!</Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <AnimatableBtn
        style={styles.fab}
        useNativeDriver
        animation="bounceInUp"
        duration={800}
        onPress={OpenMail} 
      >
        <Icon name="mail-outline" size={32} color="#FFF" />
      </AnimatableBtn>

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

  contBtn: {
    alignItems: 'center',
    paddingBottom: 5
  },

  btnEmail: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#DCDCDC',
    height: 60,
    width: 250,
    borderRadius: 12,
  },

  txt: {
    fontSize: 17.5,
    fontWeight: '700',
    flexDirection: 'row'
  },

  fab: {
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

  modal: {
    flex: 1,
    backgroundColor: '#DCDCDC'
  },

  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },

  modalTitle: {
    marginLeft: 15,
    fontSize: 22,
    color: '#000',
    fontWeight: '700',

  },

  modalBody: {
    marginTop: 15,
  },

  input: {
    fontSize: 15,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#FFF',
    padding: 10,
    height: 65,
    color: '#000',
    borderRadius: 12,
    elevation: 1.5
  },

  buttons: {
    paddingHorizontal: 21,
    flexDirection: 'row'
  },

  excBtn: {
    backgroundColor: '#FF4000',
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 60,
    height: 46,
    width: 100,
    borderRadius: 12,
    elevation: 1.5,
    marginBottom: 20
  },

  addBtn: {
    backgroundColor: '#2ADC5C',
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 60,
    height: 46,
    width: 100,
    borderRadius: 12,
    elevation: 1.5,
    marginBottom: 20
  },

  addText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF'
  },

  txtInput: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 25,
    marginTop: 10
  },

  scrollView: {
    flex: 1,
    marginHorizontal: 0
  }


});



