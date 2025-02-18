<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-3 has-text-centered has-text-primary">👨‍🍳 Nos cuisiniers</h1>

      
      <div v-if="chefs.length" class="columns is-multiline">
        <div v-for="chef in chefs" :key="chef.id" class="column is-4">
          <div class="card">
            
          
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="chef.image || defaultImage" :alt="chef.name">
              </figure>
            </div>

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

     
      <p v-else class="has-text-centered has-text-grey">⏳ Chargement des cuisiniers...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const chefs = ref([]);


const defaultImage = "/placeholder.png"; 

onMounted(async () => {
  try {
    const response = await fetch('/chefs.json'); 
    chefs.value = await response.json();
  } catch (error) {
    console.error("Erreur de chargement des cuisiniers :", error);
  }
});

const viewChef = (id) => {
  router.push(`/chef/${id}`); 
};
</script>

