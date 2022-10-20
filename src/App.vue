<script setup lang="ts">
import { parseXml } from './xml';
import { getRoute } from './gpx';
import type { Route } from './gpx';

const xml = ref<string>();
const route = ref<Route>();

const onChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (!input.files || !input.files.length) return;

  const gpx = input.files[0];

  const rd = new FileReader();
  rd.readAsText(gpx);

  rd.onload = () => {
    xml.value = rd.result as string;
    const doc = parseXml(xml.value);
    route.value = getRoute(doc);
  };
};
</script>

<template>
  <input type="file" @change="onChange" />

  <template v-if="route">
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
