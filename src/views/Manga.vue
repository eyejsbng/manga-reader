<template>
<ion-page>
<ion-header class="ion-no-border">
	<ion-toolbar color="blue-dark">
		<ion-buttons slot="start"> 
		<ion-back-button text="" color="light" default-href="asd" @click="goBack" :style="{ position: 'absolute', }"></ion-back-button>
		</ion-buttons>
		<ion-title>Details</ion-title>
	</ion-toolbar>
</ion-header>
	<ion-content color="blue-dark">
		<div class="ion-text-center">
			<img class="cover" :src="mangaInfo.thumbnail" >
		</div>
		<ion-row :style="{ position: 'absolute', marginTop: '-300px'}">
			<ion-col size="6" size-sm>
					<img :src="mangaInfo.thumbnail" class="ion-text-center">
			</ion-col>
			<ion-col size="6">
				<p>{{ mangaInfo.title }}</p>
		
				<p>Author: {{ mangaInfo.author}}</p>
				<p>Status: 	<ion-chip color="success">{{ mangaInfo.status }}</ion-chip></p>
				<ion-button class="chapter" color="new-custom" @click="openModal" size="small" expand="block">View Synopsis</ion-button>
			</ion-col>
		</ion-row>
		<ion-row class="ion-padding-start" v-if="mangaInfo">
			<h3>Chapters</h3>
		</ion-row>
		
			<ion-row>
				<ion-col size="3" v-for="chapter in mangaInfo.chapters"
		:key="chapter.chapter" @click="displayChapter(chapter)" button>
					<ion-button class="chapter" color="new-custom" size="small" expand="block">
						<b>{{ chapter.chapter }}</b>
					</ion-button>
				</ion-col>
			</ion-row>
			<div class="ion-text-center" v-if="mangaInfo == ''">
					<ion-spinner  name="crescent" color="light"></ion-spinner>
			</div>
	</ion-content>
</ion-page>
</template>
<script>

import { useRouter} from 'vue-router';
import axios from 'axios';
import { modalController, IonPage } from '@ionic/vue'
import Synopsis from '../components/Synopsis'
export default {
	name: 'Manga',
	components: {
		IonPage
	},
	data() {
		return {
			mangaInfo: [],
			thumbnail :'',
			modal: '',
		}
	},
	setup() {
		
const router = useRouter();
			return {
				router,
				
			}		
	},
	created() {
		this.getMangaInfo()
	},
	beforeEnter() {
		
	},
	methods: {
		goBack() {
			return this.router.back();
		},
		async getMangaInfo() {
			
			let currentRoute = this.router.currentRoute.value.params.id
			axios.get('http://localhost:3000/api/manga/' + currentRoute).then((res) => {
					this.mangaInfo = res.data
					this.thumbnail = this.mangaInfo.thumbnail
				
			})
		},
		displayChapter(e) {
				const link = e.link;
				let chapter = link.split('/');
				let chapterNumber = chapter[chapter.length - 1];
				console.log(chapterNumber);
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
	.cover {
		filter: blur(10px);
		height: 310px;
		width: 320px;
	}
	.chapter {
		--border-radius: 5px !important;
		font-weight: bold;
	}
	
	img {
		border-radius: 10px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
	ion-content {
		font-family: 'Montserrat', sans-serif !important;
		background-color: #161E29 !important
	}

	ion-header {
		background-color: #161E29;
	
	}

	ion-card {
		height: 300px;
		width: 210px;	
		border-radius: 20px;
		display: block;
		margin-left: auto;
  margin-right: auto;
	}

	ion-img {
		height: 300px;
		width:auto;

	}
</style>