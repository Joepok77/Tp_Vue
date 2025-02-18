<template>
  <main>
    <!-- Si l'utilisateur n'est PAS connecté, on affiche "Bienvenue sur HomeMade" -->
    <h1 v-if="!authStore.user">👋 Bienvenue sur HomeMade</h1>

    <!-- Si l'utilisateur EST connecté, on affiche "Bienvenue, Johan !" -->
    <p v-if="authStore.user">👋 Bienvenue, {{ authStore.user.name }} !</p>

    <p>Découvrez nos cuisiniers et leurs plats délicieux !</p>
    
    <router-link to="/chefs">
      <button>Voir les cuisiniers</button>
    </router-link>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
const authStore = useAuthStore()
</script>
