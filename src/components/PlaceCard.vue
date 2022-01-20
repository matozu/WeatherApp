<template>
  <div class="card">
    <div class="header-left">
      {{ placeWeather.name }}, {{ placeWeather.weather[0].description }}
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
        {{ windDirectionCalc(placeWeather.wind.deg) }}
      </div>
      <!-- <div style="clear: both"></div> -->
    </div>

    <div class="show-forecast-btn" @click="toggleShowForecast">
      <div
        :class="showForecast ? 'forecast-icon-minus' : 'forecast-icon'"
      ></div>
    </div>
    <div style="clear: both"></div>

    <div class="forecast" v-show="showForecast">
      5 day forecast
      <table>
        <tr>
          <th v-for="day in placeForecast" key="day.dt">{{ day.day }}</th>
        </tr>
        <tr>
          <td v-for="day in placeForecast" key="day.dt">
            {{ calcTemp(day.main.temp) }}
          </td>
        </tr>
        <tr>
          <td v-for="day in placeForecast" key="day.dt">
            {{ day.weather[0].main }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import fetchData from "../adapter";

export default {
  name: "PlaceCard",
  props: {
    placeWeather: {
      type: Object,
      default: { type: "" },
    },
  },
  data() {
    return {
      placeForecast: [],
      showForecast: false,
    };
  },
  methods: {
    // k=>°c
    calcTemp: (tempK) => {
      return Math.round(Number(tempK) - 273.15);
    },
    // m/s => km/h
    calcWindSpeed(ms_speed) {
      return Math.round(ms_speed * 3.6 * 10) / 10;
    },
    getIconUrl(icon) {
      return "http://openweathermap.org/img/w/" + icon + ".png";
    },
    windDirectionCalc(deg) {
      var val = Math.floor(deg / 22.5 + 0.5);
      var arr = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
      ];
      return arr[val % 16];
    },
    toggleShowForecast() {
      this.showForecast = !this.showForecast;
    },
    async fetchPlaceForecast() {
      const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const data = await fetchData(this.placeWeather.name, "forecast");

      for (let i = 7; i <= data.list.length; i += 8) {
        let dt = new Date(data.list[i].dt_txt);
        data.list[i].day = weekday[dt.getDay()];

        this.placeForecast.push(data.list[i]);
      }
    },
  },
  created() {
    this.fetchPlaceForecast();
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
  // border: 1px solid gray;
  border-radius: 5px;
  margin: 30px auto;
  padding: 10px;
  background: gainsboro;
  overflow: auto;
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
  // border: 1px solid black;
  overflow: auto;
}

.main-temp {
  font-size: 4em;
  right: 5px;
  float: left;
  // border: 1px solid black;
}

.main-right {
  // border: 1px solid black;
  float: right;
  text-align: left;
}

.show-forecast-btn {
  padding: 10px;
  border: none;
  cursor: pointer;
  float: right;
}

.forecast-icon {
  box-sizing: border-box;
  height: 10px;
  width: 10px;
  border-style: solid;
  border-color: black;
  border-width: 0px 1px 1px 0px;
  transform: rotate(45deg);
  // transition: border-width 200ms ease-in-out;
}

.forecast-icon:hover {
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
  // transition: border-width 200ms ease-in-out;
}

.forecast-icon-minus:hover {
  border-width: 2px 0 0 0;
}

.forecast {
  // border: 1px solid gray;
  margin-top: 10px;
  padding: 5px;
  overflow: auto;
  text-align: left;

  table {
    width: 100%;
    margin-top: 10px;
  }
}
</style>