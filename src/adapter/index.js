import axios from 'axios';
import config from './api.config.json'

// w_f --> 'weather' || 'forecast'
const fetchData = async (place, w_f) => {
    try {
        const result = await axios.get(`${config.host}${w_f}?q=${place}&appid=${config.key}`)
        const data = await result.data
        return data
    } catch(e) {
    }
    

}

export default fetchData;