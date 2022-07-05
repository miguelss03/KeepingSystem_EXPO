import React, { useEffect, useState, useContext } from 'react';
import {
  FlatList, StatusBar, Keyboard, Modal, SafeAreaView,
  StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header/index';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import PageList from '../Home/PageList';
import { format, isBefore } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Home() {

  const [open, setOpen] = useState(false);
  const [newDescri, setNewDescri] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [key, setKey] = useState('');
  const [home, setHome] = useState([]);

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  useEffect(() => {
    async function loadFeed() {
      await firebase.database().ref('evento').child(uid).on('value', (snapshot) => {
        setHome([]);

        snapshot.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome,
            descri: childItem.val().descri,
            day: childItem.val().day,
            hour: childItem.val().hour
          };
          setHome(oldArray => [...oldArray, data].reverse());
        })
      });
    }
    loadFeed();
  }, []);

  async function handleAdd() {
    if (newDescri, newTitle !== '') {
      if (key !== '') {

        let uid = await firebase.auth().currentUser.uid;
        await firebase.database().ref('evento').child(uid).child(key).update({
          key: key,
          nome: newTitle,
          descri: newDescri,
          day: format(date, 'dd/MM/yyyy'),
          hour: format(time, 'HH:mm')
        });

        Keyboard.dismiss();
        setNewDescri('');
        setNewTitle('');
        setOpen(false);
        return;
      }

      let evento = await firebase.database().ref('evento').child(uid).push().key;
      await firebase.database().ref('evento').child(uid).child(evento).set({
        nome: newTitle,
        descri: newDescri,
        day: format(date, 'dd/MM/yyyy'),
        hour: format(time, 'HH:mm')
      });

      Keyboard.dismiss();
      setNewDescri('');
      setNewTitle('');
      setOpen(false);
      return;

    }

  }

  function handleEdit(data) {
    setNewTitle(data.nome);
    setNewDescri(data.descri);
    setKey(data.key);
    setOpen(true);
  }

  async function handleDelete() {
    await firebase.database().ref('evento').child(uid).child(key).remove();
    setOpen(false);
  }


  ////Data e hora
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const currentTime = selectedDate || time;

    setShow(Platform.OS === 'ios');
    setShowTwo(Platform.OS === 'ios');
    setDate(currentDate);
    setTime(currentTime);
  }

  const showMode = () => {
    setShow(true);
    setShowTwo(true);
  };

  function showDate() {
    showMode('date');
    setShowTwo(false);
  }

  function showTime() {
    setShowTwo(true);
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.head}>
        <Text style={styles.title}>Keeping System</Text>
        <Header />
      </View>

      <FlatList
        marginHorizontal={20}
        showsVerticalScrollIndicator={false}
        duration={500}
        data={home}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <PageList data={item}
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
            <Text style={styles.modalTitle}>Editar Evento</Text>
          </View>

          <Animatable.View
            animation="fadeInUp"
            style={styles.modalBody}>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}
            >
              <View>
                <Text style={styles.txtInput}>Título</Text>
                <TextInput
                  multiline={true}
                  duration={1000}
                  useNativeDriver
                  placeholderTextColor="#747474"
                  placeholder="Ex: Extintores"
                  style={styles.input}
                  value={newTitle}
                  onChangeText={(texto) => setNewTitle(texto)}
                />

                <Text style={styles.txtInput}>Descrição</Text>
                <TextInput
                  multiline={true}
                  duration={1000}
                  useNativeDriver
                  placeholderTextColor="#747474"
                  placeholder="Ex: Ms Systemas"
                  style={styles.input}
                  value={newDescri}
                  onChangeText={(texto) => setNewDescri(texto)}
                />

                {show && (
                  <DateTimePicker
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                  />
                )}
                <View>
                  <TouchableOpacity
                    style={styles.inputDate}
                    onPress={showDate}
                  >
                    <View style={styles.logos}>
                      <Icon name="calendar" size={20} color="#696969" />
                      <Text style={styles.datetimeText}>
                        {format(date, 'dd/MM/yyyy')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {showTwo && (
                  <DateTimePicker
                    value={time}
                    mode='time'
                    display='default'
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
                <View>
                  <TouchableOpacity
                    style={styles.inputTime}
                    onPress={showTime}
                  >
                    <View style={styles.logos}>
                      <Icon name="time" size={20} color="#696969" />
                      <Text style={styles.datetimeText}>
                        {format(time, 'HH:mm')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity style={styles.excBtn} onPress={handleDelete} >
                  <Text style={styles.addText}>Excluir</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addBtn} onPress={handleAdd} >
                  <Text style={styles.addText}>Concluído!</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </Animatable.View>

        </SafeAreaView>
      </Modal>



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
    height: 60,
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


  ///estilos modal


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
    marginTop: 50,
    marginBottom: 80
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
    marginTop: 50,
    marginBottom: 80
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

  ViewDays: {
    marginTop: 10,
    marginLeft: 35,
  },

  days: {
    color: '#000',
    backgroundColor: '#FFFAFA',
    height: 50,
    padding: 15,
    marginTop: 5,
    width: 340,
    borderRadius: 10,
    fontSize: 14.5,
    fontWeight: '700',
    elevation: 1.8
  },

  inputDate: {
    marginTop: 20,
    marginLeft: 20,
    width: 140,
    backgroundColor: '#FFF',
    padding: 10,
    height: 45,
    borderRadius: 12,
    elevation: 0.5
  },

  inputTime: {
    marginTop: 10,
    marginLeft: 20,
    width: 140,
    backgroundColor: '#FFF',
    padding: 10,
    height: 45,
    borderRadius: 12,
    elevation: 0.5
  },

  logos: {
    flexDirection: 'row'
  },

  datetimeText: {
    marginLeft: 10
  }
});
