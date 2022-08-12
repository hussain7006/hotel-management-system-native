import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { ActivityIndicator, Alert, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import backgroundImage from '../assets/images/bg.jpg';

function Profile({ navigation }) {

  const [userProfile, setUserProfile] = useState([])
  const getProfileData = () => {
    auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log('User is signed in profile page');
        //   setuserLoginFlag(true);
        const reference = firebase
          .app()
          .database(
            'https://hotelmanagementssystemnative-default-rtdb.asia-southeast1.firebasedatabase.app/',
          )
          // .ref('hotel/' + userId)
          .ref(`users/${user.uid}`)
          .once('value')
          .then(snapshot => {
            if (snapshot.exists()) {
              setUserProfile([{ ...snapshot.val() }])
            } else {
              console.log('No data available');
            }
          })
          .catch(err => {
            // console.log('Error:', err);
            Alert.alert("Connection error...")
            navigation.navigate('Hotels');
          });
      } else {
        Alert.alert("Your are not loggedin!")
        navigation.navigate('Hotels');
      }
    });
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      setUserProfile([])
      getProfileData()
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.main}>
      <View style={styles.headingView}>
        <Text style={styles.headingText}>Profile</Text>
      </View>
      {userProfile.length ?
        <View style={styles.profileView}>
          <View style={styles.inputTextDiv}>
            <TextInput
              style={[styles.inputText, { marginTop: 15 }]}
              placeholder="Name"
              value={userProfile[0].name}
              editable={false}></TextInput>
            <TextInput
              style={[styles.inputText, { marginTop: 15 }]}
              placeholder="Email"
              value={userProfile[0].email}
              editable={false}></TextInput>
            <TextInput
              style={[styles.inputText, { marginTop: 15 }]}
              placeholder="User Type"
              value={userProfile[0].type}
              editable={false}></TextInput>
            <TextInput
              style={[styles.inputText, { marginTop: 15 }]}
              placeholder="Password"
              value={userProfile[0].password}
              secureTextEntry={true}
              editable={false}></TextInput>
          </View>
        </View> :
        <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={100} color="white" />
        </View>
      }
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  headingView: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'yellow',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  profileView: {
    flex: 7,
    borderWidth: 2,
    borderColor: 'yellow',
    borderRadius: 10,
    margin: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  inputTextDiv: {
    // borderWidth: 2,
    // borderColor: 'yellow',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  inputText: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
export default Profile;
