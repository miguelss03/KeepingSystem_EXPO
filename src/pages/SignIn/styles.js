import styled from 'styled-components/native';

export const Background = styled.View`
flex:1;
background-color: #FFF;
`;

export const Container = styled.KeyboardAvoidingView`
flex:1;
align-items:center;
justify-content: center;
`;

export const Logo = styled.Image`
margin-bottom: 45px;
height: 180;
width: 180;
`;

export const AreaInput = styled.View`
flex-direction: row;

`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#696969',
    textAlign: 'center',
})`
background: #FFF;
width: 68%;
height: 58%;
font-size: 17px;
color: #000000;
margin-bottom: 15px;
padding: 10px;
border-radius: 22px;
border: #D3D3D3;
border: 1.3px;
border-color: #696969

`;

export const SubmitButton = styled.TouchableOpacity`
align-items: center;
justify-content: center;
background-color: #2ADC5C;
width: 68%;
height: 44.9px;
border-radius: 22px;
margin-top: 7px;
`;

export const SubmitText = styled.Text`
font-size:19px;
color: #FFF;
`;

export const Link = styled.TouchableOpacity`
margin-top: 5px;
margin-bottom: 9px;
`;

export const LinkText = styled.Text`
    color: #000;
    margin-top: 25px;
    font-size: 15px;
`;