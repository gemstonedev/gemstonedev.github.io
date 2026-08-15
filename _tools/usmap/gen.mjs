// Generate simplified lower-48 SVG paths (Albers USA, pre-projected 975x610)
// plus projected marker coordinates for the five GEMSTONE sites.
import { readFileSync, writeFileSync } from 'node:fs';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import * as topojson from 'topojson-client';
import { presimplify, quantile, simplify } from 'topojson-simplify';

const topo = JSON.parse(readFileSync('node_modules/us-atlas/states-albers-10m.json', 'utf8'));

// drop Alaska (02), Hawaii (15), PR (72) — all sites are in the lower 48
topo.objects.states.geometries = topo.objects.states.geometries.filter(
  g => !['02', '15', '72'].includes(g.id)
);

// simplify: keep the strongest ~4% of points
let t = presimplify(topo);
t = simplify(t, quantile(t, 0.88));

const path = geoPath(); // geometry is pre-projected
const round = s => s.replace(/(\d+)\.\d+/g, '$1');

const nation = topojson.merge(t, t.objects.states.geometries);
const borders = topojson.mesh(t, t.objects.states, (a, b) => a !== b);

const nationPath = round(path(nation));
const bordersPath = round(path(borders));

const [[x0, y0], [x1, y1]] = path.bounds(nation);

// same projection us-atlas used to bake the geometry
const proj = geoAlbersUsa().scale(1300).translate([487.5, 305]);
const sites = {
  'Stanford University': [-122.1697, 37.4275],
  'Emerald Cloud Lab': [-97.7431, 30.2672],
  'Purdue University': [-86.9081, 40.4259],
  'Morehouse College': [-84.3880, 33.7490],
  'U.S. Pharmacopeia': [-77.1528, 39.0840],
};
const markers = Object.fromEntries(
  Object.entries(sites).map(([k, ll]) => {
    const [x, y] = proj(ll);
    return [k, [Math.round(x * 10) / 10, Math.round(y * 10) / 10]];
  })
);

writeFileSync('out.json', JSON.stringify({
  bounds: [x0, y0, x1, y1].map(v => Math.round(v * 10) / 10),
  markers,
  nationLen: nationPath.length,
  bordersLen: bordersPath.length,
}, null, 2));
writeFileSync('nation.txt', nationPath);
writeFileSync('borders.txt', bordersPath);
console.log(readFileSync('out.json', 'utf8'));
