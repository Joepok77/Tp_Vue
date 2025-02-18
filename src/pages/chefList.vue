<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-3 has-text-centered has-text-primary">👨‍🍳 Nos cuisiniers</h1>

      <!-- Si des chefs sont disponibles -->
      <div v-if="chefs.length" class="columns is-multiline">
        <div v-for="chef in chefs" :key="chef.id" class="column is-4">
          <div class="card">
            <div class="card-content">
              <h2 class="title is-4">{{ chef.name }}</h2>
              <p class="subtitle is-6">Spécialité : <strong>{{ chef.specialty }}</strong></p>

              <router-link :to="'/chef/' + chef.id">
                <button class="button is-link is-fullwidth">Voir les spécialités 🍽</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Message de chargement si aucun chef n'est encore chargé -->
      <p v-else class="has-text-centered has-text-grey">⏳ Chargement des cuisiniers...</p>
    </div>
  </section>
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
  