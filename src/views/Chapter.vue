<template >
<ion-page>
<ion-header class="header">
 <ion-toolbar color="blue-dark" >
		<ion-back-button slot="start" text="" color="light" defaultHref="" @click="goBack"></ion-back-button>
	
			<ion-title ><ion-text class="ion-text-nowrap">{{ images.title }}</ion-text> </ion-title>

  </ion-toolbar>
</ion-header>
	<ion-content class="ion-no-padding" :fullscreen="true" color="blue-dark" v-if="images" v-on:scroll="onScroll">
		<div class="ion-no-padding"  v-for="image in images.data" :key="image.image">
				<img :src="image">
		</div>
		<p class="ion-text-center" v-if="images">End of Chapter</p>
	</ion-content>
</ion-page>
</template>
<script>
import { loadingController, IonBackButton, IonPage} from '@ionic/vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
	name: 'Chapter',
	components: {
	IonBackButton,
	IonPage
	},
	data() {
		return {
			images: [],
			showHeader : true,
			lastScrollPosition: 0,
		}
	},
	setup() {
		const router = useRouter();
			return {
				router
			}	
	},

	created() {
		window.addEventListener('scroll', this.onScroll)
		this.getChapters();
	},
	methods: {
		onScroll() {
			const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
			console.log(currentScrollPosition)
		},
		goBack() {
			return this.router.back()
		},
		async getChapters() {
			let currentRoute = this.router.currentRoute.value.fullPath;
			currentRoute = currentRoute.slice(15);
			
			const loading = await loadingController.create({
				message: 'Loading images...',
				cssClass: 'loader',
				spinner: 'crescent'
			})
			loading.present();
		
			await axios.get('http://localhost:3000/api/chapter/'+ currentRoute).then((resp) => {
				this.images = resp.data;
				loading.dismiss();
			})
		}
	
	}
}
</script>
<style>
.loader {
	--background: #161E29;
	color:white;
}
img {
	object-fit: cover;
	
}
.header {
 
  position: fixed;
 
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;
}
.header.header--hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}
</style>