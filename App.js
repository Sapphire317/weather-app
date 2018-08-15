import React , {Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar} from 'react-native';
import Weather from "./weather";

const API_KEY = "27fd17dac109ccf1f325207ac565cffd";


export default class App extends Component {
  state = {
    isLoaded: false,
    error:null,
    temperature:null,
    name:null,
    city:null
  };

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude, position.name);
      },
      error => {
        this,this.setState({
          error:error
        });
      }
    )
  }

  _getWeather = (lat, lon, city) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({
        temperature:json.main.temp,
        name:json.weather[0].main,
        city:json.name,
        isLoaded:true
      })
    })
  }
  render() {
    const {isLoaded, error, temperature, name, city} = this.state;

    
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        {isLoaded? (
          <Weather 
          city={city} 
          weatherName={"Snow"} 
          temp={Math.floor(temperature - 273.15)}/>
        ) : 
        <View style={styles.loading}>
          <Text style={styles.loadingText}>
          Getting the fucking Weather
          </Text>
          { error ? <Text style={styles.errorText}>{error}</Text>: null}
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorText:{
    color:"red",
    backgroundColor:"transparent",
    marginBottom:40
  },
  loading:{
    flex:1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    paddingLeft:25
  },
  loadingText:{
    fontSize:38,
    marginBottom:100,

  }
 
});
