import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Hotels from "../../../screens/hotels";
import StackNavigator from "./stackNavigator";
import MyBookings from "../../../screens/myBookings";
import Profile from "../../../screens/profile";

const Drawer = createDrawerNavigator();

function AuthStack() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Boarding Screen" component={StackNavigator} options={{
                title: 'HotelToNight',
                drawerItemStyle: { display: 'none' },
                headerShown: false
            }} />
            <Drawer.Screen name="Hotels" component={Hotels} />
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
    )
}
export default AuthStack;