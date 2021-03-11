<template>
  <ion-page>
    <ion-tabs mode="ios">
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="homeOutline" />
         
        </ion-tab-button>
				
        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="searchOutline" />
          
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="ellipse" />
        
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage } from '@ionic/vue';
import { ellipse, homeOutline, searchOutline } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      ellipse, 
      homeOutline, 
      searchOutline,
    }
  }
}
</script>
<style scoped>
ion-content {
	background: #161E29
}
ion-tab-bar, ion-tab-button{
 background-color: #161E29;
}
ion-icon{
  color: #d7d8da;
}
</style>