import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import backgroundImage from '../assets/images/bg.jpg';

function Payment({route, navigation}) {
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState('');
  const [userLoginFlag, setuserLoginFlag] = useState();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Habib Bank Limited', value: 'hbl'},
    {label: 'Meezan Bank Limited', value: 'mbl'},
    {label: 'Allied Bank Limited', value: 'abl'},
  ]);

  const [formData, setFormData] = useState({
    bankName: '',
    cardNo: '',
    cardExpiry: '',
    cardCode: '',
  });

  const submitForm = () => {
    console.log('payment page');
    console.log(formData);
    console.log(value);
    console.log(items);
    formData.bankName = value;
    let {bankName, cardNo, cardCode, cardExpiry} = formData;

    if (bankName && cardNo && cardCode && cardExpiry) {
      setLoader(true);
      
      auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          console.log('User is signed in');
          setuserLoginFlag(true);
          setUserId(user.uid);
          const reference = firebase
            .app()
            .database(
              'https://hotelmanagementssystemnative-default-rtdb.asia-southeast1.firebasedatabase.app/',
            )
            // .ref('hotel/' + userId)
            .ref(`payment/${user.uid}`)
            .push(formData)
            .then(res => {
              console.log('Hotel Reservation successfully completed');
              setLoader(false);
              navigation.navigate('Hotels');
              setFormData({
                bankName: '',
                cardNo: '',
                cardExpiry: '',
                cardCode: '',
              });
            })
            .catch(err => {
              setLoader(false);
              console.log('userSetError');
            });
        } else {
          console.log('No user is signed in.');
          setuserLoginFlag(false);
          navigation.navigate('Hotels');
          // No user is signed in.
        }
      });
    } else {
      alert('Please fill all payment fields');
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.main}>
      <View style={styles.headingDiv}>
        <Text style={styles.headingDivText}>Payment Method</Text>
      </View>
      <View style={styles.userInputMainDiv}>
        <View style={[styles.inputTextDiv, {marginTop: 15}]}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <View style={styles.inputTextDiv}>
          <TextInput
            style={styles.inputText}
            placeholder="Card Number"
            value={formData.cardNo}
            keyboardType="number-pad"
            onChangeText={e =>
              setFormData({...formData, cardNo: e})
            }></TextInput>
        </View>
        <View style={styles.inputTextDiv}>
          <TextInput
            style={[styles.inputText]}
            placeholder="Card Expiry Date"
            value={formData.cardExpiry}
            keyboardType="number-pad"
            onChangeText={e =>
              setFormData({...formData, cardExpiry: e})
            }></TextInput>
        </View>
        <View style={styles.inputTextDiv}>
          <TextInput
            style={styles.inputText}
            placeholder="Card Code"
            value={formData.cardCode}
            keyboardType="number-pad"
            onChangeText={e =>
              setFormData({...formData, cardCode: e})
            }></TextInput>
        </View>

        <View style={styles.inputTextDiv}>
          {!loader ? (
            <TouchableOpacity style={styles.button} onPress={submitForm}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator
              size="large"
              color="white"
              style={styles.button}
            />
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  headingDiv: {
    // borderWidth: 2,
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingDivText: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
  },
  userInputMainDiv: {
    // borderWidth: 3,
    // borderColor: 'green',
    flex: 6,
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
  button: {
    backgroundColor: '#964fbc',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default Payment;
