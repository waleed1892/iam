import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/applications',
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('../pages/Dashboard')
        },
        {
            path: '/directory',
            component: () => import('../pages/Directory'),
            children: [
                {
                    path: 'people',
                    name: 'People',
                    component: () => import('../pages/People')
                },
                {
                    path: 'groups',
                    name: 'Groups',
                    component: () => import('../pages/Groups')
                }
            ]
        },
        {
            path: '/users',
            name: 'Users',
            component: () => import('../pages/Users')
        },
        {
            path: '/user/:user_id',
            name: 'User',
            component: () => import('../pages/User')
        },
        {
            path: '/users/:user_id/application/:application_id',
            name: 'UserApplication',
            component: () => import('../pages/UserApplication')
        },
        {
            path: '/applications/:application_id/user/:user_id',
            name: 'ApplicationUser',
            component: () => import('../pages/ApplicationUser')
        },
        {
            path: '/applications',
            name: 'Applications',
            component: () => import('../pages/Applications')
        },
        {
            path: '/application/:application_id',
            name: 'Application',
            component: () => import('../pages/Application')
        },
        {
            path: '/directory/group/:id',
            name: 'Group',
            component: () => import('../pages/Group')
        },
        {
            path: '/integrations',
            name: 'Integrations',
            component: () => import('../pages/Integrations')
        },
        {
            path: '/settings',
            name: 'Settings',
            component: () => import('../pages/Settings')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../pages/Login')
        },
        {
            path: '*',
            name: '404',
            component: () => import('../pages/errors/404')
        }
    ]
})

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token ?? null;
}
router.beforeEach((to, from, next) => {
    if (!isAuthenticated() && to.name !== 'Login') {
        next({name: 'Login'})
    } else if (isAuthenticated() && to.name==='Login') {
        next({name: 'Applications'})
    } else {
        window.scrollTo(0, 0)
        next();
    }
})

export default router;
