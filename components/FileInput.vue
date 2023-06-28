<script lang="ts" setup>
const emit = defineEmits<{ (e: 'change', v: Event): void }>();

const input = ref<HTMLInputElement>();
const onClear = () => {
  if (!input.value) return;
  input.value.value = '';
  input.value.files = null;
  input.value.dispatchEvent(new Event('change'));
};
</script>

<template>
  <div>
    <input
      ref="input"
      type="file"
      @change="e => emit('change', e)"
      accept="application/xml,.xml,.gpx"
    />

    <span @click="onClear">&times;</span>
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--input-height);
  padding: 0 0.5em;
}

span {
  cursor: pointer;
  font-size: 2em;
}

input {
  border: none;
}
</style>
