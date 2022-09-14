const fs = require("fs");

const fileName = "./countries.txt";
const data = fs.readFileSync(fileName, "utf8").split("\n");
data.shift();

let newData = [];
let countriesArr = [];

for (let i = 0; i < data.length - 1; i++) {
  newData = data[i].split(" ");
  title = newData
    .splice(0, newData.length - 2)
    .join()
    .replace(/,/g, " ");
  area = newData[newData.length - 1].replace(/,/g, "");
  population = newData[newData.length - 2].replace(/,/g, "");
  density = parseFloat(population / area).toFixed(0);

  const countries = {
    country: title,
    population: population,
    area: area,
    density: density,
  };
  countriesArr.push(countries);
}

const orderedCountries = countriesArr.sort((a, b) => b.density - a.density);

let convertedArr;
for (let i = 0; i < orderedCountries.length; i++) {
  if (i == 0) convertedArr += Object.keys(orderedCountries[i]).join(";") + "\n";

  convertedArr +=
    Object.keys(orderedCountries[i])
      .map(function (key) {
        return orderedCountries[i][key];
      })
      .join(";") + "\n";
}

console.log(convertedArr);
fs.writeFileSync("countriesDensity.csv", convertedArr, "utf8");
