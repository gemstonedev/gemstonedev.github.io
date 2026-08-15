# US map generator

Regenerates the base map in `_includes/us-lower48.svg` and the projected
site coordinates (`map_x` / `map_y` in `_data/partners.yml`) used by the
team-page map (`_includes/team-map.html`).

Edit the `sites` list in `gen.mjs` if institutions change, then:

```
npm install d3-geo topojson-client topojson-simplify us-atlas
node gen.mjs
```

`nation.txt` and `borders.txt` hold the two path `d` strings for the SVG
include; `out.json` prints the marker coordinates to paste into partners.yml.

The `_tools` directory is not published (Jekyll skips underscore directories).
