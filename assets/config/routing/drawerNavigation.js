import React, { useEffect, useState } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

// import { ContactStackNavigator } from "./StackNavigator";
// import TabNavigator from "./TabNavigator";
// import AppRouter from './stackNavigator';
import Hotels from '../../../screens/hotels';
import Profile from '../../../screens/profile';
import MyBookings from '../../../screens/myBookings';
import { Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StackNavigator from './stackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {


  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{
          title: 'HotelToNight',
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="Hotels"
        component={Hotels}
        options={{ title: 'Hotels' }}
      />
      <Drawer.Screen
        name="Mybookings"
        component={MyBookings}
        options={{ title: 'My Bookings' }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profile' }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
