<template>
<ion-page>
		<ion-toolbar color="blue-dark">
				<ion-buttons slot="start"> 
		<ion-back-button text="" color="secondary" default-href="" @click="() => router.back()"></ion-back-button>
		</ion-buttons>
			<ion-title>Latest Manga</ion-title>
		</ion-toolbar>

	<ion-content :fullscreen="true" color="blue-dark" class="ion-padding-top">
		<div v-if="isLoading" class="loader">
			<ion-spinner name="crescent" color="primary"></ion-spinner>
		</div>
		<ion-row>
        <ion-col size="4" v-for="manga in data" :key="manga.name">
			<p class="chapter ion-text-center">{{ manga.latestChapter.split(" ").splice(-1).toString() }}</p>
			<div class="slideCard" @click="displayManga(manga)">		
				<ion-img :src="manga.thumbnail" @loadeddata="animation.play()"/>	
				<div class="overLay">
					<div class="card-title ion-text-center">
						<p>{{ manga.name }}</p>
					</div>		
				</div>	
			</div>		
        </ion-col>
        <ion-infinite-scroll @ionInfinite="loadMore($event)" :disabled="isDisabled">
			<ion-infinite-scroll-content loading-spinner="crescent">
			</ion-infinite-scroll-content>
		</ion-infinite-scroll>
        </ion-row>
	</ion-content>
</ion-page>
</template>
<script>
import { useRouter} from 'vue-router'
import { IonPage } from '@ionic/vue'
import { createAnimation } from '@ionic/vue';
import axios from 'axios'
export default {
	components: {
		IonPage
	},
	setup() {
		const router = useRouter()
		const animation = createAnimation()
		.addElement(document.querySelector('.slideCard'))
		.duration(1000)
		.fromTo('transform', 'translateX(0px)', 'translateX(50px)')
		.fromTo('opacity', '1', '0.2')
		return {
			router,
			animation
		}
	},
	data() {
		return {
			isLoading: true,
			slug: '',
            page: 1,
            data: [],
            isDisabled: false,
            url: 'https://warm-refuge-03594.herokuapp.com/api/manga/latest/'
		}
	},
	created() {
		this.getData()
	},
	methods: {
		goBack() {
			return this.router.back();
		},
		getData() {
			axios.get(this.url)
            .then((resp) => {
                this.data = resp.data.data
				this.isLoading = false
            })
		},
		loadMore(e){
            this.page += 1
             axios.get(this.url + this.page)
             .then((resp) => {
                
                if(resp.data.data == '') {
                    this.isDisabled = true
                }
                this.data = this.data.concat(resp.data.data)
                if(e) {
                    e.target.complete();
                }
            }).catch(err => {
                console.log(err)
            })
        },
        displayManga(e) {

				let link = e.link;
				let res = link.split('/');
				res = res[res.length - 1];

				this.router.push('/manga/' + res);
		},
	}
}
</script>
<style scoped>
.chapter {
	font-size: 12px;
	position: absolute;
	background-color: black;
	width: 40px;
	height: 25px;
	padding-top: 5px;
	opacity: 0.8;
	border-radius: 10px;
	margin-left:4rem;
	font-weight: 600;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
p {
    font-size:12px;
	font-weight: 600;
}
.slideCard {
	transition : 1s ease-in;
}
ion-img {
    object-fit: cover !important;
    width: 100%;
    height: 140px;
    /* border: 1px solid lightblue; */
   
}
ion-skeleton-text {
	background-color: white;
}
.loader {
	margin-top:50%;
	margin-left:48%;
}
</style>