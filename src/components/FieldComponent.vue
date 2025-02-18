<template>
    <div class="field">
      <label v-if="data.label" :for="data.id" class="label">{{ data.label }}</label>
      <div class="control">
        <input
          :id="data.id"
          :type="data.type || 'text'"
          :placeholder="data.placeholder"
          v-model="model"
          class="input"
        />
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { computed } from 'vue';
  
  interface DataInterface {
    type?: string;
    id: any
    placeholder: string;
    label?: string;
  }
  
  interface FieldComponentProps {
    data: DataInterface;
    modelValue: string;
  }
  
  const props = defineProps<FieldComponentProps>();
  const emit = defineEmits(['update:modelValue']);
  
  const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });
  </script>
  
  <style scoped>
  input {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  