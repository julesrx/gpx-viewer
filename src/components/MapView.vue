<script lang="ts" setup>
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import type { Route, Coordinate } from '../gpx';

const props = defineProps<{ route: Route }>();

const firstPoint = computed(() => props.route.points[0]);
const average = computed<Coordinate>(() => {
  const pointCount = props.route.points.length;
  const lonAv = props.route.points.map(p => p.lon).reduce((a, b) => a + b, 0) / pointCount;
  const latAv = props.route.points.map(p => p.lat).reduce((a, b) => a + b, 0) / pointCount;

  return {
    lon: lonAv,
    lat: latAv
  };
});

let map: Map;
onMounted(() => {
  map = new Map({
    target: 'map-view',
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: fromLonLat([average.value.lon, firstPoint.value.lat]),
      zoom: 10
    })
  });

  const source = new VectorSource();
  const layer = new VectorLayer({ source: source });

  source.clear(true);
  for (const point of props.route.points) {
    source.addFeatures([new Feature(new Point(fromLonLat([point.lon, point.lat])))]);
  }

  map.addLayer(layer);

  console.log(map);
});
</script>

<template>
  <div id="map-view" class="is-full-width"></div>
</template>

<style scoped>
#map-view {
  height: calc(100vh - var(--input-height));
}
</style>
