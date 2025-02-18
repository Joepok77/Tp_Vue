<template>
  <main class="section">
    <div class="container has-text-centered">
      <!-- Si l'utilisateur n'est PAS connecté -->
      <h1 v-if="!authStore.user" class="title is-3">👋 Bienvenue sur <span class="has-text-primary">HomeMade</span></h1>

      <!-- Si l'utilisateur EST connecté -->
      <p v-if="authStore.user" class="subtitle is-4">👋 Bienvenue, <strong>{{ authStore.user.name }}</strong> !</p>

      <p class="mt-3">Découvrez nos cuisiniers et leurs plats délicieux !</p>

      <router-link to="/chefs">
        <button class="button is-primary mt-4">Voir les cuisiniers</button>
      </router-link>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
const authStore = useAuthStore()
</script>
