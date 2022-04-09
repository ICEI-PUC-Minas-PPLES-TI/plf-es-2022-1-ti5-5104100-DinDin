<template>
  <!--Container-->
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="12" md="10" lg="6">
        <v-card width="100%" style="padding: 5vh">
          <v-card-title
            ><h2><b>Register</b></h2></v-card-title
          >

          <v-card-text style="padding: 7vh">
            <v-form ref="user" lazy-validation autocomplete="off">
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    dense
                    hide-details="auto"
                    v-model="user.name"
                    label="Name"
                    placeholder="Full name"
                    outlined
                    :rules="[(value) => !!value || 'Name is requried']"
                  ></v-text-field>
                </v-col>
                <!--LOGIN-->
                <v-col cols="12" sm="12">
                  <v-text-field
                    dense
                    hide-details="auto"
                    v-model="user.email"
                    label="Email"
                    placeholder="Enter Email Address"
                    outlined
                    :rules="[(value) => !!value || 'Email is requried']"
                  ></v-text-field>
                </v-col>
                <!--SENHA-->
                <v-col cols="12" sm="12">
                  <v-text-field
                    dense
                    v-model="user.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[
                      (value) => !!value || 'Password is requried',
                      rules.min,
                    ]"
                    :type="show1 ? 'text' : 'password'"
                    label="Password"
                    hint="At least 8 caracteres"
                    hide-details="auto"
                    @click:append="show1 = !show1"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    dense
                    v-model="user.confirmPassword"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[
                      (value) => !!value || 'Confirm Password is requried',
                      rules.equal,
                    ]"
                    :type="show2 ? 'text' : 'password'"
                    label="Confirm Password"
                    hint="At least 8 caracteres"
                    hide-details="auto"
                    @click:append="show2 = !show2"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-n3">
                <v-col cols="12" sm="12">
                  <v-checkbox
                    v-model="user.agree"
                    :rules="[(v) => !!v || 'You must agree to continue!']"
                  >
                    <template v-slot:label>
                      <div>
                        I’ve read and agree to the
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <a
                              target="_blank"
                              href="https://vuetifyjs.com"
                              @click.stop
                              v-on="on"
                            >
                              terms
                            </a>
                          </template>
                          Opens in new window
                        </v-tooltip>
                        of privacy policy
                      </div>
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>
            </v-form>
            <!--BOTAO-->
            <v-row no-gutters>
              <v-flex align-self-center>
                <v-btn large block color="primary" @click="createUser">
                  <h3>Register</h3>
                </v-btn>
                <div class="text-center mt-1">
                  <p>
                    Alredy have an account?
                    <a @click="redirectToLogin()"> Sing in </a>
                  </p>
                </div>
              </v-flex>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="toast" shaped>
      {{ toastMensagem }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="redirect == true ? redirectToLogin() : (toast = false)"
        >
          Ok
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  layout: "main",

  data() {
    return {
      show1: false,
      show2: false,
      toast: false,
      redirect: false,
      toastMensagem: "",
      user: {
        name: "",
        password: "",
        confirmPassword: "",
        agree: false,
      },
      rules: {
        min: (v) => {
          if (v && v.length >= 8) return true;
          else return "Min 8 chars";
        },
        equal: (v) => v === this.user.password || "Passwords don't match",
      },
    };
  },
  methods: {
    createUser() {
      if (this.$refs.user.validate()) {
        this.$axios
          .post("/user", this.user)
          .then((res) => {
            if (res.data?.user?.id > 0) {
              this.showToast("User registered successfully");
              this.redirect = true;
            }
            this.cleanData();
          })
          .catch((err) => {
            this.showToast(err.response.data.message);
          });
      }
    },
    cleanData() {
      this.user = {
        name: "",
        senha: "",
        agree: false,
      };
      this.$refs.user.reset();
    },

    showToast(mensagem) {
      this.toastMensagem = mensagem;
      this.toast = true;
    },

    redirectToLogin() {
      this.$router.push("/login");
      this.toast = false;
    },
  },
};
</script>
