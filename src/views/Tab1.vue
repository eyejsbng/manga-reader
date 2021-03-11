<template>
<ion-page>
		<ion-header no-border>
			<ion-toolbar color="blue-dark">
				<ion-title>Manga</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content color="blue-dark" :fullscreen="true" v-if="topMangas">

			<ion-row>
				<h4 style="padding-left:15px">Hot Manga</h4>
			</ion-row>
			<ion-slides v-if="topMangas != ''" :options="opts">
				<ion-slide  button  v-for="manga in topMangas" :key="manga">
					<ion-card class="slideCard" @click="displayManga(manga)">
							<img :src="manga.thumbnail">
							<div class="overLay">
								<div class="card-title"><p style="color:white">{{ manga.name }}</p></div>
							</div>
					</ion-card>								
				</ion-slide>
			</ion-slides>
		
			<ion-item color="blue-dark">
				<h4 slot="start">Latest Manga Releases</h4>
				<ion-button slot="end" color="blue-dark" size="small" @click="router.push('/manga/latest')">View All</ion-button>
			</ion-item>
			<ion-slides v-if="latestMangas != ''" :options="opts">
				<ion-slide  button  v-for="manga in latestMangas" :key="manga">
					<ion-card class="slideCard" @click="displayManga(manga)">
							<img :src="manga.thumbnail">
							<div class="overLay">
								<div class="card-title"><p style="color:white">{{ manga.name }}</p></div>
						
							</div>
					</ion-card>								
				</ion-slide>
			</ion-slides>
			<div class="ion-text-center" v-if="topMangas == ''">
					<ion-spinner  name="crescent" color="light"></ion-spinner>
			</div>
		
		</ion-content>
		
</ion-page>
</template>

<script>
	import {
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonRow,
		IonPage,
		IonSlides,
		IonSlide,
		IonCard,
		IonButton,
		IonItem,
		IonSpinner,

	} from '@ionic/vue';
	import axios from 'axios';
	import { useRouter} from 'vue-router';
	export default {
		name: 'Home',
		components: {
			IonHeader,
			IonToolbar,
			IonTitle,
			IonContent,
			IonPage,
			IonRow,
			IonSlides,
			IonSlide,
			IonCard,
			IonButton,
			IonItem,
			IonSpinner
		},
		setup() {
			const router = useRouter();
			return {
				router
			}
		},
		data() {
			return {
				latestMangas: [],
				topMangas: [],
				opts: {
					slidesPerView: 2.5,
					spaceBetween: 1,
					slideOffsetBefore: 1
				},
			
			}
		},
		created() {
				this.getTopMangas()
			this.getLatest()
		},
		methods: {
			async getLatest() {	
				await axios.get('http://localhost:3000/api/manga/latest').then((resp) => {
					this.latestMangas = resp.data.data;
			
				})
			},
			async getTopMangas() {
				await axios.get('http://localhost:3000/api/manga/top').then((resp) => {
					this.topMangas = resp.data.data;
				})
			},
			displayManga(e) {
				const link = e.link;
				let res = link.split('/');
				res = res[res.length - 1];
				console.log(res);
				console.log(link)
				this.router.push('/manga/'+ res);
			}
		}
	}
</script>
<style scoped>
		img{
			width:100%;
			height:100%;
		}

		.sliderCard{
			position:relative;

		}
		.overLay{
    width: 100%;
    height: 60px;
    position: absolute;
    z-index: 99;
    bottom: 0px;
    opacity: 0.6;
    background: #000;
    color: #fff;

}
	.slider-img {
		max-width:100% !important;
		max-height:100% !important;
	}
	.my-custom-class {
		--background: black;
	}
	ion-content {
		background-color: #161E29 !important
	}

	ion-header {
		background-color: #161E29
	}

	ion-card {
		height: 160px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	ion-img {
		height: 100px
	}
</style>