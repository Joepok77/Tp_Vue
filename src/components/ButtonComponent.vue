<template>
    <button :type="data.type || 'button'" :id="data.id">
      {{ data.textContent }}
    </button>
  </template>
  
  <script setup lang="ts">
  interface DataInterface {
    type?: 'submit' | 'reset' | 'button';
    id: string | number;
    textContent: string;
  }
  
  defineProps<{ data: DataInterface }>();
  </script>
  
  <style scoped>
  button {
    padding: 10px 15px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    margin: 5px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  