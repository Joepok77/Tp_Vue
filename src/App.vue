<template>

  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item has-text-white" to="/">🏠 Accueil</router-link>
      <router-link class="navbar-item has-text-white" to="/chefs">👨‍🍳 Cuisiniers</router-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link v-if="!isAuthenticated" class="navbar-item button is-light" to="/login">
          🔐 Connexion
        </router-link>
        
        <button v-if="isAuthenticated" @click="logout" class="navbar-item button is-danger">
          🚪 Déconnexion
        </button>
      </div>
    </div>
  </nav>


  <section v-if="isAuthenticated" class="section">
    <div class="container">
      <PanierComponent />
    </div>
  </section>

  
  <main class="section">
    <div class="container">
      <router-view></router-view>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from './stores/authStore'
import PanierComponent from './components/PanierComponent.vue' 

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.user !== null)

const logout = () => {
  authStore.logout()
}
</script>
