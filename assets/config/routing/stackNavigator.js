// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Hotels from '../../../screens/hotels';
import Login from '../../../screens/login';
import Signup from '../../../screens/signup';
import {useDispatch, useSelector} from 'react-redux';
import BookHotel from '../../../screens/bookHotel';
import Payment from '../../../screens/payment';
import OnBoardingScreen from '../../../screens/onBoardingScreen';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  const reducerData = useSelector(data => data);

  return (
      <Stack.Navigator>
        {/* <Stack.Screen name="BoradingScreen" component={OnBoardingScreen} options={{headerShown:false}} /> */}
        <Stack.Screen name="Hotelss" component={Hotels} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}} />
        <Stack.Screen name="BookHotel" component={BookHotel} options={{headerShown:false}} />
        <Stack.Screen name="Payment" component={Payment} options={{headerShown:false}} />
      </Stack.Navigator>
  );
}

export default StackNavigator;
