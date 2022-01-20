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
            if((state.places.filter( p => p.id == placeWeather.id)).length == 0) {
                state.places.push(placeWeather)
            } else {
                console.log("place already exixts")
            }

        },
        deletePlace(state, id) {
            state.places = state.places.filter( p => p.id !=id )
        }
    }
})