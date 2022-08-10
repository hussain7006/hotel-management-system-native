import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AppRouter from './assets/config/routing/appRouter';
// import {Provider} from 'react-redux';

import store from './assets/config/redux/store';
import DrawerNavigator from './assets/config/routing/drawerNavigation';
import {NavigationContainer} from '@react-navigation/native';

import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';

function App() {
  useEffect(() => {
    // database().ref('/users').once('value',(res)=>{console.log(res)})
    // console.log(database());
    // database().ref('/new').set({
    //   username: "test",
    //   email: "test@gmail.com",
    // }).then((res)=>{console.log("success")}).catch((err)=>{console.log("err");})
    // auth()
    //   .createUserWithEmailAndPassword('hussain@gmail.com', '123456')
    //   .then(res => {
    //     console.log('res:', res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // auth()
    //   .signInWithEmailAndPassword('hussain@gmail.com', '123456')
    //   .then(res => {
    //     console.log('res:', res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // auth()
    //   .signOut()
    //   .then(() => console.log('User signed out!'));
  }, []);

  return (
    <StoreProvider store={store}>
      {/* <AppRouter /> */}
      <PaperProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}
export default App;
