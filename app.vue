<script setup lang="ts">
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

<style>
:root {
  --input-height: 45px;
}

html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

body {
  margin: 0;
  padding: 0;
  color: #f5f5f5;
  background-color: #242424;
}
</style>
