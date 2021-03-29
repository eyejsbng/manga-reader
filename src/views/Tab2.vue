<template>
<ion-page>
    <ion-content color="blue-dark">
        <div class="search">
            <ion-item color="blue-dark" lines="none">
                <h3>Search Manga</h3>
            </ion-item>
            <div>
                <ion-searchbar color="light" :value="keyword" @keydown.enter="searchManga($event.target.value)">
                </ion-searchbar>
            </div>
            <ion-slides :options="opts">
                <ion-slide v-for="g in genre" :key="g">
                    <ion-chip color="light">
                        <ion-label color="secondary">{{ g }}</ion-label>
                    </ion-chip>
                </ion-slide>
            </ion-slides>
        </div>
        <div v-if="isEmpty" class="ion-text-center">
            <p>Sorry we can't find what you're looking for.</p>
        </div>  
        <div class="search-result">
            <div class="message ion-text-center" v-if="searchResult == ''">
                <ion-text color="light">Search any kind of manga</ion-text>
                <p>
                    <img class="ahegao" src="/assets/images/ahegao-1.png">
                </p>
            </div>
           <ion-footer>
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button color="light">
                    <ion-icon :icon="chevronUpOutline"></ion-icon>
                </ion-fab-button>
            </ion-fab>
           </ion-footer>
            <ion-row v-if="!isLoading" style="padding-top:50px">      
               <ion-col size="4" v-for="manga in searchResult" :key="manga.name">
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
    loadingController,
    IonItem,
    IonSearchbar,
    IonLabel,
    IonChip,
    IonSlide,
    IonSlides,
    IonText,
    IonIcon,
    IonFab,
    IonFabButton,
    IonFooter,
    IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonRow,

} from '@ionic/vue';
import {
    useRouter
} from 'vue-router'
import {
    refreshCircleOutline,
    alertCircleOutline,
    chevronUpOutline
} from 'ionicons/icons';
import axios from 'axios'
import _ from 'lodash'
import {
    Plugins
} from '@capacitor/core'
const {
    Storage
} = Plugins
export default {
    name: 'Tab2',
    components: {
        IonContent,
        IonPage,
        IonItem,
        IonSearchbar,
        IonLabel,
        IonChip,
        IonSlide,
        IonSlides,
        IonText,
        IonIcon,
        IonFab,
        IonFabButton,
        IonFooter,
        IonImg,
        IonInfiniteScroll,
        IonInfiniteScrollContent,
        IonRow,
    
    },
    data() {
        return {
            page: 1,
            genre: [
                'Action', 'Adult', 'Adventure', 'Comedy', 'Cooking',
                'Doujinshi', 'Drama', 'Ecchi', 'Fantasy', 'Gender bender', 'Harem', 'Historical', 'Horror',
                'Isekai', 'Josei', 'Manhua', 'Manhwa', 'Martial arts', 'Mature', 'Mecha', 'Medical', 'Mystery',
                'One shot', 'Psychological', 'Romance', 'School life', 'Sci fi', 'Seinen', 'Shoujo', 'Shoujo ai',
                'ShounenShounen ai', 'Slice of life', 'Smut', 'Sports', 'Supernatural', 'Tragedy', 'Webtoons',
                'Yaoi', 'Yuri'
            ],
            opts: {
                slidesPerView: 3.5,
                spaceBetween: 1,
                slideOffsetBefore: 1
            },
            isEmpty: false,
            error: false,
            errorMessage: '',
            keyword: '',
            isTyping: false,
            isLoading: false,
            searchResult: [],
            url: 'https://warm-refuge-03594.herokuapp.com/api/manga/search/',
            searchHistory: [],
            isDisabled : false,
        }
    },
    setup() {
        const router = useRouter()
        return {
            router,
            refreshCircleOutline,
            alertCircleOutline,
            chevronUpOutline
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
        loadMore(e) {
            this.page += 1
           
            axios.get(this.url + this.keyword +'/' + this.page, { timeout: 10000 })
            .then((resp) => {
                
                if(resp.data.data == '') {
                    this.isDisabled = true
                }
                this.searchResult = this.searchResult.concat(resp.data.data)
                if(e) {
                    e.target.complete();
                }
            }).catch(err => {
                console.log(err)
            })
            
        },
        async searchManga(keyword) {
            this.isDisabled = false
            this.page = 1
            const loader = await loadingController.create({
                cssClass: 'loader',
                message: 'Getting data...',
                spinner: 'crescent'
            })
            loader.present()
            this.keyword = keyword
            this.searchHistory.push(keyword)
            this.set(this.searchHistory)
            console.log(this.get())
            axios.get(this.url + keyword , {
                timeout: 10000
            }).then((resp) => {

                this.error = false
                this.searchResult = resp.data.data
                if (this.searchResult == '') {
                    this.isEmpty = true
                } else {
                    this.isEmpty = false
                }
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
        scrollToTop() {
                window.scrollTo(0,0);
        },
        async set(val) {
            await Storage.set({
                key: 'search-history',
                value: val
            })
        },
        async get() {
            const item = await Storage.get({
                key: 'search-history'
            })
            return item
        }
    }
}
</script>

<style>

.search {
    background-color: #161E29;
}

.search-result {
    background-color: #161E29;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
    margin-top: 10px;
    height: auto;
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

.ahegao {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    /* box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 22px 0 rgba(0, 0, 0, 0.19); */
}

ion-img {
    width: 100%;
    height: 140px;
}

.overLay {
    width: 100%;
    height: 110px;
    margin-top: -6%;
    background: #161E29;
    color: #fff;
}


.card-title {
    padding-top: 1px;
    padding-left: 2px;
    font-size: 13px;
}

.sub-title {
    font-size: 12px
}

.my-custom-class {
    --background: black;
}

ion-content {
    background-color: #161E29 !important;
    overflow: scroll;
}

ion-header {
    background-color: #161E29
}

ion-card {
    height: 200px;
    width: 100px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

</style>
