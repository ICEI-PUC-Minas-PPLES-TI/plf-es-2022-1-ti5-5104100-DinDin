<template>
  <v-container fluid> Goals 
    <v-btn color="accent" large @click.stop="showModal=true">Abrir</v-btn>    
    <modal v-model="showModal" />
  </v-container>
</template>

<script>
import modal from '@/components/goals/modal.vue'
export default {
  layout: "home",
  data () {
    return {
      showModal: false
    }
  },
  components: {
    modal
  }
};
</script>

<style>
</style>