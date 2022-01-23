<template>
  <div class="card">
    <div class="circle" @click="deletePlace(placeWeather.id)"></div>

    <div class="header-left">
      <b>{{ placeWeather.name }}</b
      >, {{ placeWeather.weather[0].description }}
    </div>
    <div class="header-right">
      <img :src="getIconUrl(placeWeather.weather[0].icon)" alt="" />
    </div>

    <div style="clear: both"></div>

    <div class="weather-main">
      <div class="main-temp">{{ calcTemp(placeWeather.main.temp) }}°</div>
      <div class="main-right">
        Feels Like: {{ calcTemp(placeWeather.main.feels_like) }} °C
        <br />
        Pressure:{{ placeWeather.main.pressure }} hPa
        <br />
        Humidity: {{ placeWeather.main.humidity }} %
        <br />
        Wind: {{ calcWindSpeed(placeWeather.wind.speed) }} km/h,
        {{ calcWindDirection(placeWeather.wind.deg) }}
      </div>
    </div>

    <div class="show-forecast-btn" @click="toggleShowForecast">
      <div
        :class="showForecast ? 'forecast-icon-minus' : 'forecast-icon'"
      ></div>
    </div>
    <div style="clear: both"></div>

    <forecast v-show="showForecast" :placeForecast="placeWeather.forecast" />
  </div>
</template>

<script>
import Forecast from "./Forecast.vue";
import { mapMutations, mapActions } from "vuex";
import {
  calcTemp,
  calcWindSpeed,
  getIconUrl,
  calcWindDirection,
} from "../tools";

export default {
  name: "PlaceCard",
  props: {
    placeWeather: {
      type: Object,
      default: { type: "" },
    },
  },
  components: {
    Forecast,
  },
  data() {
    return {
      showForecast: false,
    };
  },
  methods: {
    ...mapMutations(["deletePlace"]),
    ...mapActions(["fetchForecast"]),
    calcTemp,
    calcWindSpeed,
    getIconUrl,
    calcWindDirection,
    toggleShowForecast() {
      if (!this.placeWeather.forecast) {
        this.fetchForecast(this.placeWeather.name).catch((e) => console.log(e));
      }
      this.showForecast = !this.showForecast;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 300px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 30px auto;
  padding: 20px;
  background: gainsboro;
}

.header-left {
  margin-top: 12px;
  margin-left: 12px;
  float: left;
}

.header-right {
  float: right;
}

.weather-main {
  padding: 2px;
  overflow: auto;
}

.main-temp {
  font-size: 4em;
  right: 5px;
  float: left;
}

.main-right {
  float: right;
  text-align: left;
}

.show-forecast-btn {
  cursor: pointer;
  float: right;
  height: 15px;
  width: 15px;
  margin-top: 10px;
}

.forecast-icon {
  height: 10px;
  width: 10px;
  border-style: solid;
  border-color: black;
  border-width: 0px 1px 1px 0px;
  transform: rotate(45deg);
}

// .forecast-icon:hover {
.show-forecast-btn:hover .forecast-icon {
  border-bottom-width: 2px;
  border-right-width: 2px;
}

.forecast-icon-minus {
  box-sizing: border-box;
  height: 0px;
  width: 10px;
  border-style: solid;
  border-color: black;
  border-width: 1px 0 0 0;
  margin-top: 5px;
}

.show-forecast-btn:hover .forecast-icon-minus {
  border-width: 2px 0 0 0;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -10px;
  right: -10px;
  background: whitesmoke;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  border: 1px solid black;
  cursor: pointer;
}

.circle::after {
  display: inline-block;
  content: "\00d7";
  font-size: 1.5em;
  color: gray;
}

.circle:hover::after {
  font-weight: bold;
}
</style>