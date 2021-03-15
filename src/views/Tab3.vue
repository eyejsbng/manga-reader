<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default  {
  name: 'Tab3',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>