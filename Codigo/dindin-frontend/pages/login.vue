<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="10" md="5" lg="5">
            <v-card class="py-0" elevation="0">
              <v-row class="py-4" align="center" justify="center">
                <v-img max-width="40%" :src="image" alt="dindin"></v-img>
                <v-text id="title">DinDin</v-text>
              </v-row>

              <v-card-text>
                <v-form
                  ref="formulario"
                  v-on:submit.prevent="handleSubmit"
                >
                  <v-text-field
                    label="Login"
                    name="email"
                    prepend-inner-icon="mdi-account-circle"
                    type="email"
                    class="rounded-0"
                    outlined
                    placeholder="email@email.com"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    ref="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    label="Senha"
                    name="senha"
                    prepend-inner-icon="mdi-lock"
                    :type="show1 ? 'text' : 'password'"
                    outlined
                    class="rounded-0"
                    v-model="senha"
                    @click:append="show1 = !show1"
                  ></v-text-field>

                  <v-btn
                    @click.native="handleSubmit"
                    class="rounded-0 mt-2"
                    color="#5BD098"
                    x-large
                    block
                    dark
                  >
                    Acessar
                  </v-btn>

                  <v-card-actions class="text--secondary">
                    Ainda não se registrou?<a
                      href="/medico/cadastro"
                      class="pl-2"
                      style="color: #25baae"
                      >Registre-se</a
                    >
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import image from "/static/logo.svg";
export default {
  name: "login",
  data() {
    return {
      email: "",
      senha: "",
      image: image,
      tipo: "",
      show1: false, //mostrar a senha
    };
  },
  methods: {
    handleSubmit() {
      console.log("email:" + this.email);
      console.log("senha:" + this.senha);
    },
  },
};
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
#title{
  font-size:300%;
  font-family:'Roboto';
  color:#5BD098;
  font-weight: 100;
}
</style> 
