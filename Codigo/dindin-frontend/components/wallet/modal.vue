<template>
  <v-dialog
    v-model="value"
    max-width="600px"
    @click:outside="$emit('input', false);$emit('modalEdit', false)"
    @keydown.esc="$emit('input', false);$emit('modalEdit', false)"
  >
    <v-card class="pa-2">
      <v-card-title class="text-h5 wallets-modal-title">
        <h4>
          <span> {{ walletToEdit ? 'Edit Wallet': 'New Wallet' }}</span>
        </h4>
        <v-btn icon @click="$emit('input', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-alert v-if="errors.length > 0" type="error">
          Error:
          <ul>
            <li v-for="(er, eidx) in errors" :key="eidx">
              {{ er }}
            </li>
          </ul>
        </v-alert>
        <!-- wallet Add Form -->
        <v-container fluids>
          <v-form ref="form" lazy-validation @submit.prevent="saveWallet">
            <v-row class="pb-2">
              <v-text-field
                v-model="wallet.description"
                :rules="[rules.required]"
                prepend-inner-icon="mdi-tag"
                outlined
                hide-details="auto"
                :clearable="true"
                label="Description"
                maxlength="40"
              />
            </v-row>
            <v-row v-if="walletToEdit == null" class="pb-2">
              <v-text-field
                v-model="wallet.initial_value"
                :rules="[rules.required]"
                prepend-inner-icon="mdi-cash"
                outlined
                type="number"
                maxlength="40"
                hide-details="auto"
                :clearable="true"
                label="Current Value"
              />
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="4" align="center">
            <v-btn text color="black" @click.stop="$emit('input', false)"
              >Cancel</v-btn
            >
          </v-col>
          <v-col v-if="walletToEdit != null" class="mr-2">
            <v-btn block color="primary" @click.stop="editWallet()">Edit</v-btn>
          </v-col>
          <v-col v-else class="mr-2">
            <v-btn block color="primary" @click.stop="saveWallet()">Save</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: {
    value: Boolean,
    walletToEdit: Object,
    modalEdit: Boolean,
  },
  data() {
    return {
      wallet: {
        description: null,
        initial_value: null
      },
      menu: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
      errors: [],
    };
  },
  watch: {
    modalEdit: function (modalEdit) {
      if (!modalEdit) {
        this.cleanForm();
      }
    },
    walletToEdit: function (walletToEdit) {
      if (walletToEdit) {
        this.wallet.id=walletToEdit.id;
        this.wallet.description = walletToEdit.description;
        this.wallet.initial_value = walletToEdit.initial_value;
      }
    },
  },
  methods: {
    saveWallet() {
      this.$axios
        .$post('/wallet', this.wallet)
        .then(() => {
          Swal.fire({
            title: "Wallet Created",
            icon: "success",
            showConfirmButton: false,
            toast: true,
            position: "top-end",
            timer: 3000,
            timerProgressBar: true,
          });
          this.cleanForm()
          this.$emit("input", false);
          this.$emit("created", true);
        }).catch(err => {
          Swal.fire({
            title: "Wallet creation failed!",
            text: err.response.data.message,
            icon: "error"
          });
        })
    },
    editWallet() {
      this.$axios
        .$put(`/wallet/${this.wallet.id}`, this.wallet)
        .then(() => {
          Swal.fire({
            title: "Wallet Updated",
            icon: "success",
            showConfirmButton: false,
            toast: true,
            position: "top-end",
            timer: 3000,
            timerProgressBar: true,
          });
          this.cleanForm()
          this.$emit("input", false);
          this.$emit("created", true);
        }).catch(err => {
          Swal.fire({
            title: "Wallet update failed!",
            text: err.response.data.message,
            icon: "error"
          });
        })
    },
    cleanForm() {
      this.wallet = {
        description: null,
        initial_value: null
      }
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
.wallets-modal-title h4 {
  width: calc(100% - 37px);
  text-align: left;
  line-height: 0.1em;
  margin: 20px 0 20px;
}
</style>
