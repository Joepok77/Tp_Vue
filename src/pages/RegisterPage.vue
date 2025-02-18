<template>
    <main class="register-container">
        <div class="card">
            <div class="card-content">
                <h1 class="title is-4 has-text-centered">📝 Inscription</h1>

                <form @submit.prevent="submitHandler">
                    <!-- Champs du formulaire -->
                    <div class="field" v-for="field in fields" :key="field.id">
                        <label :for="field.id" class="label">{{ field.label }}</label>
                        <div class="control">
                            <input 
                                v-model="form[field.id]" 
                                :type="field.type" 
                                :id="field.id" 
                                :placeholder="field.placeholder" 
                                class="input"
                            />
                        </div>
                        <p v-if="errors[field.id]" class="help is-danger">{{ errors[field.id] }}</p>
                    </div>

                    <!-- Boutons -->
                    <div class="field is-grouped is-grouped-centered">
                        <div class="control">
                            <button type="submit" class="button is-primary">S'inscrire</button>
                        </div>
                        <div class="control">
                            <button type="reset" class="button is-danger">Réinitialiser</button>
                        </div>
                    </div>
                </form>

                <!-- 🔹 Lien vers la connexion -->
                <div class="has-text-centered mt-4">
                    <button @click="goToLogin" class="button is-link is-light">
                        Déjà un compte ? Se connecter
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import inputValidator from '../utils/input-validator'
import FieldComponent from '../components/FieldComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'

const router = useRouter()
const form = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const errors = ref<{ [key: string]: string }>({})

// Champs du formulaire
const fields = [
    { id: 'username', type: 'text', placeholder: 'Entre ton pseudo' },
    { id: 'email', type: 'email', placeholder: 'Entre ton email' },
    { id: 'password', type: 'password', placeholder: 'Choisis un mot de passe' },
    { id: 'confirmPassword', type: 'password', placeholder: 'Confirme ton mot de passe' }
]

// Boutons du formulaire
const buttons = [
    { id: 'register-button', type: 'submit', textContent: "S'inscrire" },
    { id: 'reset-button', type: 'reset', textContent: 'Réinitialiser' }
]

// Validation en temps réel
watch(() => form.value.email, (val) => {
    errors.value.email = inputValidator(val, 'email') ? '' : 'Email invalide'
})

watch(() => form.value.password, (val) => {
    errors.value.password = inputValidator(val, 'password') ? '' : 'Mot de passe trop faible'
})

watch(() => form.value.confirmPassword, (val) => {
    errors.value.confirmPassword = val === form.value.password ? '' : 'Les mots de passe ne correspondent pas'
})

// Fonction de soumission
const submitHandler = () => {
    if (Object.values(errors.value).some(error => error !== '')) {
        alert('Veuillez corriger les erreurs avant de vous inscrire')
        return
    }

    alert('Inscription réussie 🚀')
    router.push('/login')
}

// Redirection vers la connexion
const goToLogin = () => {
    router.push('/login')
}
</script>

<style scoped>
.register-container {
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
