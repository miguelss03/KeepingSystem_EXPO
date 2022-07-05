import React, {useState, useContext} from 'react';
import { AuthContext } from '../../contexts/auth';
import {Text} from 'react-native';
import { Background, Container, Logo,
         AreaInput, Input, SubmitButton, 
         SubmitText } from '../SignIn/styles';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [nome, setNome] = useState('');
  
  const { signUp } = useContext(AuthContext);

  function handleSignUp(){
    signUp(email, password, nome);
  }

 return (
   <Background>
     <Container>
       <Logo source={require('../../../assets/ksy_logo2.jpeg')} />

        <Text style={{fontSize: 19, fontWeight: 'bold', 
        marginBottom: 10, top: -20,
        color: '#000'
        }}>
          Crie sua conta!
        </Text>

       <AreaInput>
        <Input 
        placeholder="Nome"
        autoCorrect={false}
        autoCapitalize="none"
        value={nome}
        onChangeText={(text) => setNome(text)}
        />
      </AreaInput>

      <AreaInput>
        <Input
        placeholder="E-mail"
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

      <SubmitButton onPress={handleSignUp}>
        <SubmitText>Pronto!</SubmitText>
      </SubmitButton>

     </Container>
   </Background>
  );
}