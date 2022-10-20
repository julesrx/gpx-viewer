<script lang="ts" setup>
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';

import type { Route } from '../gpx';

const props = defineProps<{ route: Route }>();

const firstPoint = computed(() => props.route.points[0]);

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
      center: fromLonLat([firstPoint.value.lon, firstPoint.value.lat]),
      zoom: 10
    })
  });

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
