import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Hotels from "../../../screens/hotels";
import StackNavigator from "./stackNavigator";

const Drawer = createDrawerNavigator();

function AppStack() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Boarding Screen" component={StackNavigator} options={{
                title: 'HotelToNight',
                drawerItemStyle: { display: 'none' },
                headerShown: false
            }} />
            <Drawer.Screen name="Hotels" component={Hotels} />
        </Drawer.Navigator>
    )
}
export default AppStack;