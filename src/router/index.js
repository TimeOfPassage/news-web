import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'BaseLayout',
        component: () => import('@/components/layout/index.vue'),
        redirect: "/home",
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/Home.vue'),
            },
            {
                path: '/settings',
                name: "Setting",
                children: [
                    {
                        path: '/menus',
                        name: 'Menu',
                        component: () => import('@/views/setting/Menu.vue'),
                    },
                    {
                        path: '/roles',
                        name: 'Role',
                        component: () => import('@/views/setting/Role.vue'),
                    },
                    {
                        path: '/users',
                        name: 'User',
                        component: () => import('@/views/setting/User.vue'),
                    }
                ]
            },
            {
                path: '/documents',
                name: "Document",
                children: [
                    {
                        path: '/my_articles',
                        name: 'MyArticle',
                        component: () => import('@/views/document/Article.vue'),
                    },
                    {
                        path: '/drafts',
                        name: 'DraftArticle',
                        component: () => import('@/views/document/Draft.vue'),
                    },
                    {
                        path: '/new_article',
                        name: 'NewArticle',
                        component: () => import('@/views/document/NewArticle.vue')
                    },
                    {
                        path: '/article_detail',
                        name: 'ArticleDetail',
                        component: () => import('@/views/document/ArticleDetail.vue')
                    },
                ]
            },
            {
                path: '/materials',
                name: "Material",
                children: [
                    {
                        path: '/categories',
                        name: 'Categories',
                        component: () => import('@/views/material/Category.vue'),
                    },
                    {
                        path: '/materials',
                        name: 'Materials',
                        component: () => import('@/views/material/Material.vue'),
                    }
                ]
            },
            {
                path: '/demo',
                name: 'Demo',
                component: () => import('@/views/demos/TableDemo.vue'),
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    }
]

// ??? Vue-router???????????????????????????createRouter???????????????
export default createRouter({
    // ?????????????????????,??????????????????hash??????
    history: createWebHashHistory(),
    // ????????????
    routes
})