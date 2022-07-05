import React, { useState } from 'react';
import {
  Alert, Keyboard, Modal, Platform,
  StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../../services/firebaseConnection';
import { format, isBefore } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const AnimatableTbn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {

  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newTitle, setNewTitle] = useState('');

  //Relogio e Calendário da Mesma biblioteca
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

  const showDate = () => {
    showMode('date');
    setShowTwo(false);
  }

  function showTime() {
    setShowTwo(true);

  }

  // Salvando no banco de dados a atividade
  async function handleAdd() {
    let uid = await firebase.auth().currentUser.uid;
    let key = await firebase.database().ref('evento').child(uid).push().key;
    await firebase.database().ref('evento').child(uid).child(key).set({
      nome: newTask,
      descri: newTitle,
      day: format(date, 'dd/MM/yyyy'),
      hour: format(time, 'HH:mm')
    });

    Keyboard.dismiss();
    setNewTask('');
    setNewTitle('');
    setOpen(false);
    navigation.navigate('Home');
  }

  function openModal() {
    setOpen(true);
  }

  function createEvent() {
    setOpen(true);
    setDate(new Date())
  }

  return (
    <View style={styles.container}>
      <View style={styles.ViewCalendar}>
        <Text style={styles.txtTitle}>Calendário</Text>
      </View>
      <CalendarPicker
        allowRangeSelection={false}
        todayBackgroundColor="#808080"
        previousTitle="Anterior"
        nextTitle="Próximo"
        mode='date'
        onDateChange={openModal}
        selectedDayStyle="#FFF"
        weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']}
        months={['Janeiro', 'Fevereiro', 'Março', 'Abril',
          'Maio', 'Junho', 'Julho', 'Agosto',
          'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
      />
      <AnimatableTbn
        style={styles.btnNew}
        useNativeDriver
        animation="bounceInUp"
        duration={800}
        onPress={createEvent}
      >
        <Text style={styles.txtEvent}>Criar evento +</Text>
      </AnimatableTbn>

      <Modal animationType="slide" transparent={false} visible={open}>
        <Animatable.View
          animation="fadeInUp"
          style={styles.modal}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Icon style={{ marginLeft: 5 }} name="md-arrow-back"
                  size={35} color="#2ADC5C" />
              </TouchableOpacity>
              <Text style={styles.titleModal}>Evento</Text>
            </View>

            <Text style={{
              marginLeft: 45, marginTop: 18,
              top: 15, fontSize: 19,
              fontWeight: '700', color: '#000'
            }}>Título</Text>

            <TextInput
              style={styles.txtInput}
              placeholder="Ex: Manuteção filtros"
              underlineColorAndroid="transparent"
              multiline={true}
              value={newTask}
              onChangeText={(texto) => setNewTask(texto)}
            />

            <Text style={{
              marginLeft: 45, marginTop: 15,
              fontSize: 19, fontWeight: '700'
            }}>Descrição</Text>

            <TextInput
              style={styles.txtInput2}
              placeholder="Ex: Contactar fornecedor "
              underlineColorAndroid="transparent"
              multiline={true}
              value={newTitle}
              onChangeText={(texto) => setNewTitle(texto)}
            />

            <Text style={{
              marginLeft: 45, marginTop: 15,
              fontSize: 19, fontWeight: '700'
            }}>Selecione a data</Text>

            {show && (
              <DateTimePicker
                value={date}
                mode='date'
                is24Hour={true}
                display='default'
                onChange={onChange}
              />
            )}
            <View style={styles.ViewDays}>
              <TouchableOpacity
                style={styles.days}
                onPress={showDate}
              >
                <Icon name="calendar" size={20} color="#696969" />
                <Text>{` ${format(date, 'dd/MM/yyyy')}`}</Text>
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
            <View style={styles.ViewDays}>
              <TouchableOpacity
                style={styles.days}
                onPress={showTime}
              >
                <Icon name="time" size={20} color="#696969" />
                <Text style={styles.datetimeText}>
                  {` ${format(time, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.BtnAdd}
                onPress={handleAdd}>
                <Text style={styles.BtnTxt}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',

  },

  Txt: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: 15.8,
    fontWeight: '700',
  },


  ViewCalendar: {
    alignItems: 'center',
    backgroundColor: '#2ADC5C',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 60
  },

  txtTitle: {
    fontSize: 23,
    fontWeight: '700',
    marginTop: 15,
    height: 52.9,
    color: '#FFF'
  },

  btnNew: {

    position: 'absolute',
    width: 125,
    height: 50,
    backgroundColor: '#2ADC5C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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

  txtEvent: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '700'
  },

  dayCalendar: {
    marginLeft: 15,
    marginTop: 15,
    backgroundColor: '#F4F4F4',
    borderRadius: 5,
    height: 40,
    width: 245,
    fontSize: 13.5,
    fontWeight: '600',
    color: '#000',

  },




  ///ESTILO MODAL

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

  titleModal: {
    marginLeft: -15,
    fontSize: 22,
    color: '#000',
    fontWeight: '700',
    marginLeft: 18
  },


  txtInput: {
    marginHorizontal: 35,
    backgroundColor: '#FFF',
    width: 300,
    height: 50,
    borderRadius: 10,
    marginTop: 25,
    fontSize: 15.5,
    padding: 10,
    elevation: 1

  },

  txtInput2: {
    marginHorizontal: 35,
    backgroundColor: '#FFF',
    width: 300,
    height: 50,
    borderRadius: 10,
    marginTop: 5,
    fontSize: 15.5,
    padding: 10,
    elevation: 1
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
    width: 160,
    borderRadius: 10,
    fontSize: 14.5,
    fontWeight: '700',
    flexDirection: 'row'

  },

  ViewAdd: {
    alignItems: 'flex-end'
  },

  BtnAdd: {
    backgroundColor: '#2ADC5C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 36,
    top: 18,
    height: 46,
    marginTop: 20,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 50
  },

  BtnTxt: {
    fontSize: 17,
    color: '#FFF',
    fontWeight: 'bold'
  },

  ////Relogio

  dateTimeButton: {
    marginBottom: 10,
    backgroundColor: '#2ADC5C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 36,
    top: 18,
    height: 46,
    width: 186,
    borderRadius: 12,
    elevation: 2,
  },

  datetimeText: {
    color: '#000',
    fontSize: 15

  }



});


