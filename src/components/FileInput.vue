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
  position: relative;
}

span {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 2em;
  height: var(--input-height);
  width: var(--input-height);
  cursor: pointer;
}

input {
  height: var(--input-height);
  border: 1px solid transparent !important;
}
</style>
