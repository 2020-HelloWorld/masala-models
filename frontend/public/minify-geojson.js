const fs = require('fs');
const file = process.argv[2];
const data = JSON.parse(fs.readFileSync(file));

function roundCoords(coords) {
  if (typeof coords[0] === 'number') {
    return [Number(coords[0].toFixed(3)), Number(coords[1].toFixed(3))];
  }
  return coords.map(roundCoords);
}

data.features.forEach(f => {
  if (f.geometry && f.geometry.coordinates) {
    f.geometry.coordinates = roundCoords(f.geometry.coordinates);
  }
});

fs.writeFileSync(file.replace('.json', '-min.json'), JSON.stringify(data));
console.log('Done minifying.');
