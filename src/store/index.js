import { createStore } from "vuex";
import fetchData from "../adapter";

export default createStore({
    state: {
        places: []
    }, 
    getters: {
        getPlaces: state => { 
            return state.places
        }
    },
    actions: {
        async fetchWeather({ commit }, place) {
                const data = await fetchData(place, 'weather')
                if(typeof(data) !== 'undefined') {
                    commit('addPlace', data)
                } else {
                    throw 'no place found with given name'
                }
        },

        async fetchForecast({commit}, place) {
            const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const placeForecast = []
            const data = await fetchData(place, "forecast");

            if(typeof(data) !== 'undefined') {
                for (let i = 7; i <= data.list.length; i += 8) {
                    let dt = new Date(data.list[i].dt_txt);
                    data.list[i].day = weekday[dt.getDay()];
                    placeForecast.push(data.list[i]);
                }
                commit('addForecast', { placeName: place, data: placeForecast })
            } else {
                throw 'problem with fetching forecast'
            }
          }
    }, 
    mutations: {
        addPlace(state, placeWeather) {
            if((state.places.filter( p => p.id == placeWeather.id)).length == 0) {
                state.places.unshift(placeWeather)
            } else {
                throw("place already exixts")
            }
        },
        addForecast(state, forecast ) {
            state.places.map((p)=> p.name === forecast.placeName ? p.forecast = forecast.data : p)
            // state.places = state.places.map( 
            //     p=> p.name === forecast.placeName ? ({ ...p, forecast: forecast.data }) : p)
        },
        deletePlace(state, id) {
            state.places = state.places.filter( p => p.id != id )
        }
    }
})