<template>
  <v-dialog
    v-model="show"
    max-width="600px"
    @click:outside="$emit('input', false);$emit('modalEdit', false)"
    @keydown.esc="$emit('input', false);$emit('modalEdit', false)"
  >
    <v-card class="pa-2">
      <v-card-title class="text-h5 wallets-modal-title">
        <h4>
          <span> {{ title }}</span>
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
          <v-form ref="form" v-on:submit.prevent="saveWallet" lazy-validation>
            <v-row class="pb-2">
              <v-text-field
                :rules="[rules.required]"
                prepend-inner-icon="mdi-tag"
                outlined
                v-model="wallet.description"
                hide-details="auto"
                :clearable="true"
                label="Description"
                maxlength="40"
              />
            </v-row>
            <v-row v-if="walletToEdit == null" class="pb-2">
              <v-text-field
                :rules="[rules.required]"
                prepend-inner-icon="mdi-cash"
                outlined
                type="number"
                maxlength="40"
                v-model="wallet.current_value"
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
      title: "New Wallet",
      wallet: {
        id:"",
        description: "",
        current_value:""
      },
      choosenWallet:"",
      menu: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
      errors: [],
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  watch: {
    modalEdit: function (modalEdit) {
      if (modalEdit) {
        this.title = "Edit Wallet";
      } else {
        this.choosenWallet = null;
        let emptyWallet = {
          description: "",
          current_value: "",
        };
        this.fillForm(emptyWallet);
        this.cleanForm();
        this.title = "New Wallet";
      }
    },
    walletToEdit: function (walletToEdit) {
      if (walletToEdit) {
        this.choosenWallet = walletToEdit;
        this.fillForm(this.choosenWallet);
      }
    },
  },
  methods: {
    saveWallet() {
    },
    editWallet() {
    },
    fillForm(data) {
      this.wallet.id=data.id;
      this.wallet.description = data.description;
      this.wallet.current_value = data.current_value;
    },
    cleanForm() {
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
