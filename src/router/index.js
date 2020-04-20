import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'home',
    component: () => import("@/views/pages/Home.vue")
},
{
    path: '/video',
    name: 'video',
    component: () => import("@/views/pages/VideoManage.vue")
},
{
    path: '/user',
    name: 'user',
    component: () => import("@/views/pages/UserManage.vue")
},
{
    path: '/other',
    name: 'other',
    children: [{
        path: '/one',
        name: 'one',
        component: () => import("@/views/pages/One.vue")
    },
    {
        path: '/two',
        name: 'two',
        component: () => import("@/views/pages/Two.vue")
    },
    {
        path: '/three',
        name: 'three',
        component: () => import("@/views/pages/Three.vue")
    },
    {
        path: '/four',
        name: 'four',
        component: () => import("@/views/pages/Four.vue")
    },
    ]
}
];

const router = new VueRouter({
    routes
});

export default router;