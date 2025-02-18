import {createRouter, createWebHistory} from 'vue-router'
import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import SessionPage from './pages/SessionPage.vue'
import chefList from './pages/chefList.vue'
import ChefDetails from './pages/ChefDetails.vue'

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
        path: '/session/:id',
        component: SessionPage
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