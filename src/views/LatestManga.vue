<template>
<ion-page>
		<ion-toolbar color="blue-dark">
				<ion-buttons slot="start"> 
		<ion-back-button text="" color="light" default-href="" @click="() => router.back()"></ion-back-button>
		</ion-buttons>
			<ion-title>Latest Manga</ion-title>
		</ion-toolbar>

	<ion-content :fullscreen="true" color="blue-dark">

	</ion-content>
</ion-page>
</template>
<script>
import { useRouter} from 'vue-router'
export default {
	setup() {
		const router = useRouter()
		return {
			router
		}
	},
	methods: {
		goBack() {
			return this.router.back();
		}
	}
}
</script>