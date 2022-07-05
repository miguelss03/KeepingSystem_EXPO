
import React, { useState, useEffect, useContext } from 'react';
import {
  FlatList, Image, View, Modal, ScrollView,
  TextInput, TouchableOpacity, Text, StyleSheet, Keyboard
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import PhotoList from './PhotoList';
import { AuthContext } from '../../../contexts/auth';

export default function Photos() {
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(true);
  const [word, setWord] = useState('');
  
  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [6, 5],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    setOpen(true);
  };


  function handleAdd() {
    alert('meu ovo');
  }

  return (
    <View style={styles.container}>

      <View style={styles.contAdd}>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={pickImage}
        >
          <Text>Adicionar fotos do album</Text>
        </TouchableOpacity>
      </View>

      {
        image &&
        <Modal animationType="slide" transparent={false} visible={open}>
          <ScrollView>
            <View style={styles.modal}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setOpen(false)}>
                  <Icon style={{}} name="md-arrow-back"
                    size={35} color="#2ADC5C" />
                </TouchableOpacity>
              </View>
              <Image
                source={{ uri: image }}
                style={{
                  width: 350, height: 400,
                  marginLeft: 5, borderRadius: 10
                }} />

              <Text style={styles.txtTitle}>
                Titulo da imagem
              </Text>

              <TextInput
                style={styles.txtInput}
                placeholder="Digite aqui..."
                underlineColorAndroid="transparent"
                multiline={true}
                value={word}
                onChangeText={(texto) => setWord(texto)}
              />

              <TouchableOpacity
                style={styles.BtnAdd}
                onPress={handleAdd}>
                <Text style={styles.BtnTxt}>Salvar</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </Modal>
      }


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },

  contAdd: {
    paddingBottom: 5
  },

  modal: {
    flex: 1,
  },

  modalHeader: {
    marginLeft: 10,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },

  btnAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
    height: 60,
    width: 200,
    borderRadius: 12,
  },

  txtInput: {
    marginHorizontal: 10,
    backgroundColor: '#DCDCDC',
    width: 300,
    height: 50,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 5,
    fontSize: 15.5,
    padding: 10,
    elevation: 0.8

  },

  txtTitle: {
    marginLeft: 10,
    marginTop: 15,
    fontSize: 19,
    fontWeight: '700'
  },

  BtnAdd: {
    backgroundColor: '#2ADC5C',
    justifyContent: 'center',
    alignItems: 'center',
    top: 18,
    height: 46,
    borderRadius: 12,
    elevation: 1,
    marginHorizontal: 10,
    marginBottom: 50
  },

  BtnTxt: {
    fontSize: 17,
    color: '#FFF',
    fontWeight: 'bold'
  },
})


/*




import React, { useState, useEffect } from 'react';
import { Button, Image, View, Modal, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Photos() {
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [6, 5],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function openModal() {
    setOpen(true);
  }

  function saveAll() {
    alert('aaaaaaaaaaaaaaa')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="<- adicionar foto ->" onPress={pickImage} />

      <TouchableOpacity onPress={openModal}>
        {image && <Image source={{ uri: image }} style={{ width: 300, height: 200, borderRadius: 10 }} />}
      </TouchableOpacity>

      <Modal animationType="slide" transparent={false} visible={open}>
        <View >
          <TouchableOpacity onPress={() => setOpen(false)}>
            <Icon style={{ marginLeft: 5 }} name="md-arrow-back"
              size={35} color="#2ADC5C" />
          </TouchableOpacity>
        </View>
        {image && <Image source={{ uri: image }} style={{ width: 350, height: 500, borderRadius: 10 }} />}
      </Modal>


      <TouchableOpacity
        onPress={saveAll}
        style={{ backgroundColor: "#fff000", marginTop: 50 }}>
        <Text style={{ color: "#000", }}>SALVAR TUDO ISSO </Text>
      </TouchableOpacity>
    </View>
  );
}


/*
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
*/