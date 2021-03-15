<template>
<ion-page>
	
			<ion-toolbar color="light">
				<ion-title>Discover</ion-title>
				<ion-buttons slot="end">
				<ion-button @click="router.push('/tabs/tab2')">
					<ion-icon slot="icon-only" :icon="searchOutline"></ion-icon>
				</ion-button>
				</ion-buttons>
			</ion-toolbar>
		
		<ion-content color="light" :fullscreen="true">
			<ion-fab v-if="isLoading" horizontal="center" vertical="center">
				<ion-fab-button color="primary">
					<ion-spinner name="crescent" color="light"></ion-spinner>
				</ion-fab-button>
			</ion-fab>
			<div v-if="topMangas != '' && latestMangas != ''">
			<ion-list-header>
				<ion-label color="dark">Genres</ion-label>
			</ion-list-header>
			<ion-slides :options="optsG">
				<ion-slide v-for="g in genre" :key="g">
					<ion-chip>
						<ion-label color="secondary">{{ g }}</ion-label>
					</ion-chip>
				</ion-slide>
			</ion-slides>
			<div class="content">
			<ion-list-header>
				<ion-label color="light">Hot Manga</ion-label>
			</ion-list-header>
			<ion-slides :parallax="true" :scrollbar="true" v-if="topMangas != ''" :options="opts">
				<ion-slide  button  v-for="manga in topMangas" :key="manga">
					<ion-card class="slideCard" @click="displayManga(manga)">
							<img :src="manga.thumbnail">
							<div class="overLay">
								<div class="card-title">
									<p style="color:white">{{ manga.name }}</p>								
								</div>
								<div class="sub-title">
									<p> {{ manga.latestChapter }}</p>
								</div>
							</div>
					</ion-card>								
				</ion-slide>
			</ion-slides>
			<ion-list-header>
    <ion-label color="light">Latest Release</ion-label>
    <ion-button @click="router.push('/manga/latest')"><ion-icon class="latest" :icon="ellipsisHorizontalOutline"></ion-icon></ion-button>
  </ion-list-header>
		
			<ion-slides :scrollbar="true" v-if="latestMangas != ''" :options="opts">
				<ion-slide  class="swiper-wrapper" button  v-for="manga in latestMangas" :key="manga">
					<ion-card class="slideCard" @click="displayManga(manga)">
							<img :src="manga.thumbnail">
							<div class="overLay">
								<div class="card-title"><p>{{ manga.name }}</p></div>
								<div class="sub-title">
									<p> {{ manga.latestChapter }}</p>
								</div>
							</div>
					</ion-card>								
				</ion-slide>
			</ion-slides>
			</div>
			<div class="ion-text-center" v-if="topMangas == ''">
					<ion-spinner  name="crescent" color="light"></ion-spinner>
			</div>
			
		</div>
		<div v-if="error" class="ion-text-center">
			<div class="error-message">
			<p>Somethings wrong.</p>
			<p>Please try again.</p>
			</div>
		<ion-fab vertical="center" horizontal="center">
				<ion-fab-button @click="refresh" class="ion-text-center" color="primary">
					<ion-icon v-if="!refreshActive" :icon="refreshCircleOutline"></ion-icon>
					<ion-spinner v-if="refreshActive" name="crescent" color="light"></ion-spinner>
				</ion-fab-button>
			</ion-fab>
		</div>
		</ion-content>
		
		
</ion-page>
</template>

<script>
	import {
	
		IonToolbar,
		IonTitle,
		IonContent,
		
		IonPage,
		IonSlides,
		IonSlide,
		IonCard,
		IonButton,
	
		IonSpinner,

	} from '@ionic/vue';
	import { Plugins } from '@capacitor/core'
	import { refreshCircleOutline, searchOutline, ellipsisHorizontalOutline } from 'ionicons/icons';
	import axios from 'axios';
	import { useRouter} from 'vue-router';

	const { Storage }  = Plugins
	export default {
		name: 'Home',
		components: {
		
			IonToolbar,
			IonTitle,
			IonContent,
			IonPage,
			
			IonSlides,
			IonSlide,
			IonCard,
			IonButton,
			
			IonSpinner
		},
		setup() {
			const router = useRouter();
			
			return {
			
				router,
				refreshCircleOutline,
				searchOutline,
				ellipsisHorizontalOutline
			}
		},
		data() {
			return {
				genre: [
					'Action','Adult','Adventure','Comedy','Cooking',
					'Doujinshi', 'Drama', 'Ecchi', 'Fantasy', 'Gender bender','Harem','Historical','Horror','Isekai','Josei','Manhua', 'Manhwa','Martial arts', 'Mature', 'Mecha', 'Medical', 'Mystery','One shot','Psychological','Romance', 'School life','Sci fi','Seinen','Shoujo','Shoujo ai','ShounenShounen ai','Slice of life','Smut','Sports','Supernatural', 'Tragedy', 'Webtoons', 'Yaoi', 'Yuri'
				],
				history : 'history',
				optsG: {
					slidesPerView: 3.5,
					spaceBetween: 1,
					slideOffsetBefore: 1
				},
				isLoading : true,
				refreshActive: false,
				error : false,
				errorMessage: '',
				latestMangas: [],
				topMangas: [],
				opts: {
					slidesPerView: 2.3,
					slideOffsetBefore: 1,
				},
				url : 'https://warm-refuge-03594.herokuapp.com/api/',
				historyItem: []
			}
		},
		created() {
			
			this.getTopMangas()
			this.getLatest()
		},
		methods: {
			refresh() {
				this.refreshActive = true
				this.getLatest()
				this.getTopMangas()

				if(this.latestMangas != '' && this.topMangas != '') {
					this.refreshActive = false
				}
			
			},
			async getLatest() {	
				await axios.get(this.url +'manga/latest', { timeout: 5000}).then((resp) => {
					this.latestMangas = resp.data.data;	
					this.isLoading = false	
				}).catch(err => {
					this.isLoading = false
					this.errorMessage = err
					this.error = true
					this.refreshActive = false
				})
			},
			async getTopMangas() {
				await axios.get(this.url+ 'manga/top', { timeout: 5000}).then((resp) => {
					this.topMangas = resp.data.data;
					this.isLoading = false
				}).catch((err) => {
					this.isLoading = false
					this.errorMessage = err
					this.error = true
					this.refreshActive = false
				})
			},
			displayManga(e) {
				
				let link = e.link;
				let res = link.split('/');
				res = res[res.length - 1];
		
				
				this.router.push('/manga/'+ res);
			},
			async set(e, key) {
				await Storage.set({
					key: 'history',
					value: JSON.stringify({
						id: key,
						name: e.name,
						thumbnail: e.thumbnail
					})
				});		
			},
			async get(key) {
				const item = await Storage.get({ key:key})
				return item
			},
			async keys() {
				const {keys} = await Storage.keys();
				return keys
			}
		}
	}
</script>
<style scoped>
		.content {
			margin-top:10px;
			border-top-left-radius: 25px;
			border-top-right-radius: 25px;
			background-color:#161E29;
		}
		ion-chip {
			--background: #161E29
		}
		.latest { 
			font-size: 40px;
		}
		.sub-title { 
			font-size: 11px
		}
		.card-title {
			font-size: 12px
		}
		.error-message {
			margin-top: 50%;
		}
		img{
			width:100%;
			height:160px;
		}

		.sliderCard{
			position:relative;

		}
		.overLay{
    width: 100%;
    height: 100px;
    position: relative;
    
	margin-top:-14%;
	
    background: #161E29;
    color: #fff;

}
	.slider-img {
		max-width:100% !important;
		max-height:100% !important;
	}
	.card-title {
		padding-top:2px
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
		height: 220px;
		width: auto;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	ion-img {
		height: 100px
	}
</style>