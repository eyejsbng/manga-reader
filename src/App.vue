<template>
  <ion-app>
      <ion-router-outlet/>
  </ion-app>
</template>

<script>
import { IonApp , IonRouterOutlet} from '@ionic/vue';
import { useRouter } from 'vue-router'
import { Plugins } from '@capacitor/core'
export default {
  name: 'App',
  components: {
    IonApp, IonRouterOutlet
    
  },
	setup() {
    const { StatusBar} = Plugins
		const router = useRouter();
    const currentRoute = router.currentRoute.value.fullPath
    StatusBar.setBackgroundColor({
      color: '#161E29'
    })
			return {
				router,
        currentRoute
			}	
	},


};
</script>