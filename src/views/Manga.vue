<template>
<ion-page>
	<ion-toolbar>
	<ion-buttons slot="start"> 
		<ion-back-button text="" color="primary" default-href="asd" @click="goBack"></ion-back-button>
	</ion-buttons>

	</ion-toolbar>
	<ion-content :fullscreen="true" color="blue-dark">
		<ion-fab v-if="isLoading" horizontal="center" vertical="center">
				<ion-fab-button color="primary">
					<ion-spinner name="crescent" color="light"></ion-spinner>
				</ion-fab-button>
			</ion-fab>
		<div v-if="mangaInfo != ''">
		<div class="top">
		<div class="ion-text-center">
			<img class="cover" :src="mangaInfo.thumbnail" >
		</div>
		<div class="info">
		<ion-row :style="{ position: 'absolute', marginTop: '-300px'}">
			<ion-col size="6">
					<img class="thumbnail" :src="mangaInfo.thumbnail">
			</ion-col>
			<ion-col size="6">
				<div class="info-right">
				<p>{{ mangaInfo.title }}</p>
				<p><ion-icon :icon="personOutline"></ion-icon> {{ mangaInfo.author}}</p>
				<p><ion-chip color="primary">{{ mangaInfo.status }}</ion-chip></p>
				<ion-row>
					<ion-button color="blue-dark" size="small" expand="block" @click="openModal">View Synopsis</ion-button>
				</ion-row>
				<ion-row><ion-button color="primary" size="small" @click="displayChapter(mangaInfo.chapters[mangaInfo.chapters.length - 1])"  expand="full">Start Ch. 1 </ion-button></ion-row>
				</div>
			</ion-col>
		</ion-row>
		</div>
		</div>
		<div class="content">
		<ion-row>
			<ion-col size="6" class="ion-text-center">
				
			</ion-col>
			<ion-col size="6">
				
			</ion-col>
		</ion-row>
		<ion-row class="ion-padding-start" v-if="mangaInfo">
			<h3>Chapters</h3>
		</ion-row>
			<ion-row>
				<ion-col size="3" v-for="chapter in mangaInfo.chapters"
		:key="chapter.chapter">
					<ion-chip class="ion-text-center" @click="displayChapter(chapter)" button style="width:80px">
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

import { useRouter} from 'vue-router';
import axios from 'axios';
import { modalController, IonPage } from '@ionic/vue'
import Synopsis from '../components/Synopsis'
import { refreshCircleOutline,personOutline, returnUpBackOutline } from 'ionicons/icons'
export default {
	name: 'Manga',
	components: {
		IonPage
	},
	data() {
		return {
			refreshActive : false,
			error : false,
			errorMessage: '',
			isLoading : false,
			mangaInfo: [],
			thumbnail :'',
			modal: '',
			url: 'https://warm-refuge-03594.herokuapp.com/api/'
		}
	},
	setup() {		
		const router = useRouter();
		return {
			router,		
			refreshCircleOutline,
			personOutline,
			returnUpBackOutline
		}		
	},
	created() {
		this.getMangaInfo()
	},
	methods: {
		goBack() {
			return this.router.back();
		},
		refreshInfo() {
			this.refreshActive = true
			this.getMangaInfo()

			if(this.mangaInfo != '') {
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
		closeModal() {
			this.modal.dismiss();
		}
	}
}
</script>
<style scoped>
	.top {
		
	}
	.content { 
		width:100%;
		border-radius: 30px;
		background-color: #161E29;
		margin-top: -20px;
		z-index: 0;
		position: absolute;
	}
	ion-toolbar { 
		--background: transparent;
	}
	p {
		font-weight: 500;
	}

	ion-chip {
		font-size: 13px;
	}
	.info {
		margin-top:-40px;
	}
	.info-right {
		padding: 5px;
		margin-left:10px;
		
		font-size: 14px;
		border-radius: 10px;
		
	}
	.cover {
		filter: blur(10px);
		margin-top:-50px;
		height: 420px;
		width: 400px;
	}
	.chapter {
		--border-radius: 5px !important;
		font-weight: bold;
	}
	
	img {
		
		height:220px;
		border-radius: 5px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
	.thumbnail {
		margin-left:15px;
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


</style>