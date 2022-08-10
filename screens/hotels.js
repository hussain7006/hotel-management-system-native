import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';

import backgroundImage from '../assets/images/bg.jpg';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

function Hotels({navigation}) {
  const [hotels, setHotels] = useState([]);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userFlag, setUserFlag] = useState();
  const [headerButtonLoader, setHeaderButtonLoader] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        userFlag ? (
          <TouchableOpacity
            style={styles.headerRightButtonStyles}
            onPress={signOut}>
            {!headerButtonLoader ? (
              <Text style={{color: 'white', fontWeight: 'bold'}}>SignOut</Text>
            ) : (
              <ActivityIndicator size="small" color="white" />
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.headerRightButtonStyles}
            onPress={() => navigation.navigate('Login')}>
            {!headerButtonLoader ? (
              <Text style={{color: 'white', fontWeight: 'bold'}}>SignIn</Text>
            ) : (
              <ActivityIndicator size="small" color="white" />
            )}
          </TouchableOpacity>
        ),
        
    });
  }, [navigation, userFlag, user]);

  // Handle user state changes
  function onAuthStateChanged(user) {
    // console.log('hussain:', user.uid);
    setUser(user);
    if (user) {
      setUserFlag(true);
      dispatch({
        type: 'CHECKUSER',
      });
      dispatch({
        type: 'SETUSERUID',
        value: user.uid,
      });
    }
    if (initializing) setInitializing(false);
  }

  const dispatch = useDispatch();
  const reducerData = useSelector(data => data);

  const getData = () => {
    const reference = firebase
      .app()
      .database(
        'https://hotelmanagementssystemnative-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref('hotelInfo/')
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          let hotelsDetails = Object.values(snapshot.val());
          let myHotels = [];
          let filter = hotelsDetails.map((e, i) => {
            let obj = Object.values(e);
            myHotels.push(obj[0]);
          });
          // console.log(hotels);
          dispatch({
            type: 'SETHOTELS',
            value: myHotels,
          });
          setHotels([...myHotels]);
        } else {
          console.log('No data available');
        }
      });
  };

  const bookYourHotel = (hotelDetails) => {
    if (!user) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('BookHotel',{state:{hotelDetails}});
    }
  };

  const signOut = () => {
    setHeaderButtonLoader(true);
    auth()
      .signOut()
      .then(() => {
        console.log('logout successfully');
        setHeaderButtonLoader(false);

        dispatch({
          type: 'LOGOUT',
        });

        setUserFlag(reducerData.userLogin);
      });
  };

  // console.log("myReduxData: ", reducerData);

  // getData('todos').then((snapshot) => {
  //     if (snapshot.exists()) {

  //         // setTodos([snapshot.val()])               // if getting data by id then use this
  //         let Todos = Object.values(snapshot.val());  // if getting complete data then use this
  //         setTodos(Todos)

  //     } else {
  //         console.log("No data available");
  //     }
  // }).catch((error) => {
  //     console.error(error);
  // });

  useEffect(() => {
    getData();
    console.log('hotels page');
    console.log(reducerData.userLogin);
    setUserFlag(reducerData.userLogin);
    navigation.navigate('Hotels');
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor="lightpink"></StatusBar>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.bgImage}>
        <View style={styles.cardsDiv}>
          {hotels.length > 0 ? (
            <ScrollView style={styles.scrollView}>
              {hotels.map((e, i) => (
                <View key={i} style={styles.card}>
                  <View style={styles.left}>
                    <Image
                      source={{
                        uri: hotels[i].img,
                      }}
                      style={styles.img}
                    />
                  </View>
                  <View style={styles.right}>
                    <View style={styles.hotelNameDiv}>
                      <Text style={styles.hotelNameText}>
                        {hotels[i].hotel}
                      </Text>
                    </View>
                    <View style={styles.hotelServicesDiv}>
                      <Text
                        style={{
                          marginLeft: 5,
                          fontWeight: 'bold',
                          color: 'white',
                        }}>
                        Services
                      </Text>
                      <Text style={styles.hotelServicesText}>
                        {hotels[i].services}
                      </Text>
                    </View>
                    <View style={styles.hotelPriceDiv}>
                      <Text
                        style={{
                          marginLeft: 5,
                          fontWeight: 'bold',
                          color: 'white',
                        }}>
                        Rooms
                      </Text>
                      <Text style={styles.hotelPriceText}>
                        {hotels[i].rooms}
                      </Text>
                    </View>
                    <View style={styles.hotelPriceDiv}>
                      <Text
                        style={{
                          marginLeft: 5,
                          fontWeight: 'bold',
                          color: 'white',
                        }}>
                        Price
                      </Text>
                      <Text style={styles.hotelPriceText}>
                        {hotels[i].price}
                      </Text>
                    </View>
                    <View style={styles.bookNowButtonDiv}>
                      <TouchableOpacity
                        style={styles.bookNowButton}
                        onPress={() => bookYourHotel(hotels[i])}>
                        <Text style={{color: 'white'}}>Book Now</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
              }}>
              <ActivityIndicator size={100} color="white" />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRightButtonStyles: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    width: 70,
    backgroundColor: '#964fbc',
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    // borderWidth: 2,
  },
  bgImage: {
    flex: 1,
    // borderWidth: 4,
    // borderColor: 'blue',
  },
  cardsDiv: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 8,
    margin: 8,
    flexDirection: 'row',
  },
  left: {
    // borderWidth: 3,
    // borderColor: 'yellow',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {width: 160, height: 150},
  right: {
    borderWidth: 1,
    borderColor: 'yellow',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    flex: 0.5,
    justifyContent: 'space-between',
    margin: 2,
  },
  hotelNameDiv: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotelNameText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hotelServicesDiv: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotelServicesText: {
    color: 'white',
    fontSize: 9,
  },
  hotelPriceDiv: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotelPriceText: {
    color: 'white',
    fontSize: 9,
  },
  bookNowButtonDiv: {padding: 5},
  bookNowButton: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#d1a1ea',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#964fbc',
  },
});

export default Hotels;
