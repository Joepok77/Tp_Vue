<template>
    <div>
        <h1>Liste des Produits</h1>
        <ul>
            <li v-for="produit in produits" :key="produit.id">
                {{ produit.name }} - {{ produit.price }}€
                <button @click="ajouterAuPanier(produit)">🛍️ Ajouter au panier</button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const produits = [
    { id: 1, name: "Pizza", price: 10 },
    { id: 2, name: "Burger", price: 8 },
    { id: 3, name: "Sushi", price: 12 }
]

const ajouterAuPanier = (produit: any) => {
    cartStore.ajouterAuPanier(produit)
}
</script>
