<template>
  <ion-page>
    
    <ion-content  color="blue-dark">
			<ion-item color="blue-dark"><h3>Search Manga</h3></ion-item>
		
			<div class="ion-text-center">
			
					<input placeholder="Keyword..." v-model="keyword" @keydown.enter="searchManga(keyword)">
				
			</div>
			<ion-row v-if="!isLoading" style="padding-right:25px">
				<ion-col size="4" v-for="manga in searchResult.data" :key="manga.name">
				<ion-card class="slideCard"  @click="displayManga(manga)">
							<img :src="manga.thumbnail">
							<div class="overLay">
								<div class="card-title"><p style="color:white">{{ manga.name }}</p></div>
							</div>
					</ion-card>
				</ion-col>
			</ion-row>
		
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, loadingController } from '@ionic/vue';
import { useRouter } from 'vue-router'
import axios from 'axios'
import _ from 'lodash'
export default  {
  name: 'Tab2',
  components: { IonContent, IonPage },
	data() {
		return {
			keyword: '',
			isTyping: false,
			isLoading: false,
			searchResult: [],
		}
	},
	setup() {
		const router = useRouter()
		return {
			router
		}
	},
	watch: {
		keyword: _.debounce(function() {
			this.isTyping = false;
		}, 1000),
		isTyping: function(value) {
			if(!value) {
				this.searchManga(this.keyword)
			}
		}
	},
	methods: {
		async searchManga(keyword) {
		
			const loader = await loadingController.create({
				cssClass: 'loader',
				message: 'Getting data...',
				spinner: 'crescent'
			})
				loader.present()
			axios.get('http://localhost:3000/api/manga/search/' + keyword).then((resp) => {
			
				this.searchResult = resp.data
				loader.dismiss()
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
<style>
.loader {
	--background: #161E29;
	color:white;
}
ion-card {
		height: 160px;
		width:100px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

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
input {
	width:80%;
	border-radius: 5px;
	height: 2.5rem;
	background-color: transparent;
	border-color: white;
	color:white;
	padding-top:3px;
	padding-left:20px;
	font-weight: 500;
	font-size: 1.5rem;
}
input:focus {
	border-color:blue
}
</style>