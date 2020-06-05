import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, Platform, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import logo from './assets/logo.png';
//import { LineChart} from 'react-native-chart-kit';
import { LineChart, Grid } from 'react-native-svg-charts'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { getProvidesAudioData } from 'expo/build/AR';
import Home from './Home';
import Details from './Details';
const Stack = createStackNavigator();
export default class App extends React.Component {

  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} options={{title: "COVID-19 Updates"}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS=='ios'? 40:0,  
  },
  textStyle: {
    padding: 10,
    fontSize: 20,
    color: "black"
  }
});
