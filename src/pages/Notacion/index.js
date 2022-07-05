import React, { useState, useEffect, useContext } from 'react';
import {
  View, SafeAreaView, Text, StyleSheet,
  FlatList, TouchableOpacity, Modal, TextInput, Keyboard, Alert, StatusBar} from 'react-native';
import TaskList from '../Notacion/TaskList';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../../services/firebaseConnection';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../contexts/auth';

const AnimatableBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function Notacion() {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [key, setkey] = useState('');

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  useEffect(() => {
    async function loadTasks() {
      await firebase.database().ref('tarefas').child(uid).on('value', (snapshot) => {
        setTasks([]);

        snapshot.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          };
          setTasks(oldArray => [...oldArray, data].reverse());
        });
      });
    }
    loadTasks();
  }, []);


  async function handleAdd() {
    if (newTask !== '') {

      if (key !== '') {

        let uid = await firebase.auth().currentUser.uid;
        await firebase.database().ref('tarefas').child(uid).child(key).update({
          nome: newTask,
        });
        Keyboard.dismiss();
        setNewTask('');
        setkey('');
        setOpen(false);
        return;
      }

      let tarefas = await (await firebase.database().ref('tarefas').child(uid).push()).key;
      await firebase.database().ref('tarefas').child(uid).child(tarefas).set({
        nome: newTask
      });

      Keyboard.dismiss();
      setNewTask('');
      setOpen(false);
    }
  }


  async function handleDelete(key) {
    await firebase.database().ref('tarefas').child(uid).child(key).remove();
  }

  function handleEdit(data) {
    setNewTask(data.nome);
    setkey(data.key);
    setOpen(true);

  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"/>
      <View style={styles.content}>
        <Text style={styles.title} >Minhas Anotações</Text>
      </View>

      <FlatList
        marginHorizontal={20}
        showsVerticalScrollIndicator={false}
        duration={800}
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TaskList data={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
        )}
      />

      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Icon style={{ marginLeft: 5, marginRight: 5 }} name="md-arrow-back" size={35} color="#2ADC5C" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nova Nota</Text>
          </View>

          <Animatable.View
            animation="fadeInUp"
            style={styles.modalBody}>

            <TextInput
              multiline={true}
              duration={1000}
              useNativeDriver
              placeholderTextColor="#747474"
              placeholder="Criar novo texto..."
              style={styles.input}
              value={newTask}
              onChangeText={(texto) => setNewTask(texto)}
            />

            <TouchableOpacity style={styles.addBtn} onPress={handleAdd} >
              <Text style={styles.addText}>Adicionar</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>
      </Modal>

      <AnimatableBtn
        style={styles.fab}
        useNativeDriver
        animation="bounceInUp"
        duration={800}
        onPress={() => setOpen(true)}
      >
        <Icon name="ios-add" size={32} color="#FFF" />
      </AnimatableBtn>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  content: {
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
    marginTop: 25,
    backgroundColor: '#FFF',
    padding: 9,
    height: 150,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 12,
    elevation: 1.5
  },

  addBtn: {
    backgroundColor: '#2ADC5C',
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 250,
    marginRight: 20,
    height: 46,
    borderRadius: 12,
    elevation: 1.5
  },

  addText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF'
  }

});


