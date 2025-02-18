import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as { id: number, name: string, price: number }[], // Liste des plats
  }),

  getters: {
    totalItems: (state) => state.items.length, // Nombre d'articles dans le panier
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price, 0), // Prix total
  },

  actions: {
    addToCart(item: { id: number, name: string, price: number }) {
      this.items.push(item);
    },
    removeFromCart(itemId: number) {
      this.items = this.items.filter(item => item.id !== itemId);
    },
  },
});
