import {createRouter, createWebHistory} from 'vue-router'
import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import chefList from './pages/chefList.vue'
import ChefDetails from './pages/ChefDetails.vue'
import RegisterPage from './pages/RegisterPage.vue'

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/login',
        component: LoginPage
    },
   

    {
        path: '/register',
        component: RegisterPage
    },

    {
        path: '/chef/:id', 
        component: ChefDetails
    },

    {
        path: '/chefs',
        component: chefList 
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router