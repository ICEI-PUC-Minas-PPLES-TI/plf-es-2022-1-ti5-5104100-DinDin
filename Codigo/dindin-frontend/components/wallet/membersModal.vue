<template>
    <v-dialog
        :value="value"
        max-width="600px"
        @click:outside="$emit('input', false)"
        @keydown.esc="$emit('input', false)"
    >
        <v-card class="pa-2">
            <v-card-title class="text-h5 wallets-members-title">
                <h4>
                    <span> Members Inside Wallet </span>
                </h4>
                <v-btn icon @click="$emit('input', false)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <!-- wallet Add Form -->
                <v-container fluids>
                    <v-simple-table v-if="members.length > 0">
                        <template #default>
                            <thead>
                                <tr>
                                    <th class="text-left">Name</th>
                                    <th class="text-right">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="loading">
                                    <td colspan="6">Loading...</td>
                                </tr>
                                <tr
                                    v-for="(member, midx) in members"
                                    :key="midx"
                                >
                                    <td>
                                        {{ member.name }}
                                    </td>
                                    <td class="text-right">
                                        <v-tooltip v-if="wallet.owner_id == $store.getters['login/userId'] && member.id != $store.getters['login/userId']" top>
                                            <template
                                                #activator="{ on, attrs }"
                                            >
                                                <v-btn
                                                    elevation="0"
                                                    small
                                                    color="error"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    @click="
                                                        removeMember(member.id)
                                                    "
                                                >
                                                    <i
                                                        class="fa-solid fa-trash"
                                                    ></i>
                                                </v-btn>
                                            </template>
                                            <span>Delete</span>
                                        </v-tooltip>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                    <span v-else-if="!loading" class="text-center">
                        No members in wallet
                    </span>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-row>
                    <v-col cols="12" align="right">
                        <v-btn
                            text
                            color="black"
                            @click.stop="$emit('input', false)"
                            >Close</v-btn
                        >
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
        walletId: String,
        wallet: Object,
    },
    data() {
        return {
            members: [],
            loading: false,
            currentPage: 1,
            pages: 1,
        };
    },
    watch: {
        value(val) {
            if (val) {
                this.listMembers(this.walletId);
            } else {
                this.members = [];
            }
        },
    },
    methods: {
        listMembers(walletId) {
            this.loading = true;
            this.$axios
                .$get(`wallet/${walletId}/users?page=${this.currentPage}`)
                .then((res) => {
                    this.pages = res.pages;
                    this.members = res.users;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        removeMember(id) {
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
                      this.$axios.delete(`/wallet/${this.wallet.id}/users/${id}`).then(() => {
                        Swal.fire({
                          title: "Removed!",
                          text: "The member has been removed.",
                          icon: "info",
                          showConfirmButton: false,
                          toast: true,
                          position: "top-end",
                          timer: 3000,
                          timerProgressBar: true,
                        });
                        this.listMembers(this.walletId);
                      });
                }
            });
        },
    },
};
</script>

<style>
.wallets-members-title h4 {
    width: calc(100% - 37px);
    text-align: left;
    line-height: 0.1em;
    margin: 20px 0 20px;
}
</style>
