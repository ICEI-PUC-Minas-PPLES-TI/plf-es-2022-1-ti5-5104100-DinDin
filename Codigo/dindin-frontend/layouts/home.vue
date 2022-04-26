<template>
  <v-app id="dindin-app">
    <v-main>
      <v-row>
        <v-col md="3" xl="2" class="parent d-none d-md-block">
          <div class="menu">
            <img src="logo.svg" alt="DinDin Logo" class="menu-logo" />
            <h1 class="menu-title">DinDin</h1>
            <ul class="menu-list">
              <li
                v-for="(m, midx) in menus"
                :key="midx"
                :class="currentMenu == m.url ? 'menu-list-active' : ''"
              >
                <router-link :to="m.url">
                  <v-row>
                    <v-col md="3">
                      <i class="menu-list-icon" :class="m.icon"></i>
                    </v-col>
                    <v-col md="9">
                      <span class="menu-list-text">
                        {{ m.name }}
                      </span>
                    </v-col>
                  </v-row>
                </router-link>
              </li>
            </ul>
            <ul class="menu-list menu-user">
              <li
                v-for="(m, midx) in menusUser"
                :key="midx"
                :class="currentMenu == m.url ? 'menu-list-active' : ''"
              >
                <router-link :to="m.url">
                  <v-row>
                    <v-col md="3">
                      <i class="menu-list-icon" :class="m.icon"></i>
                    </v-col>
                    <v-col md="9">
                      <span class="menu-list-text">
                        {{ m.name }}
                      </span>
                    </v-col>
                  </v-row>
                </router-link>
              </li>
            </ul>
          </div>
        </v-col>
        <v-col md="9" xl="10">
          <v-app-bar class="d-block d-md-none" color="#5BD098" dark>
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>

            <v-toolbar-title>DinDin</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon @click="$router.push('/dashboard')">
              <img src="logo.svg" alt="DinDin Logo" width="50px" />
            </v-btn>
          </v-app-bar>
          <div class="content">
            <Nuxt />
          </div>
        </v-col>
      </v-row>
      <v-navigation-drawer v-model="drawer" absolute left temporary>
        <v-list nav dense>
          <v-list-item-group
            active-class="light-green lighten-3 text--accent-4"
            :value="currentMenu"
          >
            <v-subheader>Menus</v-subheader>
            <v-list-item
              v-for="(m, midx) in menus"
              :key="midx"
              :class="currentMenu == m.url ? 'a' : ''"
              :to="m.url"
            >
              <v-list-item-icon>
                <i style="margin-top: 3px" :class="m.icon"></i>
              </v-list-item-icon>
              <v-list-item-title>{{ m.name }}</v-list-item-title>
            </v-list-item>
            <v-subheader>User</v-subheader>
            <v-list-item to="/user">
              <v-list-item-icon>
                <i class="fa-solid fa-user"></i>
              </v-list-item-icon>
              <v-list-item-title>My Account</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <i class="fa-solid fa-right-from-bracket"></i>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menus: [
        {
          name: "Dashboard",
          icon: "fa-solid fa-house",
          url: "/dashboard",
        },
        {
          name: "Transactions",
          icon: "fa-solid fa-right-left",
          url: "/transactions",
        },
        {
          name: "Wallets",
          icon: "fa-solid fa-wallet",
          url: "/wallets",
        },
        {
          name: "Goals",
          icon: "fa-solid fa-bullseye",
          url: "/goals",
        },
      ],
      menusUser: [
        {
          name: "My Account",
          icon: "fa-solid fa-solid fa-user",
          url: "/user",
        },
        {
          name: "Logout",
          icon: "fa-solid fa-right-from-bracket",
          url: "/login",
        },
      ],
    };
  },
  computed: {
    currentMenu() {
      return `/${this.$route.name}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  position: relative;
  width: 95%;
  background: #2f2d32;
  height: 100vh;
  border-radius: 0 30px 0 0;
  &-logo {
    width: 60%;
    display: block;
    margin: 0 auto;
  }
  &-title {
    color: #85dfb4;
    font-weight: 400;
    text-align: center;
  }
  &-list {
    margin-top: 20px;
    list-style: none;
    padding: 0;
    &-active {
      .menu-list-icon {
        color: #4c4951;
        background: #85dfb4;
      }
      .menu-list-text {
        color: #85dfb4;
      }
    }
    li {
      padding-left: 20px;
      margin-bottom: 3px;
      &:hover {
        background: #413f44;
      }
    }
    * {
      text-decoration: none !important;
    }
    &-icon {
      padding: 15px;
      background: #4c4951;
      color: #85dfb4;
    }
    &-text {
      display: block;
      margin-top: 10px;
      color: #fff;
    }
  }
  &-user {
    width: 100%;
    position: absolute;
    bottom: 20px;
  }
}
.content {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100vh;
  width: 100%;
}
</style>
