<template>
  <div class="container">
    <h1>Weather App</h1>
    <form>
      <input type="text" id="input-field" v-model="place" />
      <button class="add-btn" @click="addPlace">Add place</button>
    </form>
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
    addPlace(e) {
      const inputField = document.getElementById("input-field");
      e.preventDefault();
      inputField.setCustomValidity("");

      if (this.place !== "") {
        this.fetchWeatherInfo(this.place)
          .catch((e) => {
            inputField.setCustomValidity(e);
            inputField.reportValidity();
          })
          .finally(() => {
            if (inputField.validity.valid) {
              this.place = "";
            }
          });
      } else {
        inputField.setCustomValidity("enter place name");
        inputField.reportValidity();
      }
    },
  },
  created() {
    this.fetchWeatherInfo("nin");
  },
};
</script>

<style lang="scss">
.container {
  width: 50%;
  margin: auto;
  // border: 1px solid gray;
  text-align: center;
}

.add-btn {
  margin-left: 10px;
}
</style>