<script setup lang="ts">
import type { Route } from './gpx';
import { parseXml } from './xml';
import { getRoute } from './gpx';
import FileInput from './components/FileInput.vue';
import MapView from './components/MapView.vue';

const route = ref<Route | null>(null);

const onChange = (e: Event) => {
  route.value = null;

  const input = e.target as HTMLInputElement;
  if (!input.files || !input.files.length) return;

  const gpx = input.files[0];

  const rd = new FileReader();
  rd.readAsText(gpx);

  rd.onload = () => {
    const xml = rd.result as string;
    const doc = parseXml(xml);
    route.value = getRoute(doc);
  };
};
</script>

<template>
  <FileInput @change="onChange" />
  <MapView :route="route" v-if="route" />
</template>
