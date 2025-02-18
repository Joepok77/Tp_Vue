
import { defineStore } from 'pinia';
import {ref} from 'vue'
export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ id: number; name: string; email: string } | null>(null)

  const login = (userData: any) => {
      user.value = userData
  }

  const logout = () => {
      user.value = null
  }

  return { user, login, logout }
})
