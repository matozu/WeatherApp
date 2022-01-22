export function calcTemp(tempK) {
    return Math.round(Number(tempK) - 273.15);
  }

  // m/s => km/h
export function calcWindSpeed(ms_speed) {
    return Math.round(ms_speed * 3.6 * 10) / 10;
  }

export function getIconUrl(icon) {
    return `http://openweathermap.org/img/w/${icon}.png`;
  }

export function calcWindDirection(deg) {
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
}
