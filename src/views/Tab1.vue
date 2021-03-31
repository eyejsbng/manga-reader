<template>
	<ion-page>
		<ion-toolbar color="blue-dark" v-if="!error">
			<ion-title>Discover</ion-title>
			<ion-buttons slot="end">
				<ion-button @click="() => router.push('/tabs/tab2')">
					<ion-icon slot="icon-only" :icon="searchOutline"></ion-icon>
				</ion-button>
			</ion-buttons>
		</ion-toolbar>

		<ion-content color="blue-dark" :fullscreen="true">
			<div v-if="isLoading" class="loader">
					<ion-spinner name="crescent" color="primary"></ion-spinner>
			</div>
			<div v-if="topMangas != '' && latestMangas != ''">
				<ion-list-header>
					<ion-label color="light">Genres</ion-label>
				</ion-list-header>
				<ion-slides :options="optsG">
					<ion-slide v-for="g in genre" :key="g">
						<ion-chip color="light" @click="displayGenre(g)">
							<ion-text class="genre" color="secondary">{{ g }}</ion-text>
						</ion-chip>
					</ion-slide>
				</ion-slides>
				<div class="content">
					<ion-list-header>
						<ion-label color="light">Hot Manga</ion-label>
					</ion-list-header>
					<ion-slides v-if="topMangas != ''" :options="opts">
						<ion-slide button v-for="manga in topMangas" :key="manga">
							<p class="chapter">{{ manga.latestChapter.split(" ").splice(-1).toString() }}</p>
							<div class="slideCard" @click="displayManga(manga)">
								<ion-img :src="manga.thumbnail" />
								<div class="overLay">
									<ion-text class="ion-text-start title">{{ manga.name }}</ion-text><br>
								</div>
							</div>
						</ion-slide>
					</ion-slides>
					<ion-list-header>
						<ion-label color="light">Latest Release</ion-label>
						<ion-button @click="() => router.push('/manga/latest')">
							<ion-icon class="latest" :icon="ellipsisHorizontalOutline"></ion-icon>
						</ion-button>
					</ion-list-header>
					<ion-slides v-if="latestMangas != ''" :options="opts">
						<ion-slide class="swiper-wrapper" button v-for="manga in latestMangas" :key="manga">
							<p class="chapter">{{ manga.latestChapter.split(" ").splice(-1).toString() }}</p>
							<div class="slideCard" @click="displayManga(manga)">
								<ion-img :src="manga.thumbnail" />
								<div class="overLay">
									<ion-text class="title">{{ manga.name }}</ion-text>

								</div>
							</div>

						</ion-slide>
					</ion-slides>
				</div>
				<div class="ion-text-center" v-if="topMangas == ''">
					<ion-spinner name="crescent" color="light"></ion-spinner>
				</div>
			</div>
			<div v-if="error" class="ion-text-center">
				<div class="error-message">
					<p>Somethings wrong.</p>
					<p>Please try again.</p>
					<p><img class="circle-head" src="/assets/images/circle-head.png" alt=""></p>
				</div>
				<ion-fab vertical="center" horizontal="center">
					<ion-fab-button @click="refresh">
						<ion-icon v-if="!refreshActive" :icon="refreshOutline"></ion-icon>
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
		IonButton,
		IonSpinner,
		IonIcon,
		IonButtons,
		IonFabButton,
		IonFab,
		IonLabel,
		IonListHeader,
		IonChip,
		IonImg,

	} from '@ionic/vue';
	import {
		Plugins
	} from '@capacitor/core'
	import {
		refreshOutline,
		searchOutline,
		ellipsisHorizontalOutline,
		chevronDownCircleOutline
	} from 'ionicons/icons';
	import axios from 'axios';
	import Genre from '../utils/genre'
	import {
		useRouter
	} from 'vue-router';
	const {
		Storage
	} = Plugins
	export default {
		name: 'Home',
		components: {
			IonToolbar,
			IonTitle,
			IonContent,
			IonPage,
			IonSlides,
			IonSlide,
			IonButton,
			IonSpinner,
			IonIcon,
			IonButtons,
			IonFabButton,
			IonFab,
			IonLabel,
			IonListHeader,
			IonChip,
			IonImg,
		},
		setup() {
			const router = useRouter();
			let genre = Genre;
			return {
				genre,
				router,
				refreshOutline,
				searchOutline,
				ellipsisHorizontalOutline,
				chevronDownCircleOutline
			}
		},
		data() {
			return {
				history: 'history',
				optsG: {
					slidesPerView: 4.2,
				},
				isLoading: true,
				refreshActive: false,
				error: false,
				errorMessage: '',
				latestMangas: [],
				topMangas: [],
				opts: {
					lazy: true,
					slidesPerView: 3.3,
					slideOffsetBefore: 1,
					
				},
				url: 'https://warm-refuge-03594.herokuapp.com/api/',
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

				if (this.latestMangas != '' && this.topMangas != '') {
					this.refreshActive = false
					this.error = false
				}
			},
			async getLatest() {	
				await axios.get(this.url + 'manga/latest', { timeout: 10000 }
				).then(res => {
	
					this.latestMangas = res.data.data;
					this.isLoading = false
					this.error = false
				}).catch(err => {
					this.isLoading = false
					this.errorMessage = err
					this.error = true
					this.refreshActive = false
				})
			},
			async getTopMangas() {
				await axios.get(this.url + 'manga/top', {
					timeout: 10000
				}).then((resp) => {
					this.topMangas = resp.data.data;
					this.isLoading = false
					this.error = false
				}).catch((err) => {
					this.isLoading = false
					this.errorMessage = err
					this.error = true
					this.refreshActive = false
				})
			},
			doRefresh(e) {
				this.getTopMangas()
				this.getLatest()
				e.target.complete()
			},
			displayManga(e) {

				let link = e.link;
				let res = link.split('/');
				res = res[res.length - 1];

				this.router.push('/manga/' + res);
			},
			displayGenre(g) {
				this.router.push({
					name: 'Genre',
					params: {
						slug: g
					}
				})
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
				const item = await Storage.get({
					key: key
				})
				return item
			},
			async keys() {
				const {
					keys
				} = await Storage.keys();
				return keys
			}
		}
	}
</script>
<style scoped>
ion-list-header {
	font-weight: 600;
}
ion-text {
	font-weight: 600;
}
ion-label {
	font-size: 15px;
}
.loader {
	margin-top:50%;
	margin-left:48%;
}
.circle-head {
	width: 40%;
}

.content {
	margin-top: 10px;

}
ion-chip {
	--background: #161E29;
	font-size:12px !important;
}

.latest {
	font-size: 40px;
}

.title {
	font-size: 11px
}

.chapter {
	font-size: 12px;
	position: absolute;
	background-color: black;
	width: 40px;
	height: 25px;
	padding-top: 5px;
	opacity: 0.8;
	border-radius: 10px;
	margin-bottom:180px;
	margin-left:2.5rem;
	font-weight: 600;
}

.error-message {
	margin-top: 15%;
}

ion-img {
	object-fit: cover !important;
	width: 95% !important;
	height: 140px;
	transition: 0.1s all ease-out;
	border-radius: 5px;
}

.sliderCard {
	transition : 1s ease-in;
	padding-right: 20px;
}

.overLay {
	width: 100%;
	height: 60px;
	margin-top: 0%;
	background: #161E29;
	color: #fff;

}
ion-slides {
	margin-left:7px !important;
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
</style>