<template>
  <ion-page>
    
    <ion-content color="blue-dark" :fullscreen="true">
      <ion-list-header>
        <ion-text color="light">About the app</ion-text>
      </ion-list-header>
     
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';

export default  {
  name: 'Tab3',
  components: { IonContent, IonPage }
}
</script>