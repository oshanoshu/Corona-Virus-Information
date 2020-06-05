import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, Platform, FlatList, SectionList, Dimensions} from 'react-native';
import {SearchBar} from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import logo from './assets/logo.png';
import { LineChart, ProgressChart} from 'react-native-chart-kit';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { getProvidesAudioData } from 'expo/build/AR';
import { ScrollView } from 'react-native-gesture-handler';
import { max } from 'react-native-reanimated';
export default class Details extends React.Component {
    constructor(props){
        super(props);
        //this.CountryName=route.params;
        this.CountryData = this.props.route.params["CountryData"];
        this.GlobalData = this.props.route.params["GlobalData"];
        this.deaths = [];
        this.confirmed = [];
        this.recovered = [];
        this.state = {deaths: [0], confirmed: [0], recovered: [0]};
    }

    componentDidMount(){
        fetch("https://api.covid19api.com/total/country/"+this.CountryData.Slug)
        .then(
            res=>res.json()
        )
        .then(
            (result)=>{
                result.map(data=>{
                    this.deaths.push(data.Deaths);
                    this.confirmed.push(data.Confirmed);
                    this.recovered.push(data.Recovered);
                })
                this.setState({
                    deaths: this.deaths.slice(this.deaths.length-29,this.deaths.length+1),
                    confirmed: this.confirmed.slice(this.confirmed.length-29,this.confirmed.length+1),
                    recovered: this.recovered.slice(this.recovered.length-29,this.recovered.length+1)
                })
                

            },
            
        )
    }
    render(){
        
        return(
            <View style = {styles.container}>
                <View style={{alignItems: "center"}}>
                    <Text style={{color: '#142850', fontSize: 22}}>Stats</Text>
                    <SectionList
                        style={{
                            margin:10,
                            borderRadius: 5,
                            borderWidth: 2,
                            height: "40%",
                            width: "90%"
                        }}

                        sections={[
                            {title: "Confirmed Cases", data: [this.CountryData.TotalConfirmed]},
                            {title: "Deaths", data: [this.CountryData.TotalDeaths]},
                            {title: "Recovered", data: [this.CountryData.TotalRecovered]},
                            {title: "New Confirmed Cases", data: [this.CountryData.NewConfirmed]},
                            {title: "New Deaths", data: [this.CountryData.NewDeaths]},
                            {title: "New Recovered", data: [this.CountryData.NewRecovered]},

                        ]}
                        renderSectionHeader={({section})=>
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                        }
                        renderItem = {({item})=>
                        <Text style={styles.item}>{item}</Text>
                        }
                        keyExtractor = {(item, index) => index}
                        
                    />
                </View>
                    <ScrollView contentContainerStyle={{alignItems: "center", marginTop: 10}}>
                    <Text style={{}}>Linechart for Deaths: Last 30 days</Text>
                    <LineChart
                        data={{
                        datasets: [
                            {
                            data: this.state.deaths
                            }
                        ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={380}
                        yAxisInterval={1} // optional, defaults to 1
                        xAxisLabel="Last 30 days: COVID-19 Deaths"
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726", 
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "0",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                              }
                        }}
                        
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    <Text style={{}}>Linechart for Confirmed Cases: Last 30 days</Text>
                    <LineChart
                        data={{
                        datasets: [
                            {
                            data: this.state.confirmed
                            }
                        ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={380}
                        yAxisInterval={1} // optional, defaults to 1
                        xAxisLabel="Last 30 days: COVID-19 Confirmed Cases"
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726", 
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "0",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                              }
                        }}
                        
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    {/* <ProgressChart
                        data={{
                            labels: ["Cases", "Deaths", "New Cases"],
                            data: [this.CountryData.TotalConfirmed/this.GlobalData.TotalConfirmed, this.CountryData.TotalDeaths/this.GlobalData.TotalDeaths, this.CountryData.NewConfirmed/this.GlobalData.NewConfirmed]
                        }
                        }
                        width={Dimensions.get("window").width}
                        height={220}
                        strokeWidth={16}
                        radius={32}
                        chartConfig={chartConfig}
                        hideLegend={false}
                        
                        /> */}
                    </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 10,
     backgroundColor: '#dae1e7',

    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 18,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
      color: '#142850'
    },
    item: {
      padding: 5,
      fontSize: 18,
      height: 44,
      color: '#27496d',
      backgroundColor: '#00909e',
    },
  })

  const chartConfig = {
    backgroundGradientFrom: "#636363",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#a2ab58",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(162, 171, 88, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    
  };