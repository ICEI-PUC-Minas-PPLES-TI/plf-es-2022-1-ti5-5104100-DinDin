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
                    :rules="(value) => !!value || 'Required'"
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
              <span> User Data </span>
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
                    :rules="(value) => !!value || 'Required'"
                    outlined
                    v-model="user.oldPassword"
                    hide-details="auto"
                    :clearable="true"
                    label="Old Password"
                    maxlength="40"
                  />
                </v-row>
                <v-row class="pb-2">
                  <v-text-field
                    :rules="(value) => !!value || 'Required'"
                    outlined
                    v-model="user.password"
                    hide-details="auto"
                    :clearable="true"
                    label="Password"
                    maxlength="40"
                  />
                </v-row>
                <v-row class="pb-2">
                  <v-text-field
                    :rules="(value) => !!value || 'Required'"
                    outlined
                    v-model="user.confirmPassword"
                    hide-details="auto"
                    :clearable="true"
                    label="Confirm Password"
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
export default {
  layout: "home",
  data() {
    return {
      user: {
        id: "",
        name: "",
        oldPassword: "",
        confirmPassword: "",
        newPassword: "",
      },
    };
  },
  mounted: {
    //pegar usuario na sessao e chamar o edit
    //this.getUser(id)
  },
  methods: {
    updateUserPassword() {
      //...
      if (this.$refs.form.formUserPassword()) {
        this.$axios.put("/user/" + this.user.id);
      }
    },
    updateUserName() {
      //...
      if (this.$refs.form.formUserName()) {
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

<style>
</style>