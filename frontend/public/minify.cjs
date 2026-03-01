const fs = require('fs');

const file = process.argv[2];
if (!file) {
    console.error('Please pass a file argument.');
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

function roundCoords(coords) {
    if (typeof coords[0] === 'number') {
        const x = coords[0];
        const y = coords[1];
        // Round to 3 decimal places (approx 100m precision)
        return [Math.round(x * 1000) / 1000, Math.round(y * 1000) / 1000];
    }
    return coords.map(roundCoords);
}

if (data.features) {
    data.features.forEach(f => {
        if (f.geometry && f.geometry.coordinates) {
            f.geometry.coordinates = roundCoords(f.geometry.coordinates);
        }
        // strip unnecessary large property fields to save space
        if (f.properties) {
            const keep = {
                NAME_1: f.properties.NAME_1 || f.properties.name || f.properties.st_nm
            };
            f.properties = keep;
        }
    });
}

const out = file.replace('.json', '-min.json');
fs.writeFileSync(out, JSON.stringify(data));
console.log('Saved minified file to', out);
