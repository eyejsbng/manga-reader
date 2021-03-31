<template>
  <ion-page>
    <ion-tabs class="ion-no-border">
      <ion-tab-bar  color="blue-dark" slot="bottom">
        <ion-tab-button  tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="compass" />
        </ion-tab-button>
        <ion-tab-button  tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="searchOutline" />
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="appsOutline" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage } from '@ionic/vue';
import { ellipse, homeOutline, searchOutline, compass, appsOutline } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      ellipse, 
      homeOutline, 
      searchOutline,
      compass,
      appsOutline
    }
  }
}
</script>
<style scoped>
.tab-selected {
  border-top: 3px solid #3880ff;
  transition: 0.5s;
  color:#3880ff;
}

</style>