import React, {useState, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import {Text} from 'react-native';

import { Background, Container, Logo,
         AreaInput, Input, SubmitButton, 
         SubmitText, Link, LinkText } from './styles';

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const { signIn } = useContext(AuthContext);


  function handleLogin(){
    signIn(email, password);
  }

 return (
   <Background>
     <Container>
       <Logo source={require('../../../assets/ksy_logo2.jpeg')} />

      <Text style={{fontSize: 20, fontWeight: 'bold' , 
      marginBottom: 10, top: -15, color: '#000111'}}>
        Bem-Vindo ao Keeping System
      </Text>


      <AreaInput>
        <Input
        placeholder="Email"
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
        />
      </AreaInput>

      <AreaInput>
        <Input
        placeholder="Senha"
        autoCorrect={false}
        autoCapitalize="none"
        value={password}
        onChangeText={(text) => setPassword(text)}
        />
      </AreaInput>

      <SubmitButton onPress={handleLogin}>
        <SubmitText>Acessar</SubmitText>
      </SubmitButton>

      <Link onPress={ () => navigation.navigate('SignUp')}>
        <LinkText>Criar uma conta!</LinkText>
      </Link>

     </Container>
   </Background>
  );
}