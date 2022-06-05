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
                    <v-row class="pr-6">
                        <v-col cols="7" sm="0"> </v-col>
                        <v-col>
                            <v-btn
                                block
                                color="white"
                                @click.stop="acceptInivte()"
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
                            <v-simple-table v-if="wallets.length > 0">
                                <template #default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">Name</th>
                                            <th class="text-left">
                                                Starter Amount
                                            </th>
                                            <th class="text-left">
                                                Current Amount
                                            </th>
                                            <th class="text-left">Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="loading">
                                            <td colspan="6">Loading...</td>
                                        </tr>
                                        <tr
                                            v-for="(wallet, gidx) in wallets"
                                            :key="gidx"
                                        >
                                            <td>
                                                {{ wallet.description }}
                                                <span
                                                    v-if="wallet.shared"
                                                    class="shared-wallet"
                                                    >(shared)</span
                                                >
                                            </td>
                                            <td>
                                                R${{
                                                    parseFloat(
                                                        wallet.initial_value
                                                    )
                                                        .toFixed(2)
                                                        .toString()
                                                        .replace(".", ",")
                                                }}
                                            </td>
                                            <td
                                                v-if="
                                                    parseFloat(
                                                        wallet.currentAmount
                                                    ) >= 0
                                                "
                                            >
                                                R${{
                                                    parseFloat(
                                                        wallet.currentAmount
                                                    )
                                                        .toFixed(2)
                                                        .toString()
                                                        .replace(".", ",")
                                                }}
                                            </td>
                                            <td v-else>
                                                -R${{
                                                    (
                                                        parseFloat(
                                                            wallet.currentAmount
                                                        ) * -1
                                                    )
                                                        .toFixed(2)
                                                        .toString()
                                                        .replace(".", ",")
                                                }}
                                            </td>
                                            <td style="width: 200px">
                                                <v-tooltip top>
                                                    <template
                                                        #activator="{
                                                            on,
                                                            attrs,
                                                        }"
                                                    >
                                                        <v-btn
                                                            elevation="0"
                                                            small
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            @click="
                                                                inviteFiend(
                                                                    wallet.id
                                                                )
                                                            "
                                                        >
                                                            <i
                                                                class="fa-solid fa-share"
                                                            ></i>
                                                        </v-btn>
                                                    </template>
                                                    <span class="caption"
                                                        >Shared</span
                                                    >
                                                </v-tooltip>
                                                <v-tooltip
                                                    v-if="wallet.shared"
                                                    top
                                                >
                                                    <template
                                                        #activator="{
                                                            on,
                                                            attrs,
                                                        }"
                                                    >
                                                        <v-btn
                                                            elevation="0"
                                                            small
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            @click="
                                                                openMembersModal(
                                                                    wallet
                                                                )
                                                            "
                                                        >
                                                            <i
                                                                class="fa-solid fa-users"
                                                            ></i>
                                                        </v-btn>
                                                    </template>
                                                    <span>Members</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template
                                                        #activator="{
                                                            on,
                                                            attrs,
                                                        }"
                                                    >
                                                        <v-btn
                                                            elevation="0"
                                                            small
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            @click="
                                                                editWallet(
                                                                    wallet
                                                                )
                                                            "
                                                        >
                                                            <i
                                                                class="fa-solid fa-pen-to-square"
                                                            ></i>
                                                        </v-btn>
                                                    </template>
                                                    <span>Edit</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template
                                                        #activator="{
                                                            on,
                                                            attrs,
                                                        }"
                                                    >
                                                        <v-btn
                                                            elevation="0"
                                                            small
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            @click="
                                                                redirecToCategories(
                                                                    wallet
                                                                )
                                                            "
                                                        >
                                                            <i
                                                                class="fa-solid fa-align-justify"
                                                            ></i>
                                                        </v-btn>
                                                    </template>
                                                    <span>Categories</span>
                                                </v-tooltip>
                                                <v-tooltip top>
                                                    <template
                                                        #activator="{
                                                            on,
                                                            attrs,
                                                        }"
                                                    >
                                                        <v-btn
                                                            elevation="0"
                                                            small
                                                            color="error"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            @click="
                                                                removeWallet(
                                                                    wallet
                                                                )
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
                                No wallets created
                            </span>
                        </v-col>
                    </v-row>
                    <!-- Pagination -->
                    <v-row>
                        <v-col>
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
            v-model="showModal"
            :wallet-to-edit="walletToEdit"
            :modal-edit="modalEdit"
            @created="$fetch"
        />
        <membersModal
            v-model="showMembersModal"
            :wallet-id="walletToShowMembersId"
            :wallet="walletToShowMembers"
        />
    </v-container>
</template>

<script>
import modal from "@/components/wallet/modal.vue";
import membersModal from "@/components/wallet/membersModal.vue";
import Swal from "sweetalert2";
export default {
    components: {
        modal,
        membersModal,
    },
    layout: "home",
    data() {
        return {
            currentPage: 1,
            pages: 1,
            wallets: [],
            loading: false,
            showModal: false,
            walletToEdit: null,
            modalEdit: false,
            showMembersModal: false,
            walletToShowMembersId: "",
        };
    },
    async fetch() {
        this.loading = true;
        await this.$axios
            .$get(`/wallet?page=${this.currentPage}`)
            .then((res) => {
                this.pages = res.pages;
                this.wallets = res.wallets;
            })
            .finally(() => {
                this.loading = false;
            });
        this.getCurrentMonthAmount();
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
                    this.$axios
                        .delete("/wallet/" + wallet.id)
                        .then(() => {
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
                            this.$fetch();
                        })
                        .catch((err) => {
                            Swal.fire({
                                title: "Wallet removal failed!",
                                text: err.response.data.message,
                                icon: "error",
                            });
                        });
                }
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
                preConfirm: (code) => {
                    this.$axios
                        .$post("/wallet/invite", {
                            code,
                        })
                        .then((/*res*/) => {
                            Swal.fire({
                                title: "Wallet Joined",
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
                                title: "Wallet join failed!",
                                text: err.response.data.message,
                                icon: "error",
                            });
                        });
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
            }).then((/*result*/) => {
                // if (result.isConfirmed) {
                // }
            });
        },
        inviteFiend(walletId) {
            this.$axios
                .$post(`/wallet/${walletId}/invite`)
                .then((res) => {
                    Swal.fire({
                        title: "<strong>New wallet invite</strong>",
                        icon: "info",
                        html: `${
                            res.invite.code
                        } <br> <small> Expires at ${new Date(
                            res.invite.expire_at
                        ).toLocaleDateString()} </small>`,
                        focusConfirm: false,
                        confirmButtonColor: "#5BD098",
                        confirmButtonText: "Copy to clipboard",
                    }).then((result) => {
                        if (result.isConfirmed)
                            navigator.clipboard.writeText(res.invite.code);
                    });
                })
                .catch((err) => {
                    Swal.fire({
                        title: "Invite creation failed!",
                        text: err.response.data.message,
                        icon: "error",
                    });
                });
        },
        editWallet(wallet) {
            this.walletToEdit = wallet;
            this.modalEdit = true;
            this.showModal = true;
        },
        openMembersModal(wallet) {
            this.showMembersModal = true;
            this.walletToShowMembersId = wallet.id;
            this.walletToShowMembers = wallet;
        },
        redirecToCategories(wallet) {
            this.$router.push(`wallets/${wallet.id}/categories`);
        },
        async getCurrentMonthAmount() {
            for (let i = 0; i < this.wallets.length; i++) {
                this.loading = true;
                await this.$axios
                    .$get(`/report/balance?wallet_id=${this.wallets[i].id}`)
                    .then((res) => {
                        this.wallets[i].currentAmount =
                            res.incoming - res.outcoming;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
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
    font-size: 0.6rem;
}
</style>
