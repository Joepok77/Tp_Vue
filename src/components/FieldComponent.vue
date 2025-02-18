<template>
    <label v-if="data.label" :for="data.id">{{ data.label }}</label>
    <input
      :id="data.id"
      :type="data.type || 'text'"
      :placeholder="data.placeholder"
      v-model="model"
    />
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, computed } from 'vue';
  
  interface DataInterface {
    type?: string;
    id: string | number;
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
  