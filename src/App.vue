<template>
  <div class="container">
    <h1>Weather App</h1>
    <form>
      <input type="text" id="input-field" v-model="place" />
      <button type="submit" class="add-btn" @click="addPlace">Add place</button>
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
    ...mapActions(["fetchWeather"]),
    addPlace(e) {
      const inputField = document.getElementById("input-field");
      e.preventDefault();
      inputField.setCustomValidity("");

      if (this.place !== "") {
        this.fetchWeather(this.place)
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
    this.fetchWeather("nin");
    this.fetchWeather("knin");
    this.fetchWeather("nina");
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}

html {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

body {
  font-family: "Poppins", sans-serif;
}

.container {
  width: 100%;
  margin: auto;
  text-align: center;
}

.add-btn {
  margin-left: 10px;
}
</style>