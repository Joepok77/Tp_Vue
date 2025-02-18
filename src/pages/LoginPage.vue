<template>
    <main class="login_main">

        <h1>Login page</h1>
        <form @submit.prevent="submitHandler">
            <section>
                <article>
                    <label for="email"></label>
                    <input 
                    v-model="email"
                    type="email"
                    id="email"
                    placeholder="Entrer votre email"
                    class="input">
                </article>
            </section>
            <section>
                <article>
                    <label for="password"></label>
                    <input v-model="password" type="password" id="password"
                    placeholder="Entrer votre mdp"
                    class="input">
                    
                </article>
            </section>
            <section>
                <button type="submit"
                class="button is-primary">Valider</button>
                <button type="reset" class="button is-danger">Réinitialiser</button>
            </section>
        </form>
    </main>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import inputValidator from '../utils/input-validator';
import  {useRouter} from "vue-router"
import { useAuthStore } from '../stores/authStore'
const authStore = useAuthStore()

const router= useRouter()

const email= ref('')
const password= ref('')



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

        authStore.login({ id: user.id, name: user.name, email: user.email }) // ✅ Ajoute le nom
        router.push('/')
    } catch (error) {
        console.error("Erreur lors de la connexion :", error)
        alert("Problème de connexion, vérifiez users.json et le serveur")
    }
}


const inputHandler = function(){

}
</script>

<style lang="scss" scoped>
.login_main{

}</style>