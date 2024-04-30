import { createRouter, createWebHistory } from 'vue-router';
import KnightsList from './components/KnightsList.vue';
import HeroesList from "./components/HeroesList.vue";
import KnightsCreate from "./components/KnightsCreateForm.vue";
import KnightsEdit from "./components/KnightsEditForm.vue";

// Define route components
const routes = [
    { path: '/knights', component: KnightsList },
    { path: '/knights/create', component: KnightsCreate },
    { path: '/knights/:id', component: KnightsEdit },
    { path: '/knights?filter=heroes', component: KnightsList, props: { showHeroes: true } }
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

export default router;