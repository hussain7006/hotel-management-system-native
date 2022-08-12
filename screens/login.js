import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import backgroundImage from '../assets/images/bg.jpg';
import {useDispatch, useSelector} from 'react-redux';

function Login({navigation}) {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const submitLogin = () => {
    let {email, password} = formData;

    if (email === '' && password === '') {
      return alert('Please enter requied fields !');
    } else if (email === '') {
      return alert('Please enter your Email !');
    } else if (password === '') {
      return alert('Please type your password !');
    } else if (password.length < 6) {
      return alert('Password must be 6 digit !');
    }
    setLoader(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        setLoader(false);
        // console.log('login successfully...');
        // console.log(res.user);
        dispatch({
          type: 'CHECKUSER',
        });
        navigation.navigate('Hotels');
      })
      .catch(err => {
        console.log('login error:', err);
        setLoader(false);
        Alert.alert("Connection error...")
        navigation.navigate('Hotels');
      });
  };
  return (
    <View style={styles.main}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.bgImage}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hotel ToNight</Text>
        </View>
        <View style={styles.header}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 25,
              marginTop: 40,
            }}>
            Sign In
          </Text>
        </View>
        <View style={styles.userInput}>
          <View style={styles.inputAndButtonView}>
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
            <TouchableOpacity style={styles.submitButton} onPress={submitLogin}>
              {!loader ? (
                <Text style={styles.submitButtonText}>Submit</Text>
              ) : (
                <ActivityIndicator size="large" color="white" />
              )}
            </TouchableOpacity>
            <View style={{alignSelf: 'flex-end'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{color: 'white'}}>Don't have an account!</Text>
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
  emailView: {
    // borderWidth: 2,
    width: 300,
    margin: 5,
    marginTop: 40,
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
    borderRadius: 10,
    backgroundColor: 'white',
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
export default Login;
