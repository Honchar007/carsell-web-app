import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
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
        meta: { title: ['Experts'] },
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
        path: '/sign-in',
        name: 'signin',
        component: SignIn,
        meta: { title: ['Sign In'] },
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: { title: ['Profile'] },
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
        meta: { title: ['Car edit'] },
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

export default router;
