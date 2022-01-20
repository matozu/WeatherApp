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
        async fetchWeatherInfo({ commit }, place) {
            const data = await fetchData(place, 'weather')
            commit('addPlace', data)
        }
        
    }, 
    mutations: {
        addPlace(state, placeWeather) {
            state.places.push(placeWeather)
        }
    }
})