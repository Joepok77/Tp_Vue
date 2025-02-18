<template>
  <section class="section">
    <div class="container">
      <div v-if="chef">
        <h1 class="title is-3 has-text-primary">{{ chef.name }}</h1>
        <p class="subtitle is-5">👨‍🍳 Spécialité : <strong>{{ chef.specialty }}</strong></p>

        <h2 class="title is-4 mt-5">🍽 Ses plats :</h2>
        
        <div class="columns is-multiline">
          <div v-for="dish in chef.dishes" :key="dish.id" class="column is-4">
            <div class="card">
              <div class="card-content">
                <p class="title is-5">{{ dish.name }}</p>
                <p class="subtitle is-6">{{ dish.price }}€</p>
                <button class="button is-primary is-fullwidth mt-2" @click="ajouterAuPanier(dish)">
                  Ajouter au panier 🛒
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../stores/cartStore';

const route = useRoute();
const cartStore = useCartStore();
const chef = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('/chefs.json'); // Charge la liste des chefs
    const chefs = await response.json();
    chef.value = chefs.find(c => c.id === parseInt(route.params.id));
  } catch (error) {
    console.error("Erreur lors du chargement des chefs :", error);
  }
});

const ajouterAuPanier  = (dish) => {
  cartStore.ajouterAuPanier (dish);
};
</script>
