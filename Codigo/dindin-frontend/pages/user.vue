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
                    label="New Password"
                    maxlength="40"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    @click:append="show3 = !show3"
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
      show3: false,
      user: {
        id: "",
        name: "",
        oldPassword: "",
        newPassword: "",
      },

      rules: {
        required: (value) => !!value || "Required",
        min: (v) => {
          if (v && v.length >= 8) return true;
          else return "Min 8 chars";
        },
        equal: (v) => v === this.user.newPassword || "Password don't match!",
      },
    };
  },
  async fetch() {
    await this.$axios
      .get("user/")
      .then((res) => {
        this.user.id = res.data.id;
        this.user.name = res.data.name;
      })
      .catch((err) => {
        Swal.fire({
          title: "Erro",
          html: err.response.data.messag,
          icon: "error",
        });
      });
  },
  mounted() {
    //this.getUser();
  },
  methods: {
    updateUserPassword() {
      //...
      if (this.$refs.formUserPassword.validate()) {
        const userUpdate = {
          name: this.user.name,
          password: this.user.newPassword,
        };
        this.$axios
          .put("/user/" + this.user.id, userUpdate)
          .then((res) => {
            //console.log(res.data);
            Swal.fire({
              title: "User password update successfully",
              icon: "success",
              showConfirmButton: false,
              toast: true,
              position: "top-end",
              timer: 3000,
              timerProgressBar: true,
            });
            this.$fetch();
          })
          .catch((err) => {
            Swal.fire({
              title: "Erro",
              html: err.response.data.messag,
              icon: "error",
            });
          });
      }
    },
    updateUserName() {
      //...
      if (this.$refs.formUserName.validate()) {
        const userUpdate = {
          name: this.user.name,
        };
        this.$axios
          .put("/user/" + this.user.id, userUpdate)
          .then((res) => {
            Swal.fire({
              title: "User name update successfully",
              icon: "success",
              showConfirmButton: false,
              toast: true,
              position: "top-end",
              timer: 3000,
              timerProgressBar: true,
            });
            this.$fetch();
          })
          .catch((err) => {
            Swal.fire({
              title: "Erro",
              html: err.response.data.messag,
              icon: "error",
            });
          });
      }
    },
  },
};
</script>

<style></style>
