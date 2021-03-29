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
	<ion-content :fullscreen="true" color="blue-dark">
        <ion-row>
        <ion-col size="4" v-for="manga in data" :key="manga.name">
                    <div class="ion-text-center slideCard" @click="displayManga(manga)">
                        <ion-img :src="manga.thumbnail"/>
                        <div class="overLay">
                            <div class="card-title">
                                <p>{{ manga.name }}</p>
                            </div>
                            <div class="sub-title">
                                <p> {{ manga.latestChapter }}</p>
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
import axios from 'axios'
export default {

    data() {
        return {
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
            axios.get(this.url + this.slug +'/' + this.page)
            .then((resp) => {
                this.data = resp.data.data
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
        }
    }
}
</script>
<style>
p {
    font-size:12px;
}
ion-img {
    width: 100%;
    height: 140px;
    border-radius: 5px;
}
</style>
