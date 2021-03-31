<template>
   <ion-content color="blue-dark" class="ion-no-border ion-padding">
     {{ description }}
  </ion-content>
</template>
<script>
export default {
    name: 'Popover',
    props: {
        description: {
            type:String
        }
    }
}
</script>
