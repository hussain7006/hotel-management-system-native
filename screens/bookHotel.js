import React, {useEffect, useState} from 'react';
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
import backgroundImage from '../assets/images/bg.jpg';
import {NavigationContainer} from '@react-navigation/native';

function BookHotel({route, navigation}) {
  const [formData, setFormData] = useState({
    name: '',
    cnic: '',
    address: '',
    contact: '',
    hotel: '',
    persons: '',
    days: '',
  });
  const [loader, setLoader] = useState(false);
  const [userBookingHotelDetails, setUserBookingHotelDetails] = useState({});

  const [userId, setUserId] = useState('');
  const [userLoginFlag, setuserLoginFlag] = useState();
  // Handle user state changes

  let submitForm = () => {
    formData.hotel = userBookingHotelDetails.hotel;
    let {name, cnic, address, contact, hotel, persons, days} = formData;
    // console.log(firebase.app().database('https://hotelmanagementssystemnative-default-rtdb.asia-southeast1.firebasedatabase.app/',).ref().push().key());

    if (name && cnic && address && contact && hotel && persons && days) {
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
            .ref(`hotel/${user.uid}`)
            .push(formData)
            .then(res => {
              console.log('Hotel Reservation successfully completed');
              setLoader(false);
              setUserBookingHotelDetails({});
              navigation.navigate('Payment', {state: {formData}});
              setFormData({
                name: '',
                cnic: '',
                address: '',
                contact: '',
                hotel: '',
                persons: '',
                days: '',
              });
            })
            .catch(err => {
              setUserBookingHotelDetails({});
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
      alert('Please fill all required fields!');
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      // console.log('feed is focused');
      // console.log('bookHotelPage');
      // console.log(route.params.state.hotelDetails);
      setUserBookingHotelDetails({...route.params.state.hotelDetails});
    });

    return unsubscribe;
  }, [navigation, route]);

  useEffect(() => {
    
  }, []);

  return (
    // <View style={styles.main}>
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.main}>
      <View style={styles.headingDiv}>
        <Text style={styles.headingDivText}>Booking Information</Text>
      </View>
      <View style={styles.userInputMainDiv}>
        <ScrollView>
          <View style={styles.inputTextDiv}>
            <TextInput
              style={[styles.inputText, {marginTop: 15}]}
              placeholder="Name"
              value={formData.name}
              onChangeText={e =>
                setFormData({...formData, name: e})
              }></TextInput>
          </View>
          <View style={styles.inputTextDiv}>
            <TextInput
              style={styles.inputText}
              placeholder="CNIC"
              value={formData.cnic}
              keyboardType="number-pad"
              onChangeText={e =>
                setFormData({...formData, cnic: e})
              }></TextInput>
          </View>
          <View style={styles.inputTextDiv}>
            <TextInput
              style={styles.inputText}
              placeholder="Address"
              value={formData.address}
              onChangeText={e =>
                setFormData({...formData, address: e})
              }></TextInput>
          </View>
          <View style={styles.inputTextDiv}>
            <TextInput
              style={styles.inputText}
              placeholder="Contact"
              value={formData.contact}
              keyboardType="number-pad"
              onChangeText={e =>
                setFormData({...formData, contact: e})
              }></TextInput>
          </View>
          <View style={styles.inputTextDiv}>
            <TextInput
              style={styles.inputText}
              placeholder="Hotel Name"
              value={userBookingHotelDetails.hotel}
              editable={false}
              onChangeText={e =>
                setFormData({...formData, hotel: e})
              }></TextInput>
          </View>
          <View style={styles.inputTextDiv}>
            <TextInput
              style={styles.inputText}
              placeholder="Number of persons"
              value={formData.persons}
              keyboardType="number-pad"
              onChangeText={e =>
                setFormData({...formData, persons: e})
              }></TextInput>
          </View>
          <View style={styles.inputTextDiv}>
            <TextInput
              style={styles.inputText}
              placeholder="Number of days to stay"
              value={formData.days}
              keyboardType="number-pad"
              onChangeText={e =>
                setFormData({...formData, days: e})
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
        </ScrollView>
      </View>
    </ImageBackground>

    // </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingDivText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
  userInputMainDiv: {
    borderWidth: 1,
    borderColor: 'white',
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
export default BookHotel;
