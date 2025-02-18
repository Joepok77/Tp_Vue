import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './authStore'

export const useCartStore = defineStore('cart', () => {
    const authStore = useAuthStore()
    const panier = ref<any[]>([]) 

    // Vérifier si l'utilisateur est connecté
    const isAuthenticated = computed(() => authStore.user !== null)

    // Ajouter un produit au panier (avec gestion des quantités)
    const ajouterAuPanier = (produit: any) => {
        if (!isAuthenticated.value) {
            alert("Vous devez être connecté pour ajouter au panier.")
            return
        }
        const itemExist = panier.value.find(item => item.id === produit.id)
        if (itemExist) {
            itemExist.quantite += 1
        } else {
            panier.value.push({ ...produit, quantite: 1 })
        }
    }

    // Supprimer un seul exemplaire du produit
    const supprimerUnProduit = (produitId: number) => {
        const item = panier.value.find(item => item.id === produitId)
        if (item) {
            if (item.quantite > 1) {
                item.quantite -= 1
            } else {
                panier.value = panier.value.filter(item => item.id !== produitId)
            }
        }
    }

    // Supprimer complètement un produit
    const supprimerDuPanier = (produitId: number) => {
        panier.value = panier.value.filter(item => item.id !== produitId)
    }

    // Vider tout le panier
    const viderPanier = () => {
        panier.value = []
    }

    return {
        panier,
        ajouterAuPanier,
        supprimerUnProduit, // Nouvelle fonction
        supprimerDuPanier,
        viderPanier,
        isAuthenticated
    }
})
