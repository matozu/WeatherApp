<template>
  <div class="forecast">
    &nbsp 5 day forecast
    <hr />
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
  width: 100%;
  margin-top: 10px;
  text-align: left;

  table {
    width: calc(100% + 15px);
    margin-left: -5px;
    margin-top: 10px;
    text-align: center;
    line-height: 1.5em;
  }
}
</style>