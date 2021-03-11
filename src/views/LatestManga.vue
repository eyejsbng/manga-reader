<template>
	<ion-header>
		<ion-toolbar color="blue-dark">
				<ion-buttons slot="start"> 
		<ion-back-button text="" color="light" default-href="asd" @click="goBack"></ion-back-button>
		</ion-buttons>
			<ion-title>Latest Manga</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content :fullscreen="true" color="blue-dark">

	</ion-content>
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