import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';

import Home from '@/views/Home';
import MainLayout from '@/layouts/MainLayout';
import CarList from '@/views/CarList';
import CarFastOrder from '@/views/CarFastOrder';
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
        path: 'cars',
        name: 'cars',
        component: CarList,
        meta: { title: ['Cars'] },
      },
      {
        path: '/cars-fast-sale',
        name: 'cars-fast-sale',
        component: CarFastOrder,
        meta: { title: ['Car Fast Sale'] },
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
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutUs/AboutUs.vue'),
  },
  {
    path: '/cars',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutUs/AboutUs.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters?.isAuthenticated; // Check if token is present
  const isExpert = store.state.user?.isExpert; // Check if user is an expert
  const isAvtovukyp = store.state.user?.isAvtovukyp; // Check if user is an expert

  if (to.name === 'experts' && (!isAuthenticated || !isExpert)) {
    next({ name: 'home' });
  } else if (to.name === 'avtovukyp' && (!isAuthenticated || !isAvtovukyp)) {
    next({ name: 'home' });
  } else if (to.name === 'profile' && (!isAuthenticated)) {
    next({ name: 'signin' });
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'signin' });
  } else {
    // Proceed to the next route
    next();
  }
});

export default router;
