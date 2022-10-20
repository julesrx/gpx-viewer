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
import { circular } from 'ol/geom/Polygon';

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
