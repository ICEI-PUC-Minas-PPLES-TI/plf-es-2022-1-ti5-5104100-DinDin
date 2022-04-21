<template>
  <v-container fluid>
    <!-- Page Title -->
    <v-row>
      <v-col>
        <h2 class="page-title">Wallet</h2>
      </v-col>
    </v-row>
    <!-- Table Section -->
    <v-row>
      <v-col>
        <v-card elevation="0" class="p-20">
          <!-- Table top toolbar -->
          <v-row>
            <v-col cols="7" sm="0"> </v-col>
            <v-col>
              <v-btn
                block
                color="white"
              >
                Join Wallet
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                block
                color="success"
                @click.stop="
                  showModal = true;
                  modalEdit = false;
                  walletToEdit=null;
                "
              >
                New Wallet
              </v-btn>
            </v-col>
          </v-row>
          <!-- Table -->
          <v-row>
            <v-col>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Total Amount</th>
                      <th class="text-left">Current Month Amount</th>
                      <th class="text-left">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="loading">
                      <td colspan="6">Loading...</td>
                    </tr>
                    <tr v-for="(wallet, gidx) in wallets" :key="gidx">
                      <td>
                        {{ wallet.description }}
                      </td>
                      <td>R${{ wallet.current_value }}</td>
                      <td>R${{ wallet.current_value }}</td>
                      <td>
                       <!-- <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn elevation="0" small v-bind="attrs" v-on="on">
                              <i class="fa-solid fa-eye"></i>
                            </v-btn>
                          </template>
                          <span>View</span>
                        </v-tooltip> --> 
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              elevation="0"
                              small
                              v-bind="attrs"
                              v-on="on"
                              @click="editWallet(wallet)"
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
                            </v-btn>
                          </template>
                          <span>Edit</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              elevation="0"
                              small
                              color="error"
                              v-bind="attrs"
                              v-on="on"
                              @click="removeWallet(wallet)"
                            >
                              <i class="fa-solid fa-trash"></i>
                            </v-btn>
                          </template>
                          <span>Delete</span>
                        </v-tooltip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <!-- Pagination -->
          <v-row>
            <v-col cols="12" md="8" offset-md="4">
              <div class="mw-100">
                <v-pagination
                  v-model="currentPage"
                  class="my-4"
                  :length="pages"
                  @input="changePagination"
                ></v-pagination>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <modal
      :walletToEdit="this.walletToEdit"
      :modalEdit="this.modalEdit"
      v-model="showModal"
      @created="$fetch"
    />
  </v-container>
</template>

<script>
import modal from "@/components/wallet/modal.vue";
import Swal from "sweetalert2";
export default {
  layout: "home",
  components: {
    modal,
  },
  data() {
    return {
      currentPage: 1,
      pages: 1,
      wallets: [
        {
          id:1,
          description:"Wallet",
          current_value:1000
        },
        {
          id:2,
          description:"Personal",
          current_value:1000
        },
        {
          id:3,
          description:"Family",
          current_value:1000
        }],
      loading: false,
      showModal: false,
      walletToEdit: null,
      modalEdit: false,
    };
  },
  async fetch() {
    // this.loading = true;
    // await this.$axios
    //   .$get(`/wallet?page=${this.currentPage}`)
    //   .then((res) => {
    //     this.pages = res.pages;
    //     this.wallets = res.wallets;
    //   })
    //   .finally(() => {
    //     this.loading = false;
    //   });
  },
  methods: {
    changePagination() {
      this.$fetch();
    },
    removeWallet(wallet) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        reverseButtons: true,
        confirmButtonText: "Yes, I want to delete!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.delete("/wallet/" + wallet.id).then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "The wallet has been deleted.",
              icon: "info",
              showConfirmButton: false,
              toast: true,
              position: "top-end",
              timer: 3000,
              timerProgressBar: true,
            });
          });
        }
        window.location.reload();
      });
    },
    editWallet(wallet) {
      this.walletToEdit = wallet;
      this.modalEdit = true;
      this.showModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-wallets-status {
  text-transform: lowercase;
  &::first-letter {
    text-transform: uppercase;
  }
}
</style>
