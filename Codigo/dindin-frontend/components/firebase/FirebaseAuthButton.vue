<template>
  <div>
    
    <div v-if="showOrDivider" class="or-divider">or</div>
    <div id="firebase-auth-button-container"></div>

    <div class="spinner-div">
      <v-progress-circular 
        v-if="loading"
        indeterminate
        color="success"
      />
    </div>

  </div>
</template>

<script>

async function getServerAuthByFirebaseAccessToken(accessToken){
  console.log("fazer requisição", accessToken);
  // fazer chamada no backend passando o accessToken do firebase
  // essa requisição retorna o jwt
  return this.$axios
    .post("/user/auth", {
        token,
      })
    .then((res)=>{
      console.log(res);
    })
} 

function signInSuccessWithAuthResult(authResult, redirectUrl){
  console.log(authResult, authResult.credential.accessToken);
  console.log(this)
  this.loading = true;
  getServerAuthByFirebaseAccessToken(authResult.credential.accessToken)
  .then(()=> this.showOrDivider = false)
  .finally(()=> this.loading = false );

  console.log("tentei ir meu fi")

  return false;
}

export default {
  name: "Auth",
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
    const firebaseUiOptions = {
      signInOptions: [this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID],
      signInSuccessUrl: '/dashboard',
      callbacks: {
        uiShown: () => this.showOrDivider = true,
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          console.log(authResult, authResult.credential.accessToken, this);

          this.loading = true;

          authResult.user.getIdToken()
          .then((firebaseToken)=>{
            this.$axios
            .post("/user/auth", {
                firebaseToken
              })
            .then((res)=>{
              this.$store.dispatch('login/userLogin', {loginData: res.data.token, router: this.$router});
              this.showOrDivider = false;
            })
            .catch((e)=>{
              this.$fire.auth.signOut();
              ui.start("#firebase-auth-button-container", firebaseUiOptions);
              // mudar pra algo com ui mais agradável depois
              alert(`We failed to connect to your google account ;-; ${e}`)
            })
            .finally(()=> this.loading = false );
          })
          

          return false;
        }
      }
    };
    
    ui.start("#firebase-auth-button-container", firebaseUiOptions);
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
.spinner-div{
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>