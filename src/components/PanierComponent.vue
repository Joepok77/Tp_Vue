<template>
    <div>
      <h2>🛒 Panier</h2>
      <ul v-if="cartStore.items.length > 0">
        <li v-for="item in cartStore.items" :key="item.id">
          {{ item.name }} - {{ item.price }}€
          <button @click="removeFromCart(item.id)">❌</button>
        </li>
      </ul>
      <p v-else>Votre panier est vide.</p>
      <p>Total: {{ cartStore.totalPrice }}€</p>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from '../stores/cartStore';
  
  const cartStore = useCartStore();
  
  const removeFromCart = (itemId) => {
    cartStore.removeFromCart(itemId);
  };
  </script>
  