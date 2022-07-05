////rotas de navegaçao. indica quando o usuário esta logado ou deslogado

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AuthStack = createStackNavigator();

function AuthRoutes(){
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen 
            name="SignIn" 
            component={SignIn}
            options={{headerShown: false}}
            />

            <AuthStack.Screen 
            name="SignUp" 
            component={SignUp}
            options={{
                headerStyle:{
                    borderBottomColor: '#2ADC5C',
                    borderBottomWidth: 2.5,
                    backgroundColor: '#2ADC5C'
                },
                headerTintColor: '#FFF',
                headerBackTitleVisible: false,
                headerTitle: 'Voltar'
            }}
            />
        </AuthStack.Navigator>
    );
}

export default AuthRoutes;
