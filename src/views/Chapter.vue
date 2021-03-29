<template >
<ion-page>
	<ion-toolbar>
	<ion-buttons>
		<ion-back-button slot="start" text="" color="primary" defaultHref="" @click="goBack" :style="{ position: 'absolute', }"></ion-back-button>
	</ion-buttons>

	</ion-toolbar>
	
	<ion-content :fullscreen="true" class="ion-no-padding" color="blue-dark" v-if="images" v-on:scroll="onScroll">
		<div class="ion-no-padding"  v-for="image in images.data" :key="image.image">
				<ion-img :src="image"/>
		</div>
		
	</ion-content>
</ion-page>
</template>
<script>
import { loadingController, IonBackButton, IonPage} from '@ionic/vue';
import { refreshCircleOutline } from 'ionicons/icons'
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
	name: 'Chapter',
	components: {
	IonBackButton,
	IonPage
	},
	
	data() {
		// const router = useRouter();
		// const chapter = router.currentRoute.value.params.chapterNumber
		// const split = chapter.split("-")
		// const nextChapter = Number(split[split.length - 1]) + 1;
		return {
			images: [],
			showHeader : true,
			lastScrollPosition: 0,
			
			url: 'https://warm-refuge-03594.herokuapp.com/api/'
		}
	},
	setup() {
	
		const router = useRouter();
		const chapter = router.currentRoute.value.params.chapterNumber
		const split = chapter.split("-")
		const nextChapter = Number(split[split.length - 1]) + 1;
			return {
				router,
				chapter,
				nextChapter,
				refreshCircleOutline
			}	
	},
	
	beforeRouteLeave() {
		this.images = []
	},
	beforeRouteUpdate() {
		this.getChapters()
	},
	mounted() {
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
		
			await axios.get(this.url + 'chapter/'+ currentRoute).then((resp) => {
				this.images = resp.data;
				loading.dismiss();
			})
		},
		async next(){ 
			
			let currentRoute = this.router.currentRoute.value.fullPath;
			currentRoute = currentRoute.slice(15);
			currentRoute = currentRoute.split("-");
			currentRoute[currentRoute.length - 1] = this.nextChapter
			let next = currentRoute.join('-')
			this.router.push('/manga/chapter/' + next)
			
			const loading = await loadingController.create({
				message: 'Loading images...',
				cssClass: 'loader',
				spinner: 'crescent'
			})
			loading.present();
		
			await axios.get(this.url + 'chapter/'+ next).then((resp) => {
				this.images = resp.data;
				loading.dismiss();
			})
		}
	
	}
}
</script>
<style scoped>
ion-toolbar {
	--background: transparent;
}
.loader {
	--background: #161E29;
	color:white;
}

</style>