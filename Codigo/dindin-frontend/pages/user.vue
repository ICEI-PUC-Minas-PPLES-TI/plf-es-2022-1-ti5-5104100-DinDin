<template>
  <v-container fluid>
    <!-- Page Title -->
    <v-row>
      <v-col>
        <h2 class="page-title">Edit Profile</h2>
      </v-col>
    </v-row>

    <!-- Card User Data -->

    <v-row>
      <v-col sm="12" md="6" lg="6" cols="12">
        <v-card elevation="0" class="p-20">
          <!-- Card title -->
          <v-card-title class="text-h5 wallets-modal-title">
            <h4>
              <span> User Data </span>
            </h4>
          </v-card-title>
          <v-card-text>
            <!-- wallet Add Form -->
            <v-container fluids>
              <v-form
                ref="formUserName"
                v-on:submit.prevent="updateUserName"
                lazy-validation
              >
                <v-row class="pb-2">
                  <v-text-field
                    :rules="[rules.required]"
                    outlined
                    v-model="user.name"
                    hide-details="auto"
                    :clearable="true"
                    label="Full name"
                    maxlength="40"
                  />
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col align="center">
                <v-btn block color="primary" @click.stop="updateUserName()"
                  >Save</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col sm="12" md="6" lg="6" cols="12">
        <v-card elevation="0" class="p-20">
          <!-- Card title -->
          <v-card-title class="text-h5 wallets-modal-title">
            <h4>
              <span> User Password </span>
            </h4>
          </v-card-title>
          <v-card-text>
            <!-- wallet Add Form -->
            <v-container fluids>
              <v-form
                ref="formUserPassword"
                v-on:submit.prevent="updateUserPassword"
                lazy-validation
              >
                <v-row class="pb-2">
                  <v-text-field
                    :rules="[rules.required]"
                    outlined
                    v-model="user.oldPassword"
                    hide-details="auto"
                    :clearable="true"
                    label="Old Password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    maxlength="40"
                  />
                </v-row>
                <v-row class="pb-2">
                  <v-text-field
                    :rules="[rules.required, rules.min]"
                    outlined
                    v-model="user.newPassword"
                    hide-details="auto"
                    :clearable="true"
                    label="Password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    maxlength="40"
                  />
                </v-row>
                <v-row class="pb-2">
                  <v-text-field
                    :rules="[rules.required, rules.equal]"
                    outlined
                    v-model="user.confirmPassword"
                    hide-details="auto"
                    :clearable="true"
                    label="Confirm Password"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    @click:append="show3 = !show3"
                    maxlength="40"
                  />
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col align="center">
                <v-btn block color="primary" @click.stop="updateUserPassword()"
                  >Save</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";

export default {
  layout: "home",
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      user: {
        id: "",
        name: "",
        oldPassword: "",
        confirmPassword: "",
        newPassword: "",
      },

      rules: {
        required: (value) => !!value || "Required",
        min: (v) => {
          if (
            v &&
            v.length >= 6
          )
            return true;
          else
            return "Min 6 chars";
        },
        equal: (v) => v === this.user.newPassword || "Password don't match!",
      },
    };
  },
  // mounted: {
  //   //pegar usuario na sessao e chamar o edit
  //   //this.getUser(id)
  // },
  methods: {
    updateUserPassword() {
      //...
      if (this.$refs.formUserPassword.validate()) {
        const user = {
          id: this.user.id,
          name: this.user.name,
          password: this.user.newPassword,
        };
        this.$axios.put("/user/" + this.user.id).then(res);
      }
    },
    updateUserName() {
      //...
      if (this.$refs.formUserName.validate()) {
      }
    },
    getUser(id) {
      this.$axios
        .get("user/" + id)
        .then((res) => {
          this.user = res.user; //verificar
        })
        .catch((err) => {
          Swal.fire({
            title: "Erro",
            html: err.response.data.messag,
            icon: "error",
          });
        });
    },
  },
};
</script>

<style></style>
