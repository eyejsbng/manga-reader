<template>
  <ion-app>
    <ion-router-outlet />
		<!-- <router-view v-slot="{ Component }">
      <keep-alive exclude="Home">
        <component :is="Component" />
      </keep-alive>
    </router-view> -->
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
	setup() {
		const router = useRouter();
    const currentRoute = router.currentRoute.value.fullPath
    console.log(currentRoute)
			return {
				router,
        currentRoute
			}	
	},


};
</script>