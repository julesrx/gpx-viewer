<script lang="ts" setup>
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';

import type { Route, Coordinate } from '~/types';

const props = defineProps<{ route: Route }>();

const firstPoint = computed(() => props.route.points[0]);
const lastPoint = computed(() => props.route.points[props.route.points.length - 1]);

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
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: fromLonLat([average.value.lon, average.value.lat]),
      zoom: 10
    })
  });

  drawPoints(map, props.route.points);
  drawTrace(map, props.route.trace.segments, firstPoint.value, lastPoint.value);
});

onUnmounted(() => map?.dispose());
</script>

<template>
  <div id="map-view"></div>
</template>

<style>
#map-view {
  height: calc(100vh - var(--input-height));
}
</style>
