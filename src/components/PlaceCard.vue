<template>
  <div class="card">
    {{ placeWeather.name }}
  </div>
</template>

<script>
export default {
  name: "PlaceCard",
  props: {
    placeWeather: Object,
    placeForecast: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
  height: 150px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 30px auto;
  padding: 10px;
}
</style>