<template>
  <div>
    <!-- Bouton flottant pour ouvrir le panier -->
    <button class="cart-button" @click="togglePanier">
      🛒 Mon Panier ({{ panier.length }})
    </button>

    <!-- Sidebar du panier -->
    <div class="cart-sidebar" :class="{ 'open': isOpen }">
      <button class="close-button" @click="togglePanier">❌</button>
      <h1>🛒 Mon Panier</h1>

      <ul v-if="panier.length > 0">
        <li v-for="produit in panier" :key="produit.id">
          {{ produit.name }} - {{ produit.price }}€ (x{{ produit.quantite }}) 
          <button @click="supprimerUnProduit(produit.id)">➖</button>
          <button @click="supprimerDuPanier(produit.id)">❌</button>
        </li>
      </ul>

      <p v-else>Votre panier est vide.</p>

      <h2>Total : {{ totalPrix }}€</h2>
      <button @click="validerCommande" class="validate-button">
        ✅ Valider ma commande
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useCartStore } from "../stores/cartStore";

const cartStore = useCartStore();
const isOpen = ref(false);

const panier = computed(() => cartStore.panier);
const totalPrix = computed(() =>
  panier.value.reduce((total, produit) => total + produit.price * produit.quantite, 0)
);

const togglePanier = () => {
  isOpen.value = !isOpen.value;
};

const supprimerUnProduit = (produitId: number) => {
  cartStore.supprimerUnProduit(produitId);
};

const supprimerDuPanier = (produitId: number) => {
  cartStore.supprimerDuPanier(produitId);
};

const validerCommande = () => {
  alert("Commande validée (simulation) !");
};
</script>

<style scoped>
/* Bouton flottant en bas à droite */
.cart-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
}
.cart-button:hover {
  background-color: #0056b3;
}

/* Sidebar du panier */
.cart-sidebar {
  position: fixed;
  top: 0;
  right: -300px; /* Caché par défaut */
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transition: right 0.3s ease-in-out;
  overflow-y: auto;
}
.cart-sidebar.open {
  right: 0; /* S'affiche */
}

/* Bouton de fermeture */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

/* Bouton validation */
.validate-button {
  background-color: green;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
}
.validate-button:hover {
  background-color: darkgreen;
}
</style>
