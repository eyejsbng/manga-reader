<template>
    <ion-col size="6">
        <ion-img class="thumbnail" :src="details.thumbnail" />
    </ion-col>
    <ion-col size="6">
        <div class="info-right">
            <p>
                <ion-icon :icon="personOutline"></ion-icon> {{ details.author.replace(",", "")}}
            </p>
            <p>
                <ion-icon :icon="pulseOutline"></ion-icon>
                <ion-note :color="details.status.trim() == 'Ongoing' ? 'success' : 'primary'">{{ details.status }}
                </ion-note>
            </p>
            <ion-row>
                <ion-chip class="genre" v-for="g of details.genres" :key="g" @click="displayGenre(g)">
                    <ion-label color="secondary">{{g.genre}}</ion-label>
                </ion-chip>
            </ion-row>
        </div>
    </ion-col>
</template>
<script>
import { IonIcon, IonNote} from '@ionic/vue';
import { personOutline, pulseOutline} from 'ionicons/icons';
import { useRouter } from 'vue-router';
export default {
    props: ['details'],
    components: {
        IonIcon,
        IonNote
    },
    setup() {
        const router = useRouter();
        return {
            router,
            personOutline,
            pulseOutline
        }   
    },
    methods: {
        displayGenre(g) {
            this.router.push({
                name: 'Genre',
                params: {
                    slug: g.genre
                }
            })
        },
    }
}
</script>
<style scoped>
.info-right {
    padding: 5px;
    margin-left:10px;  
    font-size: 15px;
    border-radius: 10px;
    
}
ion-img {
    object-fit: cover !important;
    height:220px;
    border-radius: 5px;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 22px 0 rgba(0, 0, 0, 0.19);
}
ion-chip {
    --background: #2d2d2e;
    font-size: 10px;
}
.thumbnail {
    margin-left: 15px;
}
ion-label {
    font-weight: 700;
}
</style>