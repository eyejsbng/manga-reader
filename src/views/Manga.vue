<template>
	<ion-page>
		<ion-toolbar color="blue-dark">
			<ion-buttons slot="start" v-if="!isLoading">
				<ion-back-button text="" color="secondary" default-href="" @click="goBack"></ion-back-button>
			</ion-buttons>
			<ion-title>{{ mangaInfo.title }}</ion-title>
		</ion-toolbar>
		<ion-content :fullscreen="true" color="blue-dark">
			<div v-if="isLoading" class="load">
				<ion-spinner name="crescent" color="secondary"></ion-spinner>
			</div>
			<div v-if="mangaInfo != ''">
				<div class="top">
					<div class="ion-text-center">
						<img class="cover" :src="mangaInfo.thumbnail">
					</div>
					<div class="info">
						<ion-row :style="{ position: 'absolute', marginTop: '-300px'}">
							<manga-info :details="mangaInfo" />
						</ion-row>
					</div>
				</div>
				<div class="content">
					<ion-button color="light" size="small" expand="block" @click="popOver">View Synopsis
					</ion-button>
					<ion-row class="ion-padding-start" v-if="mangaInfo">
						<ion-list-header>
							<ion-label color="light">Chapters</ion-label>
							<ion-button color="primary" size="small"
								@click="displayChapter(mangaInfo.chapters[mangaInfo.chapters.length - 1])"
								expand="full">Start Ch. 1 </ion-button>
						</ion-list-header>
					</ion-row>
					<ion-row>
						<ion-col size="3" v-for="chapter in mangaInfo.chapters" :key="chapter.chapter">
							<ion-chip class="ion-text-center" @click="displayChapter(chapter)" button
								style="width:80px">
								<ion-label color="secondary">Ch. {{ chapter.chapter }}</ion-label>
							</ion-chip>
						</ion-col>
					</ion-row>
				</div>
			</div>
			<div v-if="error" class="ion-text-center">
				<div v-if="!refreshActive" class="error-message">
					<p>Somethings wrong.</p>
					<p>Please try again.</p>
				</div>
				<ion-fab vertical="center" horizontal="center">
					<ion-fab-button @click="refreshInfo" class="ion-text-center" color="primary">
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
	useRouter
} from 'vue-router';
import axios from 'axios';
import MangaInfo from '@/components/MangaInfo';
import {
	modalController,
	IonPage,
	IonBackButton,
	IonButtons,
	IonTitle,
	IonToolbar,
	IonSpinner,
	IonCol,
	IonIcon,
	IonButton,
	IonRow,
	IonLabel,
	IonListHeader,
	IonChip,
	IonFabButton,
	IonFab,
	IonContent,
	popoverController
} from '@ionic/vue'
import Synopsis from '../components/Synopsis'
import Popover from '../components/Popover'
import {
	refreshCircleOutline,	
	returnUpBackOutline,
	arrowBackOutline,
	bookOutline,	
	chevronDownCircleOutline
} from 'ionicons/icons'
export default {
	name: 'Manga',
	components: {
		IonPage,
		IonBackButton,
		IonButtons,
		IonTitle,
		IonToolbar,
		IonSpinner,
		IonCol,
		IonIcon,
		IonButton,
		IonRow,
		IonLabel,
		IonListHeader,
		IonChip,
		IonFabButton,
		IonFab,
		IonContent,
		MangaInfo
	},
	data() {
		return {
			showNavbar: true,
			lastScrollPosition: 0,
			refreshActive: false,
			error: false,
			errorMessage: '',
			isLoading: false,
			mangaInfo: [],
			thumbnail: '',
			modal: '',
			url: 'https://warm-refuge-03594.herokuapp.com/api/'
		}
	},
	setup() {
		const router = useRouter();
		return {
			router,
			refreshCircleOutline,
			returnUpBackOutline,
			arrowBackOutline,
			bookOutline,
			chevronDownCircleOutline
		}
	},
	beforeRouteUpdate() {
		this.getMangaInfo()
	},
	created() {
		this.getMangaInfo()
	},
	watch: {
		'router': 'getMangaInfo'
	},
	methods: {
		async popOver() {
			const popover = await popoverController.create({
				component: Popover,
				translucent: true,
				componentProps: {
					description: this.mangaInfo.description
				},

			})
			return popover.present();
		},
		goBack() {
			this.router.back();
		},
		refreshInfo() {
			this.refreshActive = true
			this.getMangaInfo()

			if (this.mangaInfo != '') {
				this.refreshActive = false
				this.error = false
			}
		},
		async getMangaInfo() {
			this.isLoading = true
			let currentRoute = this.router.currentRoute.value.params.id
			await axios.get(this.url + 'manga/' + currentRoute).then((res) => {
				this.mangaInfo = res.data
				this.thumbnail = this.mangaInfo.thumbnail
				this.isLoading = false
			}).catch(err => {
				this.errorMessage = err.message
				this.error = true
				this.isLoading = false
				this.refreshActive = false
			})
		},
		doRefresh(e) {
			this.getMangaInfo()
			e.target.complete()
		},
		displayChapter(e) {
			const link = e.link;
			let chapter = link.split('/');
			let chapterNumber = chapter[chapter.length - 1];

			this.router.push('/manga/chapter/' + chapterNumber);
		},
		async openModal() {
			this.modal = await modalController.create({
				component: Synopsis,
				cssClass: 'modal-class',
				showBackdrop: true,
				componentProps: {
					title: this.mangaInfo.title,
					description: this.mangaInfo.description,
					close: () => this.closeModal()
				}
			})
			return this.modal.present();
		},

		onScroll() {
			let currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
			console.log(currentScrollPosition)

		}
	}
}
</script>
<style scoped>
ion-title {
	font-size: 15px;
}

.load {
	position: absolute;
	top: 40%;
	left: 50%;
}

.content {
	width: 100%;

	background-color: #161E29;
	margin-top: -20px;
	z-index: 0;
	position: absolute;
}

p {
	font-weight: 600;
	-webkit-text-stroke: 0.4px black
}

ion-chip {
	font-size: 10px;
}

.info {
	margin-top: -60px;
}

.cover {
	filter: blur(10px);
	margin-top: -50px;
	height: 420px;
	width: 400px;
}

.chapter {
	--border-radius: 5px !important;
	font-weight: bold;
}
ion-content {
	font-family: 'Montserrat', sans-serif !important;
	background-color: #161E29 !important
}

ion-card {
	height: 300px;
	width: 210px;
	border-radius: 20px;
	display: block;
	margin-left: auto;
	margin-right: auto;
}
ion-label {
	font-weight: 700;
}
</style>