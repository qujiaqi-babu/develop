import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue';
import Babu from '../components/Babu.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/babu',
        name: 'Babu',
        component: Babu,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
