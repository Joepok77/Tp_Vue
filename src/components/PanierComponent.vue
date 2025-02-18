<template>
  <div>
    <!-- Bouton flottant pour ouvrir le panier -->
    <button class="button is-primary cart-button" @click="togglePanier">
      🛒 Mon Panier ({{ panier.length }})
    </button>

    <!-- Sidebar du panier -->
    <div class="cart-sidebar box" :class="{ 'open': isOpen }">
      <button class="delete close-button" @click="togglePanier"></button>
      <h1 class="title is-5">🛒 Mon Panier</h1>

      <ul v-if="panier.length > 0">
        <li v-for="produit in panier" :key="produit.id" class="mb-3">
          <span class="has-text-weight-semibold">{{ produit.name }}</span> - 
          <span class="has-text-success">{{ produit.price }}€</span> (x{{ produit.quantite }})
          <div class="buttons mt-2">
            <button class="button is-warning is-small" @click="supprimerUnProduit(produit.id)">➖</button>
            <button class="button is-danger is-small" @click="supprimerDuPanier(produit.id)">❌</button>
          </div>
        </li>
      </ul>

      <p v-else class="has-text-danger">Votre panier est vide.</p>

      <h2 class="title is-6 mt-4">Total : <span class="has-text-success">{{ totalPrix }}€</span></h2>
      <button @click="validerCommande" class="button is-success is-fullwidth mt-3">
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
  border-radius: 50px;
  font-size: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Sidebar du panier */
.cart-sidebar {
  position: fixed;
  top: 70px; /* Ajustement pour éviter de chevaucher la navbar */
  right: -320px; /* Caché par défaut */
  width: 320px;
  height: 90vh;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transition: right 0.3s ease-in-out;
  overflow-y: auto;
}
.cart-sidebar.open {
  right: 20px; /* S'affiche */
  border-radius: 8px;
}

/* Bouton de fermeture */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* Boutons de gestion des produits */
.button.is-warning {
  background-color: orange;
}
.button.is-warning:hover {
  background-color: darkorange;
}
</style>
