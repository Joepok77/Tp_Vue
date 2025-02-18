<template>
  <div v-if="chef">
    <h1>{{ chef.name }}</h1>
    <p>Spécialité : {{ chef.specialty }}</p>

    <h2>Ses plats :</h2>
    <ul>
      <li v-for="dish in chef.dishes" :key="dish.id">
        {{ dish.name }} - {{ dish.price }}€
        <button @click="ajouterAuPanier(dish)">Ajouter au panier</button>
      </li>
    </ul>
  </div>
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
