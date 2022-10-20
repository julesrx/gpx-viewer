<script setup lang="ts">
import { parseXml } from './xml';

const xml = ref<string>();

type Route = {
  name?: string;
  createdDate?: string;
  points: Coordinate[];
  trace: Trace;
};

type Coordinate = {
  name?: string;
  lat: number;
  lon: number;
};

type Trace = {
  segments: Segment[];
};

type Segment = {
  lat: number;
  lon: number;
};

const route = reactive<Route>({ points: [], trace: { segments: [] } });

const onChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (!input.files || !input.files.length) return;

  const gpx = input.files[0];

  const rd = new FileReader();
  rd.readAsText(gpx);

  rd.onload = () => {
    xml.value = rd.result as string;
    const doc = parseXml(xml.value);

    route.name = doc.querySelector('metadata > name')?.innerHTML;
    route.createdDate = doc.querySelector('metadata > time')?.innerHTML;

    for (const point of doc.querySelectorAll('rte rtept')) {
      route.points.push({
        name: point.querySelector('name')?.innerHTML,
        lat: Number(point.getAttribute('lat')!),
        lon: Number(point.getAttribute('lon')!)
      });
    }

    for (const segment of doc.querySelectorAll('trk trkseg trkpt')) {
      route.trace.segments.push({
        lat: Number(segment.getAttribute('lat')!),
        lon: Number(segment.getAttribute('lon')!)
      });
    }
  };
};
</script>

<template>
  <input type="file" @change="onChange" />

  <template v-if="xml">
    <h1>{{ route.name }}</h1>
    <p>Created {{ route.createdDate }}</p>

    <h3>Points of interest</h3>
    <ul>
      <li v-for="(p, i) in route.points" :key="i">lat: {{ p.lat }}, lon: {{ p.lon }}</li>
    </ul>

    <h3>Trace segments</h3>
    <ul>
      <li v-for="(s, i) in route.trace.segments" :key="i">lat: {{ s.lat }}, lon: {{ s.lon }}</li>
    </ul>

    <pre>{{ xml }}</pre>
  </template>
</template>
