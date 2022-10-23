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
import LineString from 'ol/geom/LineString';

import type { Route, Coordinate, Segment } from '../gpx';

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
  for (const { lon, lat } of props.route.points) {
    const point = new Point(fromLonLat([lon, lat]));
    source.addFeature(new Feature(point));
  }

  const grouped = props.route.trace.segments.reduce<[Segment, Segment][]>((group, segment, i) => {
    if (group.length && (i + 1) % 2 === 0) {
      group[group.length - 1] = [group[group.length - 1][0], segment];
    } else {
      group.push([segment, { lat: 0, lon: 0 }]);
    }

    return group;
  }, []);

  for (const group of grouped) {
    if (group[1].lon === 0 && group[1].lat === 0) continue;

    const line = new LineString([
      fromLonLat([group[0].lon, group[0].lat]),
      fromLonLat([group[1].lon, group[1].lat])
    ]);

    source.addFeature(new Feature(line));
  }

  map.addLayer(layer);
});

onUnmounted(() => map?.dispose());
</script>

<template>
  <div id="map-view" class="is-full-width"></div>
</template>

<style scoped>
#map-view {
  height: calc(100vh - var(--input-height));
}
</style>
