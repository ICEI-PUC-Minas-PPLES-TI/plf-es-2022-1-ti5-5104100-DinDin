<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col md="3" class="parent">
          <div class="menu"></div>
        </v-col>
        <v-col md="9">
          <div class="content">
            <Nuxt />
          </div>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .menu{
    position: relative;
    width: 95%;
    background: #2F2D32;
    height: 100vh;
    border-radius: 0 30px 0 0;
  }
  .content{
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 100vh;
    width: 100%;
  }
</style>