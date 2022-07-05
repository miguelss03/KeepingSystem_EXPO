/// controla as rotas e indeque quem está logado
import React, {useContext} from 'react';
import { AuthContext } from '../contexts/auth';
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes(){
    const { signed, loading } = useContext(AuthContext);

    if(loading){
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}} >
                <ActivityIndicator size="large" color="#2ADC5C" />
            </View>
        );
    }

    return(
       signed ? <AppRoutes/> : <AuthRoutes/>
    );
}

export default Routes;  