// In App.js in a new project

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Hotels from '../../../screens/hotels';
import Profile from '../../../screens/profile';
import Login from '../../../screens/login';
import Signup from '../../../screens/signup';
import {useDispatch, useSelector} from 'react-redux';
import BookHotel from '../../../screens/bookHotel';
import Payment from '../../../screens/payment';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AppRouter() {
  const reducerData = useSelector(data => data);

  // console.log('approuter m hon');
  // console.log(reducerData.userLogin);
  return (
    // <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HotelsStack" component={Hotels} options={{headerShown:false}} />
        {/* <Stack.Screen name="Profile" component={Profile}  options={{headerShown:false}} /> */}
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}} />
        <Stack.Screen name="BookHotel" component={BookHotel} options={{headerShown:false}} />
        <Stack.Screen name="Payment" component={Payment} options={{headerShown:false}} />
      </Stack.Navigator>


    // </NavigationContainer>
  );
}

export default AppRouter;
