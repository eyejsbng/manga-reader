<template>
<ion-page>
        <ion-header>
        <ion-toolbar color="blue-dark">
            <ion-buttons slot="start"> 
                <ion-back-button text="" color="secondary" default-href="" @click="goBack"></ion-back-button>
            </ion-buttons>
			<ion-title>{{ slug }}</ion-title>
		</ion-toolbar>
        </ion-header>
	<ion-content :fullscreen="true" color="blue-dark" class="ion-padding-top">
        <div v-if="isLoading" class="loader">
			<ion-spinner name="crescent" color="primary"></ion-spinner>
		</div>
        <ion-row>
        <ion-col size="4" v-for="manga in data" :key="manga.name">
            <div class="ion-text-center slideCard" @click="displayManga(manga)">  
                <p class="chapter"> {{ manga.latestChapter.split(" ").splice(-1).toString() }}</p>  
                <ion-img :src="manga.thumbnail"/>
                <div class="overLay">
                    <div class="card-title">
                        <p>{{ manga.name }}</p>
                    </div>
                    
                </div>
            </div>
        </ion-col>
        <ion-infinite-scroll
                    @ionInfinite="loadMore($event)" :disabled="isDisabled"
                >
                    <ion-infinite-scroll-content
                    loading-spinner="crescent"
                  >
                    </ion-infinite-scroll-content>
                </ion-infinite-scroll>
        </ion-row>
	</ion-content>
    </ion-page>
</template>
<script>
import { useRouter } from 'vue-router'
import { IonPage } from '@ionic/vue'
import axios from 'axios'
export default {
    components: {
        IonPage
    },
    data() {
        return {
            isLoading: true,
            slug: '',
            page: 1,
            data: [],
            isDisabled: false,
            url: 'https://warm-refuge-03594.herokuapp.com/api/manga/genre/'
        }
    },
    beforeRouteUpdate() {
        this.slug = this.router.currentRoute.value.params.slug
    },
    created() {
        
        this.slug = this.router.currentRoute.value.params.slug
        this.getData()
    },
    setup() {
        const router = useRouter()
        return {
            router
        }
    },
    methods: {
        goBack() {
			return this.router.back();
		},
        getData() {
            let slug = this.slug;
            slug = slug.replace(/\s/g, '-');
            axios.get(this.url + `${slug}/${this.page}`)
            .then((resp) => {
                this.data = resp.data.data
                this.isLoading = false
            })
        },
        loadMore(e){
            this.page += 1
             axios.get(this.url + this.slug +'/' + this.page)
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
p {
    font-size:12px;
    font-weight: 600;
}
ion-img {
    object-fit: cover !important;
    width: 100%;
    height: 140px;
    /* border: 1px solid lightblue; */
    transition : 1s ease-in;
}
.loader {
    margin-top:50%;
    margin-left:50%;
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
	margin-bottom:10rem;
	margin-left:4rem;
	font-weight: 600;
}
</style>
