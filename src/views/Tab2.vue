<template>
	<ion-page>

		<ion-content color="light">
			<div class="search">
			<ion-item color="light" lines="none">
				<h3>Search Manga</h3>
			</ion-item>

			<div >
				<ion-searchbar :value="keyword" @keydown.enter="searchManga($event.target.value)"></ion-searchbar>
			</div>			
			<ion-slides :options="opts">
				<ion-slide v-for="g in genre" :key="g">
					<ion-chip>
						<ion-label color="secondary">{{ g }}</ion-label>
					</ion-chip>
				</ion-slide>
			</ion-slides>
			</div>
			<div class="search-result">
			<ion-row v-if="!isLoading" style="padding-right:25px">
				<ion-col size="4" v-for="manga in searchResult.data" :key="manga.name">
					<ion-card class="slideCard" @click="displayManga(manga)">
						<img :src="manga.thumbnail">
						<div class="overLay">
							<div class="card-title">
								<p>{{ manga.name }}</p>
							</div>
							<div class="sub-title">
									<p> {{ manga.latestChapter }}</p>
								</div>
						</div>
					</ion-card>
				</ion-col>
				<div v-if="error" class="ion-text-center">
			<div class="error-message">
			<p>Somethings wrong.</p>
			<p>Please try again.</p>
			</div>
	
				
					<ion-icon v-if="!refreshActive" :icon="alertCircleOutline"></ion-icon>
		
		</div>
			</ion-row>
			</div>
	
		</ion-content>
	</ion-page>
</template>

<script>
	import {
		IonPage,
		IonContent,
		loadingController
	} from '@ionic/vue';
	import {
		useRouter
	} from 'vue-router'
	import { refreshCircleOutline, alertCircleOutline } from 'ionicons/icons';
	import axios from 'axios'
	import _ from 'lodash'
	import { Plugins } from '@capacitor/core'
	const { Storage } = Plugins
	export default {
		name: 'Tab2',
		components: {
			IonContent,
			IonPage
		},
		data() {
			return {
				genre: [
					'Action','Adult','Adventure','Comedy','Cooking',
					'Doujinshi', 'Drama', 'Ecchi', 'Fantasy', 'Gender bender','Harem','Historical','Horror','Isekai','Josei','Manhua', 'Manhwa','Martial arts', 'Mature', 'Mecha', 'Medical', 'Mystery','One shot','Psychological','Romance', 'School life','Sci fi','Seinen','Shoujo','Shoujo ai','ShounenShounen ai','Slice of life','Smut','Sports','Supernatural', 'Tragedy', 'Webtoons', 'Yaoi', 'Yuri'
				],
				opts: {
					slidesPerView: 3.5,
					spaceBetween: 1,
					slideOffsetBefore: 1
				},
				error : false,
				errorMessage :'',
				keyword: '',
				isTyping: false,
				isLoading: false,
				searchResult: [],
				url: 'https://warm-refuge-03594.herokuapp.com/api/',
				searchHistory: [],

			}
		},
		setup() {
			const router = useRouter()
			return {
				router,
				refreshCircleOutline,
				alertCircleOutline
			}
		},
		watch: {
			keyword: _.debounce(function () {
				this.isTyping = false;
			}, 1000),
			isTyping: function (value) {
				if (!value) {
					this.searchManga(this.keyword)
				}
			}
		},
		created() {
			
		},
		methods: {
			async searchManga(keyword) {

				const loader = await loadingController.create({
					cssClass: 'loader',
					message: 'Getting data...',
					spinner: 'crescent'
				})
				loader.present()
				this.searchHistory.push(keyword)
				this.set(this.searchHistory)
				axios.get(this.url + 'manga/search/' + keyword, {timeout:4000}).then((resp) => {

					this.searchResult = resp.data
					loader.dismiss()
				}).catch(err => {
					loader.dismiss()
					this.errorMessage = err
					this.error = true
					
				})
			},
			displayManga(e) {
				const link = e.link;
				let res = link.split('/');
				res = res[res.length - 1];
				console.log(res);
				console.log(link)
				this.router.push('/manga/' + res);
			},
			async set(val) {
				await Storage.set({
					key: 'search-history',
					value: val
				})
			},
			async get() {
				const item = await Storage.get({ key: 'search-history'})
				return item
			}
		}
	}
</script>
<style>
	.search {
		background-color: #f4f5f8;
	}
	.search-result {
		background-color: #161E29;
		border-top-right-radius: 25px;
		border-top-left-radius: 25px;
		margin-top:10px;
	}
	ion-chip {
		--background: #161E29;
	}
	ion-searchbar {
		--background: #161E29;
	}
	.loader {
		--background: #161E29;
		color: white;
	}
img{
			width:100%;
			height:140px;
		}

		.sliderCard{
			position:relative;

		}
		.overLay{
    width: 100%;
    height: 110px;
    position: relative;
    
	margin-top:-18%;
	
    background: #161E29;
    color: #fff;

}
	.slider-img {
		max-width:100% !important;
		max-height:100% !important;
	}
	.card-title {
		padding-top:1px;
		padding-left:2px;
		font-size: 13px;
	}
	.sub-title {
		font-size: 12px
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
		height: 200px;
		width:100px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	ion-img {
		height: 120px
	}
</style>