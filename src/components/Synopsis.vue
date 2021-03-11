<template>
	<ion-header>
    <ion-toolbar color="blue-dark">
   
			<ion-button color="blue-dark" slot="end" @click="closeModal" size="small"> Close</ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding" color="blue-dark">
    <h3>Synopsis</h3>
		<p>{{ description }}</p>
  </ion-content>
</template>
<script>

export default {
	name: 'Synopsis',
	props: {
		title :{
			type: String
		},
		description: {
			type: String
		}, 
		close: {
			type: Function
		}
	},

	data() {
		return {

		}
	},
	methods: {
		closeModal() {
			this.close()
		}
	}
}
</script>