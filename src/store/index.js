import { createStore } from "vuex";
import axios from "axios";
import { VueElement } from "vue";

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
        async fetchWeatherInfo({ commit }, place) {
            const result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=524464013431281f7aabe3e488765d52`)
            const data = await result.data
            commit('addPlace', data)
        }
        
    }, 
    mutations: {
        addPlace(state, placeWeather) {
            state.places.push(placeWeather)
        }
    }
})