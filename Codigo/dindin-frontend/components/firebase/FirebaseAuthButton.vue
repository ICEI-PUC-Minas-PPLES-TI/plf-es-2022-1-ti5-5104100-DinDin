<template>
  <div>
    <v-progress-circular 
      v-if="loading"
    />
    <div v-if="showOrDivider" class="or-divider">or</div>
    <div v-if="!loading" id="firebase-auth-button-container"></div>
  </div>
</template>

<script>
async function getServerAuthByFirebaseAccessToken(accessToken){
  // fazer chamada no backend passando o accessToken do firebase
  // essa requisição retorna o jwt
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("jwt"), 2000);
  })
} 

export default {
  name: "auth",
  data() {
    return {
      showOrDivider: false,
      loading: false
    }
  },
  mounted() {
    const firebaseui = require("firebaseui");
    require("firebaseui/dist/firebaseui.css");

    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(this.$fire.auth);

    // const uiConfig = {
    //   signInOptions: [this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID],
    //   callbacks: {
    //     on
    //   }
    // };

    ui.start("#firebase-auth-button-container", {
      signInOptions: [this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID],
      tosUrl: '/dashboard',
      callbacks: {
        uiShown: () => this.showOrDivider = true,
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          console.log(authResult, authResult.credential.accessToken);

          this.loading = true;
          getServerAuthByFirebaseAccessToken(authResult.credential.accessToken)
          .then(()=> this.showOrDivider = false)
          .finally(()=> this.loading = false );

          //return false;
        }
      }
    });
  },
};
</script>

<style>
#firebase-auth-button-container .firebaseui-container {
  width: 100%;
  max-width: 100%;
}
#firebase-auth-button-container .firebaseui-card-content {
  max-width: 100%;
  padding: 0;
}
#firebase-auth-button-container ul.firebaseui-idp-list {
  padding: 0;
}
#firebase-auth-button-container .firebaseui-idp-button {
  max-width: 100%;
}
.or-divider{
  color: #8a8a8a;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: .8rem 0;
}
</style>