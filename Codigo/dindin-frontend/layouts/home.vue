<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col md="3" class="parent d-none d-md-block">
          <div class="menu">
            <img src="logo.svg" alt="DinDin Logo" class="menu-logo">
            <h1 class="menu-title">DinDin</h1>
            <ul class="menu-list">
              <li v-for="(m,midx) in menus" :key="midx" :class="currentMenu == m.url ? 'menu-list-active': ''">
                <router-link :to="m.url">
                  <v-row>
                    <v-col md="3" xl="2">
                      <i class="menu-list-icon" :class="m.icon"></i>
                    </v-col>
                    <v-col md="9" xl="10">
                      <span class="menu-list-text">
                        {{ m.name }}
                      </span>
                    </v-col>
                  </v-row>
                </router-link>
              </li>
            </ul>
            <ul class="menu-list menu-user">
              <li>
                <v-row>
                  <v-col md="3" xl="2">
                    <i class="menu-list-icon fa-solid fa-user"></i>
                  </v-col>
                  <v-col md="9" xl="10">
                    <span class="menu-list-text">
                      My Account
                    </span>
                  </v-col>
                </v-row>
              </li>
              <li>
                <v-row>
                  <v-col md="3" xl="2">
                    <i class="menu-list-icon fa-solid fa-right-from-bracket"></i>
                  </v-col>
                  <v-col md="9" xl="10">
                    <span class="menu-list-text">
                      Logout
                    </span>
                  </v-col>
                </v-row>
              </li>
            </ul>
          </div>
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
  data(){
    return {
      menus: [{
        name: 'Dashboard',
        icon: 'fa-solid fa-house',
        url: '/dashboard'
      },{
        name: 'Transactions',
        icon: 'fa-solid fa-right-left',
        url: '/transactions'
      },{
        name: 'Wallets',
        icon: 'fa-solid fa-wallet',
        url: '/wallets'
      },{
        name: 'Goals',
        icon: 'fa-solid fa-bullseye',
        url: '/goals'
      }]
    }
  },
  computed:{
    currentMenu(){
      return `/${this.$route.name}`
    }
  }

}
</script>

<style lang="scss" scoped>
  .menu{
    position: relative;
    width: 95%;
    background: #2F2D32;
    height: 100vh;
    border-radius: 0 30px 0 0;
    &-logo{
      width: 60%;
      display: block;
      margin: 0 auto;
    }
    &-title{
      color: #85DFB4;
      font-weight: 400;
      text-align: center;
    }
    &-list{
      margin-top: 20px;
      list-style: none;
      padding: 0;
      &-active{
        .menu-list-icon{
          color: #4C4951;
          background: #85DFB4;
        }
        .menu-list-text{
          color: #85DFB4;
        }
      }
      li{
        padding-left: 20px;
        margin-bottom: 3px;
        &:hover{
          background: #413f44;
        }
      }
      * {
        text-decoration: none !important;
      }
      &-icon{
        padding: 15px;
        background: #4C4951;
        color: #85DFB4;
      }
      &-text{
        display: block;
        margin-top: 10px;
        color: #fff;
      }
    }
    &-user{
      width: 100%;
      position: absolute;
      bottom: 20px;
    }
  }
  .content{
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 100vh;
    width: 100%;
  }
</style>