import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import {
  ActivityIndicator,
  Alert,
  Button,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import backgroundImage from '../assets/images/bg.jpg';

function MyBookings({ navigation }) {
  const [userId, setUserId] = useState('');
  const [bookedHotels, setBookedHotel] = useState([]);
  const [keys, setKeys] = useState([]);
  const [loader, setLoader] = useState(false);
  const [noData, setNoData] = useState(false);
  const getData = () => {
    auth().onAuthStateChanged(function (user) {
      setLoader(true);
      if (user) {
        // User is signed in.
        // console.log('User is signed in');
        setUserId(user.uid);
        const reference = firebase
          .app()
          .database(
            'https://hotelmanagementssystemnative-default-rtdb.asia-southeast1.firebasedatabase.app/',
          )
          .ref(`hotel/${user.uid}`)
          .once('value')
          .then(snapshot => {
            if (snapshot.exists()) {
              setNoData(false);
              let myBookedhotels = Object.values(snapshot.val());
              let mykeys = Object.keys(snapshot.val());
              setKeys([...mykeys]);
              //   console.log(myBookedhotels);
              //   console.log(keys);
              setBookedHotel([...myBookedhotels]);
              setLoader(false);
            } else {
              console.log('No data available');
              setLoader(false);
              setNoData(true);
            }
          });
      } else {
        console.log('my bookings No user is signed in.');
        // setuserLoginFlag(false);
        setLoader(false);

        // Alert.alert("Your are not loggedin!")
        setLoader(false);
        setNoData(true);
        navigation.navigate('Hotels');
        // No user is signed in.
      }
    });
  };

  const delteBooking = (item, index) => {
    let uId = userId;
    let itemId = keys[index];
    // alert();
    setLoader(true);
    const reference = firebase
      .app()
      .database(
        'https://hotelmanagementssystemnative-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`hotel/${uId}/${itemId}`)
      .remove()
      .then(res => {
        console.log('remove Successfully');
        // setLoader(false)
        getData();
      })
      .catch(err => {
        console.log('err:', err);
        setLoader(false);
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      //   headerRight: () => getData(),
      headerRight: () => <Button title="refresh" onPress={refresh}></Button>,
    });
  }, []);

  const refresh = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.main}>
      <View style={styles.headingView}>
        <Text style={styles.headingText}>My Bookings</Text>
      </View>
      <View style={styles.bookingsView}>
        {!noData ? (
          <ScrollView style={styles.scrollView}>
            {bookedHotels.length && !loader ? (
              bookedHotels.map((e, i) => (
                <View key={i} style={styles.card}>
                  <View style={styles.cardTop}>
                    <Text style={styles.hotelNameText}>{e.hotel}</Text>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 15,
                        top: 10,
                        borderWidth: 2,
                        padding: 2,
                        paddingHorizontal: 5,
                        borderRadius: 10,
                        backgroundColor: 'pink',
                      }}
                      onPress={() => delteBooking(e, i)}>
                      <Text style={{ color: 'black', fontWeight: 'bold' }}>
                        X
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardBottom}>
                    <View style={styles.row}>
                      <View style={styles.leftView}>
                        <Text style={styles.leftText}>Name:</Text>
                      </View>
                      <View style={styles.rightView}>
                        <Text style={styles.leftText}>{e.name}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.leftView}>
                        <Text style={styles.leftText}>CNIC:</Text>
                      </View>
                      <View style={styles.rightView}>
                        <Text style={styles.leftText}>{e.cnic}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.leftView}>
                        <Text style={styles.leftText}>Adress:</Text>
                      </View>
                      <View style={styles.rightView}>
                        <Text style={styles.leftText}>{e.address}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.leftView}>
                        <Text style={styles.leftText}>Persons:</Text>
                      </View>
                      <View style={styles.rightView}>
                        <Text style={styles.leftText}>{e.persons}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.leftView}>
                        <Text style={styles.leftText}>Days:</Text>
                      </View>
                      <View style={styles.rightView}>
                        <Text style={styles.leftText}>{e.days}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.leftView}>
                        <Text style={styles.leftText}>Contact:</Text>
                      </View>
                      <View style={styles.rightView}>
                        <Text style={styles.leftText}>{e.contact}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={{ height: 350, justifyContent: 'center' }}>
                <ActivityIndicator size={100} color="white" />
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>No Booking Found...</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    // borderWidth: 3,
    // borderColor: 'red',
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
  bookingsView: {
    flex: 7,
    // borderWidth: 3,
    // borderColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    borderWidth: 3,
    borderColor: 'orange',
    borderRadius: 16,
    height: 200,
    margin: 10,
  },
  cardTop: {
    flex: 2,
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotelNameText: {
    color: 'yellow',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardBottom: {
    flex: 6,
    // borderWidth: 2,
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  row: {
    flexDirection: 'row',
    // borderWidth: 2,
    // justifyContent: 'space-evenly',
    width: 200,
  },
  leftView: {
    // borderWidth: 2,
    flex: 1,
    alignItems: 'center',
  },
  rightView: {
    // borderWidth: 2,
    flex: 1,
    alignItems: 'center',
  },
  leftText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noData: {
    // borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 15,
  },
});
export default MyBookings;
