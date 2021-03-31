import { createRouter, createWebHistory} from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
				name: 'Home',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: 'tab2',
				name : 'Search',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'tab3',
				name: 'Other',
        component: () => import('@/views/Tab3.vue')
      }
    ]
  },
	{
		path: '/manga/latest',
		name: 'Latest',
		component: () => import('@/views/LatestManga.vue')
	},
	{
		path: '/manga/:id',
		name : 'Manga',
		component: () => import('@/views/Manga.vue')
	},
	{
		path: '/manga/chapter/:chapterNumber',
		name: 'Chapter',
		component : () => import('@/views/Chapter.vue')
	},
  {
    path: '/manga/genre/:slug',
    name: 'Genre',
    component: () => import('@/views/Genre.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
