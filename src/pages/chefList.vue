<template>
    <main class="chefs-list">
      <h1>Nos cuisiniers</h1>
      <section v-if="chefs.length">
        <article v-for="chef in chefs" :key="chef.id" class="chef-card">
          <h2>{{ chef.name }}</h2>
          <p>Spécialité : {{ chef.specialty }}</p>
            <router-link :to="'/chef/' + chef.id">
  Voir les spécialités de {{ chef.name }}
</router-link>

        </article>
      </section>
      <p v-else>Chargement des cuisiniers...</p>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const chefs = ref([]);
  
  onMounted(async () => {
    try {
      const response = await fetch('/chefs.json'); // 📁 Fichier JSON avec les cuisiniers
      chefs.value = await response.json();
    } catch (error) {
      console.error("Erreur de chargement des cuisiniers :", error);
    }
  });
  
  const viewChef = (id) => {
    router.push(`/chef/${id}`); // 🔗 Redirige vers la page du cuisinier
  };
  </script>
  
  <style scoped>
  .chef-card {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
  }
  </style>
  