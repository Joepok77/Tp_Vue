<template>
  <nav>
    <router-link to="/">Accueil</router-link> |
    <router-link to="/chefs">Cuisiniers</router-link> |
    <router-link to="/login" v-if="!isAuthenticated">Connexion</router-link>
    <button v-if="isAuthenticated" @click="logout">Déconnexion</button>
  </nav>

  <!-- Afficher le panier ici -->
  <PanierComponent v-if="isAuthenticated" />

  <main>
    <router-view></router-view>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from './stores/authStore'
import PanierComponent from './components/PanierComponent.vue' // 🔄 Import correct

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.user !== null)

const logout = () => {
  authStore.logout()
}
</script>
