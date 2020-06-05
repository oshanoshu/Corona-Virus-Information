import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, Platform, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import logo from './assets/logo.png';
import splash from './assets/splash.png';
//import { LineChart} from 'react-native-chart-kit';
import { LineChart, Grid } from 'react-native-svg-charts'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { getProvidesAudioData } from 'expo/build/AR';
//const Stack = createStackNavigator;
import Details from './Details';
export default class Home extends React.Component {
  //let allData ={};
  constructor(props){
    super(props);
    this.state = {dataSource:[], error: false, isLoaded: true, search: '', selected: new Map()}
    this.countryList=[];
    //this.fetchCountryList();
  }
  
 

//For chart
onPressAction = (key) => {
    //create new Map object, maintaining state immutability
    const selected = new Map(this.state.selected);
    //remove key if selected, add key if not selected
    //navigation.navigate("NextPage");
    this.state.selected.has(key) ? selected.delete(key, !selected.get(key)) : selected.set(key, !selected.get(key));
    this.setState({
        selected: selected
    })
    this.props.navigation.navigate("Details", {
      CountryName: item.Country
    })
  
}

componentDidMount(){  
  fetch('https://api.covid19api.com/summary')
  .then(res=>res.json())
  .then(
      result=>{
      
      
      this.setState({
        isLoaded: false,
        dataSource: result.Countries,
      },
      function(){
        this.countryList = result;
      })
      
    }),
    (error)=>{
      this.setState({
        isLoaded:true,
        error: error
      })
    }
  }
SearchFilterFunction(text) {
  //passing the inserted text in textinput

    const newData = this.countryList.Countries.filter(function(item) {
    //applying filter for the inserted text in search bar
    const itemData = item.Country ? item.Country.toUpperCase() : ''.toUpperCase();
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
  this.setState({
    dataSource: newData,
    search: text
  });
  
}

  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };
  
  render(){
    
    if(this.state.error)
    {
      return(
        <View style={styles.container}>
            {/* This is for the image*/}
            <Image source = {splash} style = {{width: 400, height: 400}}/>
            <Text style = {{color: "#222", fontSize: 20, margin: 20}}>There is error!</Text>
        </View>
      );
    }
    else if (this.state.isLoaded)
    {
      return(
        <View style={styles.container}>
            {/* This is for the image*/}
            <View style={{alignItems: "center"}}>
            <Image source = {splash} style = {{width: 400, height: 400, opacity: 1}}/>
            </View>
            <View style={{alignItems: "center"}}>
            <Text style = {{color: "#27496d", fontSize: 20, margin: 20}}>Stay Distant, But Visible</Text>
            </View>
        </View>
      );
    }
    else
    { 
      
        
      return (

        <View style={styles.container}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={text => this.SearchFilterFunction(text)}
            onClear={text => this.SearchFilterFunction('')}
            value={this.state.search}
            
          />
          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            //Item Separator View
            renderItem={({ item }) => (
              // Single Comes here which will be repeatative for the FlatListItems
            <Text style={styles.textStyle}  onPress = {()=>this.props.navigation.navigate("Details", {
              CountryData: item,
              GlobalData: this.countryList.Global
            })} selected={!!this.state.selected.get(item.Slug)}>{item.Country}</Text>
            )}
            //enableEmptySections={true}
            style={{ margin: 10 }}
            keyExtractor={item => item.Slug}
            extraData={this.state.selected}
          />
          
          
          
          
          
        </View>
      );
    
    }
    
  }
    
}



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: '#dae1e7',
    marginTop: Platform.OS=='ios'? 5:0,  
  },
  textStyle: {
    padding: 10,
    fontSize: 20,
    color: "black"
  }
});
