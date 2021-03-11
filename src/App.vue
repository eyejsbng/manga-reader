<template>
  <ion-app>
		
		<router-view v-slot="{ Component }">
  <keep-alive exclude="Manga">
    <component :is="Component" />
  </keep-alive>
</router-view>
  </ion-app>
</template>

<script>
import { IonApp, } from '@ionic/vue';
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  components: {
    IonApp,
		
  },
	setup() {
		const router = useRouter();
			return {
				router
			}	
	},

};
</script>