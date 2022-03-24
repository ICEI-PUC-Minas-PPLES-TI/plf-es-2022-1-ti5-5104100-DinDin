<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="10" md="5" lg="5">
            <v-card class="py-0" elevation="0">
              <v-row class="py-4" align="center" justify="center">
                <v-img max-width="25%" :src="image" alt="dindin"></v-img>
                <v-text id="title">DinDin</v-text>
              </v-row>

              <v-card-text>
                <v-form ref="formulario" v-on:submit.prevent="handleSubmit">
                  <v-text-field
                    label="Login"
                    name="email"
                    prepend-inner-icon="mdi-account-circle"
                    type="email"
                    class="rounded-0"
                    outlined
                    placeholder="email@email.com"
                    :rules="[rules.required]"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    ref="password"
                    :error-messages="erroLogin"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    label="Password"
                    name="password"
                    prepend-inner-icon="mdi-lock"
                    :type="show1 ? 'text' : 'password'"
                    outlined
                    class="rounded-0"
                    v-model="password"
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
                    Login
                  </v-btn>

                  <v-card-actions class="text--secondary">
                    Not registered yet?<a class="pl-2" style="color: #25baae"
                      >Create an account</a
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
import image from "/static/logoEstreito.svg";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      image: image,
      show1: false,
      erroLogin: null,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    handleSubmit() {
      if (this.$refs.formulario.validate()) {
        document.cookie = `token=`;
        this.$axios
          .post("/api/user/auth", {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            let d = new Date();
            d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
            document.cookie = "token= ";
            document.cookie = "token=" + res.data;
            this.$router.push('/dashboard')
          })
          .catch((err) => {
            this.erroLogin = "User not Found";
          });
      }
    },
  },
};
</script>

<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap");
#title {
  font-size: 300%;
  font-family: "Roboto";
  color: #5bd098;
  font-weight: 100;
}
</style>
