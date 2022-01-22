<template>
  <div class="forecast">
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
</template>

<script>
import { calcTemp } from "../tools";

export default {
  name: "Forecast",
  props: {
    placeForecast: Array,
  },
  methods: {
    calcTemp,
  },
};
</script>

<style lang="scss" scoped>
.forecast {
  //   border: 1px solid gray;
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