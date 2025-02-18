<template>
    <main class="login-container">
        <div class="card">
            <div class="card-content">
                <h1 class="title is-4 has-text-centered">🔐 Connexion</h1>

                <form @submit.prevent="submitHandler">
                 
                    <div class="field">
                        <label for="email" class="label">Email</label>
                        <div class="control">
                            <input 
                                v-model="email"
                                type="email"
                                id="email"
                                placeholder="Entrez votre email"
                                class="input">
                        </div>
                    </div>

                 
                    <div class="field">
                        <label for="password" class="label">Mot de passe</label>
                        <div class="control">
                            <input 
                                v-model="password" 
                                type="password" 
                                id="password"
                                placeholder="Entrez votre mot de passe"
                                class="input">
                        </div>
                    </div>

                  
                    <div class="field is-grouped is-grouped-centered">
                        <div class="control">
                            <button type="submit" class="button is-primary">Valider</button>
                        </div>
                        <div class="control">
                            <button type="reset" class="button is-danger">Réinitialiser</button>
                        </div>
                    </div>
                </form>

              
                <div class="has-text-centered mt-4">
                    <button @click="goToRegister" class="button is-link is-light">
                        Vous n'avez pas de compte ? Inscrivez-vous
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import inputValidator from '../utils/input-validator'
import { useRouter } from "vue-router"
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

watch(email, (val) => {
    console.log(val, inputValidator(val, 'email'))
})
watch(password, (val) => {
    console.log(val, inputValidator(val, 'password'))
})

const submitHandler = async () => {
    try {
        const result = await fetch('/users.json')
        if (!result.ok) {
            throw new Error('Erreur de chargement du fichier users.json')
        }

        const users = await result.json()
        const user = users.find((user: any) => user.email === email.value)

        if (!user) {
            alert('Utilisateur non trouvé')
            return
        }

        if (user.password !== password.value) {
            alert('Mot de passe incorrect')
            return
        }

        console.log('Connexion réussie')

        authStore.login({ id: user.id, name: user.name, email: user.email }) 
        router.push('/')
    } catch (error) {
        console.error("Erreur lors de la connexion :", error)
        alert("Problème de connexion, vérifiez users.json et le serveur")
    }
}


const goToRegister = () => {
    router.push('/register')
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
}

.login-card {
    width: 400px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: white;
}
</style>
