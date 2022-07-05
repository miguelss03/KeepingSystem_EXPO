////rotas de navegaçao. indica quando o usuário esta logado ou deslogado
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

/// paginas na navegação tab
import Home from '../pages/Home/index';
import Calendar from '../pages/Calendar/index';
import Notacion from '../pages/Notacion/index';

/// stack navigator
import Photos from '../pages/Midia/Photos/index';
import Roots from '../pages/Midia/Roots/index';

//paginas na navegação drawer
import Email from '../pages/Email/index';
import Profile from '../pages/Profile/index';
import Help from '../pages/Help/index';
import CustomDrawer from '../components/CustomDrawer/index';

const MyStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const icons = {
    Home: {
        name: 'home'
    },
    Calendar: {
        name: 'calendar'
    },
    Notacion: {
        name: 'reader'
    },
    Midia: {
        name: 'grid'
    },
    Profile: {
        name: 'mail'
    }
};

function Stacks() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            drawerStyle={{
                backgroundColor: '#FFF'
            }}
            drawerContentOptions={{
                labelStyle: {
                    fontWeight: '700',
                    fontSize: 15,
                },
                activeTintColor: '#36b224',
                activeBackgroundColor: '#F8F8FF',
                inactiveBackgroundColor: '#FFF',
                inactiveTintColor: '#4F4F4F',
                itemStyle: {
                    marginVertical: 10,
                }
            }}
        >
            <Drawer.Screen name="Início" component={Home} />
            <Drawer.Screen name="Fornecedores" component={Email} />
            <Drawer.Screen name="Minha Conta" component={Profile} />
            <Drawer.Screen name="Ajuda" component={Help} />
        </Drawer.Navigator>

    );
}

function Pilha() {
    return (
        <MyStack.Navigator>
            <MyStack.Screen
                name="Roots"
                component={Roots}
                options={{
                    headerTitle: 'Fotos e Documentos',
                    headerTitleStyle: {
                        fontSize: 23,
                        fontWeight: '700',
                    },
                    headerStyle: {
                        alignItems: 'center',
                        backgroundColor: '#2ADC5C',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        elevation: 0,
                        height: 60,
                    },
                    headerTintColor: '#FFF',
                    headerTitleAlign: 'center',

                }}
            />

            <MyStack.Screen
                name="Photos"
                component={Photos}
                options={{
                    headerTitle: 'Fotos',
                    headerStyle: {
                        alignItems: 'center',
                        backgroundColor: '#2ADC5C',
                        elevation: 3,
                        height: 60,
                    },
                    headerTitleStyle: {
                        fontSize: 23,
                        color: '#000'
                    },

                }}

            />

        </MyStack.Navigator>
    )
}

export default function AppRoutes() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const { name } = icons[route.name];
                    return <Icon name={name} color={color} size={size} />
                }
            })}
            tabBarOptions={{
                style: {
                    backgroundColor: '#2ADC5C'
                },
                activeTintColor: '#FFF',
                inactiveTintColor: '#146E2A',
                showLabel: false
            }}
        >
            <Tab.Screen name="Home" component={Stacks} />
            <Tab.Screen name="Calendar" component={Calendar} />
            <Tab.Screen name="Notacion" component={Notacion} />
            <Tab.Screen name="Midia" component={Pilha} />
        </Tab.Navigator>



    );
}



