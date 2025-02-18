<template>
  <nav>
    <router-link to="/">Accueil</router-link> |
    <router-link to="/chefs">Cuisiniers</router-link> |
    <router-link to="/login" v-if="!isAuthenticated">Connexion</router-link>
    <button v-if="isAuthenticated" @click="logout">Déconnexion</button>
  </nav>

  <main>
    <router-view></router-view> <!-- C'est ici que LoginPage doit s'afficher -->
  </main>
</template>

<script setup>
import { useAuthStore } from './stores/authStore';
import { computed } from 'vue';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.user !== null);

const logout = () => {
  authStore.logout();
};
</script>


