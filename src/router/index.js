import Vue from 'vue';
import Router from 'vue-router';
// main
import Main from '@views/Main';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/main',
        }, {
            name: 'main',
            router: 'main',
            path: '/main',
            component: Main,
        }
    ],
});

export default router;
