<template>
  <!--Container-->
  <v-container fluid style="overflow: auto; padding: 10vh">
    <v-card width="100%" style="padding: 2vh">
      <v-card-title
        ><h2><b>Register</b></h2></v-card-title
      >

      <v-card-text style="padding: 10vh">
        <v-form ref="usuario" lazy-validation autocomplete="off">
          <v-row>
            <v-col cols="6">
              <v-btn align="center" large block elevation="2"> GOOGLE </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn align="center" large block elevation="2"> FACEBOOK </v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-spacer />
            or
            <v-spacer />
          </v-row>

          <br />
          <br />

          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                dense
                hide-details="auto"
                v-model="usuario.name"
                label="Nome"
                outlined
                :rules="[(value) => !!value || 'Nome é obrigatório']"
              ></v-text-field>
            </v-col>
            <!--LOGIN-->
            <v-col cols="12" sm="12">
              <v-text-field
                dense
                hide-details="auto"
                v-model="usuario.email"
                label="Email"
                outlined
                :rules="[(value) => !!value || 'Email é obrigatório']"
              ></v-text-field>
            </v-col>
            <!--SENHA-->
            <v-col cols="12" sm="12">
              <v-text-field
                dense
                v-model="usuario.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  (value) => !!value || 'Senha é obrigatório',
                  rules.min,
                ]"
                :type="show1 ? 'text' : 'password'"
                label="Senha"
                hint="Pelo menos 8 caracteres, 1 número, 1 letra minúscula e 1 letra maiúscula"
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
                v-model="usuario.confirmPassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  (value) => !!value || 'Confirmar senha é obrigatório',
                  rules.equal,
                ]"
                :type="show1 ? 'text' : 'password'"
                label="Confirmar senha"
                hint="Pelo menos 8 caracteres, 1 número, 1 letra minúscula e 1 letra maiúscula"
                hide-details="auto"
                @click:append="show1 = !show1"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-checkbox v-model="usuario.agree">
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
          <br />
        </v-form>
        <!--BOTAO-->
        <v-row class="mb-6" no-gutters>
          <v-btn large block color="primary" @click="createUsuario">
            <h3>Register</h3>
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- 
    <v-snackbar v-model="toast" shaped>
      {{ toastMensagem }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="toast = false">
          Ok
        </v-btn>
      </template>
    </v-snackbar> -->
  </v-container>
</template>

<script>
export default {
  layout: "main",

  data() {
    return {
      show1: false,
      usuario: {
        name: "",
        password: "",
        confirmPassword: "",
        agree: false,
      },
      rules: {
        min: (v) => {
          if (
            v &&
            v.length >= 8 &&
            /\d/.test(v) &&
            /[a-z]/g.test(v) &&
            /[A-Z]/g.test(v)
          )
            return true;
          else
            return "Min 8 caracteres, 1 número, 1 letra minúscula, 1 letra maiúscula e um caracter especial!";
        },
        equal: (v) => v === this.usuario.password || "Senhas não conferem",
      },
    };
  },
  mounted() {
    //this.listaUsuarios();
    //this.$refs.usuario.reset()
  },
  methods: {
    createUsuario() {
      console.log('oi');
      console.log(this.$refs.usuario.validate());
      if (this.$refs.usuario.validate()) {
        this.$axios
          .post("/user", this.usuario)
          .then((res) => {
            console.log(res);
            console.log(res.data?.user?.id);
            if(res.data?.user?.id > 0){
                alert("Usuário criado com sucesso")
            }
            this.limparDados();

          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    limparDados() {
      this.usuario = {
        name: "",
        senha: "",
        agree: false,
      };
      this.$refs.usuario.reset()

    },
  },
};
</script>
