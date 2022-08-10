import React, {useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import backgroundImage from '../assets/images/bg.jpg';

function Signup({navigation}) {
  const [loader, setLoader] = useState(false);
  const [userType, setUserType] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    password: '',
  });

  const submitSignup = () => {
    let {name, email, type, password} = formData;

    if (name === '' && email === '' && password === '') {
      return alert('Please enter requied fields !');
    } else if (name === '') {
      return alert('Please enter your Name !');
    } else if (email === '') {
      return alert('Please enter your Email !');
    } else if (password === '') {
      return alert('Please type your password !');
    } else if (password.length < 6) {
      return alert('Password must be 6 digit !');
    }

    if (type == '') {
      formData.type = 'user';
    }

    setLoader(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('create');
        console.log(res);
        console.log(res.user.uid);
        const reference = firebase
          .app()
          .database(
            'https://hotelmanagementssystemnative-default-rtdb.asia-southeast1.firebasedatabase.app/',
          )
          .ref('users/' + res.user.uid)
          .set(formData)
          .then(res => {
            console.log('User successfully sendto db');
            setLoader(true);
            navigation.navigate('Hotels');
          })
          .catch(err => {
            setLoader(false);
            console.log('userSetError');
          });
      })
      .catch(err => {
        console.log('signup err:', err);
        setLoader(false);
      });
  };
  return (
    <View style={styles.main}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.bgImage}>
        <View style={styles.header}>
          <Text style={styles.headerText}>HOTELTONIGHT</Text>
        </View>
        <View style={styles.header}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 25,
              marginTop: 40,
            }}>
            Sign Up
          </Text>
        </View>
        <View style={styles.userInput}>
          <View style={styles.inputAndButtonView}>
            <View style={styles.nameView}>
              <TextInput
                placeholder="Name"
                style={styles.emailText}
                keyboardType="default"
                value={formData.name}
                onChangeText={e =>
                  setFormData({...formData, name: e})
                }></TextInput>
            </View>
            <View style={styles.emailView}>
              <TextInput
                placeholder="Email"
                style={styles.emailText}
                keyboardType="email-address"
                keyboardAppearance="light"
                value={formData.email}
                onChangeText={e =>
                  setFormData({...formData, email: e})
                }></TextInput>
            </View>
            {userType && (
              <View style={styles.emailView}>
                <TextInput
                  placeholder="Type"
                  style={styles.emailText}
                  keyboardType="default"
                  value="user"
                  hidden={true}></TextInput>
              </View>
            )}
            <View style={styles.passwordView}>
              <TextInput
                placeholder="Password"
                style={styles.passwordText}
                secureTextEntry={true}
                value={formData.password}
                onChangeText={e =>
                  setFormData({...formData, password: e})
                }></TextInput>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitSignup}>
              {!loader ? (
                <Text style={styles.submitButtonText}>Submit</Text>
              ) : (
                <ActivityIndicator size="large" color="white" />
              )}
            </TouchableOpacity>
            <View style={{alignSelf: 'flex-end'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{color: 'white'}}>Already have an account!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // borderWidth: 2,
  },
  bgImage: {
    flex: 1,
  },
  header: {
    flex: 0.2,
    // borderWidth: 2,
    // borderColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 35,
    borderWidth: 2,
    borderColor: 'yellow',
    borderRadius: 10,
    padding: 8,
    marginTop: 15,
  },
  userInput: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputAndButtonView: {
    // borderWidth:3,
    flex: 1,
    // justifyContent:'space-evenly',
    alignItems: 'center',
  },
  nameView: {
    // borderWidth: 2,
    width: 300,
    margin: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  emailView: {
    // borderWidth: 2,
    width: 300,
    margin: 5,
    // marginTop: 40,
    marginBottom: 20,
  },
  passwordView: {
    // borderWidth: 2,
    width: 300,
    margin: 5,
    // marginTop:20,
    marginBottom: 20,
  },
  emailText: {
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 18,
  },
  passwordText: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 18,
  },
  submitButton: {
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 10,
    width: 200,
    height: 40,
    backgroundColor: '#964fbc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default Signup;
