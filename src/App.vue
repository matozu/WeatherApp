<template>
  <div class="container">
    <h1>Weather App</h1>
    <input type="text" v-model="place" />
    <button @click="addPlace">add</button>
    <place-card v-for="place in getPlaces" :placeWeather="place"> </place-card>
  </div>
</template>

<script>
import PlaceCard from "./components/PlaceCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    PlaceCard,
  },
  data() {
    return {
      place: "",
    };
  },
  computed: {
    ...mapGetters(["getPlaces"]),
  },
  methods: {
    ...mapActions(["fetchWeatherInfo"]),
    addPlace() {
      if (this.place !== "") {
        this.fetchWeatherInfo(this.place);
        this.place = "";
      }
    },
  },
  created() {
    this.fetchWeatherInfo("pula");
  },
};
</script>

<style lang="scss">
.container {
  width: 50%;
  margin: auto;
  border: 1px solid gray;
  text-align: center;
}
</style>