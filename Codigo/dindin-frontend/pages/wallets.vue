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
              <v-btn block color="white" @click.stop="acceptInivte()">
                Join Wallet
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                block
                color="#5BD098"
                @click.stop="
                  showModal = true;
                  modalEdit = false;
                  walletToEdit = null;
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
                        <span v-if="wallet.is_shared">(shared)</span>
                      </td>
                      <td>R${{ wallet.current_value }}</td>
                      <td>R${{ wallet.current_value }}</td>
                      <td>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              elevation="0"
                              small
                              v-bind="attrs"
                              v-on="on"
                              @click="inviteFiend()"
                            >
                              <i class="fa-solid fa-share"></i>
                            </v-btn>
                          </template>
                          <span class="caption">Shared</span>
                        </v-tooltip>
                        <v-tooltip v-if="wallet.is_shared" top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn elevation="0" small v-bind="attrs" v-on="on">
                              <i class="fa-solid fa-users"></i>
                            </v-btn>
                          </template>
                          <span>Members</span>
                        </v-tooltip>
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
          id: 1,
          description: "Wallet",
          current_value: 1000,
          is_shared: false,
        },
        {
          id: 2,
          description: "Personal",
          current_value: 1000,
          is_shared: false,
        },
        {
          id: 3,
          description: "Family",
          current_value: 1000,
          is_shared: true,
        },
      ],
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
    acceptInivte() {
      Swal.fire({
        title: "Join Wallet",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        confirmButtonText: "Join",
        confirmButtonColor: "#5BD098",
        color: "#000",
        showLoaderOnConfirm: true,
        closeOnConfirm: true,
        closeOnCancel: true,
        preConfirm: (login) => {
          // return fetch(`//api.github.com/users/${login}`)
          //   .then((response) => {
          //     if (!response.ok) {
          //       throw new Error(response.statusText);
          //     }
          //     return response.json();
          //   })
          //   .catch((error) => {
          //     Swal.showValidationMessage(`Request failed: ${error}`);
          //   });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        // if (result.isConfirmed) {
        //   Swal.fire({
        //     title: `${result.value.login}'s avatar`,
        //     imageUrl: result.value.avatar_url,
        //   });
        // }
      });
    },
    inviteFiend() {
      Swal.fire({
        title: "<strong>New wallet invite</strong>",
        icon: "info",
        html: "AAAA9999",
        focusConfirm: false,
        confirmButtonColor: "#5BD098",
        confirmButtonText: "Copy to clipboard",
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
.shared-wallet {
  font-size: 100px;
}
</style>
