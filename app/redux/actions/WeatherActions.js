const apiId = 'd582a3a2994ebdaa28a41048a5d3b990';
const oneCallApi = 'https://api.openweathermap.org/data/2.5/onecall';
const onlyCurrentApi = 'https://api.openweathermap.org/data/2.5/weather';
const units = 'metric';
import Axios from 'axios';
export const getDataOfWeather = ({lat, lon}) => {
  return(dispatch)=> {
    dispatch({type:"updateLoader",loader:true});
    dispatch({type:"updateLocation",lat:lat,lon:lon});
    loadWeatherData(dispatch,lat,lon);
  };
};
const loadWeatherData = async (dispatch,lat,lon) => {
    const url =
      oneCallApi +
      '?lat=' +
     lat.toString() +
      '&lon=' +
      lon.toString() +
      '&units=' +
      units +
      '&appid=' +
      apiId;
    const weatherData = await Axios.get(url);
    dispatch({type: 'setWeatherData',weatherData: weatherData.data});
    dispatch({type:"updateLoader",loader:false});
  };
  //---------------------------------------------------------------------
  export const search = ({cityName}) => {
    return (dispatch) => {
       dispatch({type: 'successSearching', searchCheck: false});
      dispatch({type: 'updateLoader', loader: true});
      getCityCoord(dispatch,cityName);
    };
  };
  const getCityCoord = async (dispatch,cityName) => {
    const url =
      onlyCurrentApi +
      '?q=' +
      cityName.toLowerCase() +
      '&units=' +
      units +
      '&appid=' +
      apiId;
    const data = await Axios.get(url);
    getWeather(dispatch, data.data.coord.lat, data.data.coord.lon);
  };
   const getWeather = (dispatch,lat, lon) => {
    dispatch({type: 'updateLoader', loader: true});
    dispatch({type: 'updateLocation', lat: lat, lon: lon});
    loadWeatherData(dispatch, lat, lon);
     dispatch({type: 'successSearching', searchCheck: true});
  };

