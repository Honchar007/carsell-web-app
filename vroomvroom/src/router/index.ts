import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';

import Home from '@/views/Home';
import MainLayout from '@/layouts/MainLayout';
import Experts from '@/views/Experts';
import News from '@/views/News';
import AboutUs from '@/views/AboutUs';
import SignIn from '@/views/SignIn';
import Profile from '@/views/Profile';
import CarPage from '@/views/CarPage';
import CarEdit from '@/views/CarEdit';
import Avtovukyp from '@/views/Avtovukyp';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: MainLayout,
    redirect: { name: 'home' },
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
        meta: { title: ['Home'] },
      },
      {
        path: '/experts',
        name: 'experts',
        component: Experts,
        meta: { title: ['Experts'], requiresAuth: true },
      },
      {
        path: '/news',
        name: 'news',
        component: News,
        meta: { title: ['News'] },
      },
      {
        path: '/aboutus',
        name: 'aboutus',
        component: AboutUs,
        meta: { title: ['About us'] },
      },
      {
        path: '/avtovukyp',
        name: 'avtovukyp',
        component: Avtovukyp,
        meta: { title: ['Avtovukyp'], requiresAuth: true },
      },
      {
        path: '/sign-in',
        name: 'signin',
        component: SignIn,
        meta: { title: ['Sign In'] },
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: { title: ['Profile'], requiresAuth: true },
      },
      {
        path: '/car-page/:id',
        name: 'carpage',
        component: CarPage,
        meta: { title: ['Car page'] },
      },
      {
        path: '/car-edit/:id',
        name: 'car-edit',
        component: CarEdit,
        meta: { title: ['Car edit'], requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters?.isAuthenticated;
  const isExpert = store.getters?.isExpert;
  const isAvtovukyp = store.getters?.getUser;

  if (to.name === 'experts' && (!isAuthenticated || !isExpert)) {
    next({ name: 'home' });
  } else if (to.name === 'avtovukyp' && (!isAuthenticated || !isAvtovukyp)) {
    next({ name: 'home' });
  } else if (to.name === 'profile' && (!isAuthenticated)) {
    next({ name: 'signin' });
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'signin' });
  } else {
    next();
  }
});

export default router;
