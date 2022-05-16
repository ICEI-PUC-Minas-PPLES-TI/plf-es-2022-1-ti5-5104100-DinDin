<template>
    <v-container fluid>
        <!-- Page Title -->
        <v-row>
            <v-col>
                <h2 class="page-title">Transactions</h2>
            </v-col>
        </v-row>
        <!-- Balance Selection -->
        <v-row>
            <v-col>
                <v-card elevation="0" class="p-20">
                    <div class="text-center"><h3>Your Balance</h3></div>
                    <div class="text-center">
                        <h1><b> R$ 25.000,00 </b></h1>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <!-- Table Section -->
        <v-row>
            <v-col>
                <v-card elevation="0" class="p-20">
                    <!-- Table top toolbar -->
                    <v-row justify="center">
                        <v-col cols="9" md="4" sm="12" lg="2">
                            <v-autocomplete
                                prepend-inner-icon="mdi-wallet"
                                outlined
                                hide-details="auto"
                                v-model="filters.wallet_id"
                                @change="cleanCategory && $fetch()"
                                :items="wallets"
                                :search-input="searchWalletTxt"
                                @update:search-input="searchWallet"
                                @focus="listWallets(null)"
                                item-text="description"
                                item-value="id"
                                label="Wallet"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="9" md="4" sm="12" lg="2">
                            <v-autocomplete
                                prepend-inner-icon="mdi-tag"
                                outlined
                                hide-details="auto"
                                :disabled="!filters.wallet_id"
                                v-model="filters.category_id"
                                @change="$fetch()"
                                :items="categories"
                                :search-input="searchCategoryTxt"
                                @update:search-input="searchCategory"
                                @focus="listCategories(null)"
                                item-text="description"
                                item-value="id"
                                label="Category"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="9" md="4" sm="12" lg="2">
                            <v-menu
                                v-model="menuData1"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                class="modal-input-date"
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="filters.dateFrom"
                                        outlined
                                        hide-details="auto"
                                        label="From"
                                        type="date"
                                        min="2017-06-01"
                                        max="2050-06-30"
                                        class="modal-input-date"
                                    >
                                        <span slot="append">
                                            <v-icon v-bind="attrs" v-on="on">
                                                mdi-calendar
                                            </v-icon>
                                        </span>
                                    </v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="filters.dateFrom"
                                    @input="menuData1 = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="9" md="4" sm="12" lg="2">
                            <v-menu
                                v-model="menuData2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                class="modal-input-date"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="filters.dateTo"
                                        outlined
                                        hide-details="auto"
                                        label="To"
                                        type="date"
                                        min="2017-06-01"
                                        max="2050-06-30"
                                        class="modal-input-date"
                                    >
                                        <span slot="append">
                                            <v-icon v-bind="attrs" v-on="on">
                                                mdi-calendar
                                            </v-icon>
                                        </span>
                                    </v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="filters.dateTo"
                                    @input="menuData2 = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col
                            cols="9"
                            md="2"
                            sm="12"
                            lg="2"
                            offset-lg="1"
                            offset-md="4"
                        >
                            <v-btn
                                block
                                color="success"
                                @click.stop="
                                    transactionToEdit = null;
                                    showModal = true;
                                "
                            >
                                New Transaction
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
                                            <th class="text-left">Date</th>
                                            <th class="text-left">value</th>
                                            <th class="text-left">Category</th>
                                            <th class="text-left">Wallet</th>
                                            <th class="text-right">Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="loading">
                                            <td colspan="6">Loading...</td>
                                        </tr>
                                        <tr
                                            v-for="(
                                                transaction, idx
                                            ) in transactions"
                                            :key="idx"
                                        >
                                            <td>
                                                <v-avatar
                                                    :color="
                                                        transaction.category
                                                            .type == 'IN'
                                                            ? 'primary'
                                                            : transaction
                                                                  .category
                                                                  .type == 'OUT'
                                                            ? 'error'
                                                            : 'warning'
                                                    "
                                                    size="30"
                                                >
                                                    <v-icon color="white">
                                                        mdi-{{
                                                            transaction.category
                                                                .type == "IN"
                                                                ? "arrow-up-thin"
                                                                : transaction
                                                                      .category
                                                                      .type ==
                                                                  "OUT"
                                                                ? "arrow-down"
                                                                : "help"
                                                        }}
                                                    </v-icon>
                                                </v-avatar>
                                                &nbsp;
                                                {{ transaction.description }}
                                            </td>
                                            <td>
                                                {{
                                                    new Date(
                                                        transaction.date
                                                    ).toLocaleDateString()
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    (transaction.category
                                                        .type == "IN"
                                                        ? "+"
                                                        : transaction.category
                                                              .type == "OUT"
                                                        ? "-"
                                                        : transaction.value > 0
                                                        ? "+"
                                                        : "-") +
                                                    "R$" +
                                                    transaction.value
                                                        .toString()
                                                        .replace(".", ",")
                                                        .replace("-", "")
                                                }}
                                            </td>
                                            <td>
                                                <div
                                                    :style="
                                                        swatchStyle(
                                                            '#' +
                                                                transaction
                                                                    .category
                                                                    .color
                                                        )
                                                    "
                                                />
                                                &nbsp;
                                                {{
                                                    transaction.category
                                                        .description
                                                }}
                                            </td>
                                            <td>
                                                {{
                                                    transaction.wallet
                                                        .description
                                                }}
                                            </td>
                                            <td class="text-right">
                                                <v-tooltip top>
                                                    <template
                                                        v-slot:activator="{
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
                                                                transactionToEdit =
                                                                    transaction;
                                                                showModal = true;
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
                                                        v-slot:activator="{
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
                                                                removeTransaction(
                                                                    transaction
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
            :transactionToEdit="transactionToEdit"
            v-model="showModal"
            @created="$fetch"
        />
    </v-container>
</template>

<script>
import Swal from "sweetalert2";
import modal from "@/components/transactions/modal.vue";
export default {
    layout: "home",
    components: {
        modal,
    },
    data() {
        return {
            currentPage: 1,
            pages: 1,
            transactions: [],
            searchWalletTxt: "",
            wallets: [],
            searchCategoryTxt: "",
            categories: [],

            menuData1: false,
            menuData2: false,
            loading: false,
            showModal: false,
            transactionToEdit: null,
            filters: {
                wallet_id: "",
                category_id: "",
                dateFrom: "",
                dateTo: "",
            },
        };
    },
    mounted() {
        this.$fetch();
    },
    async fetch() {
        this.loading = true;
        this.transactions = [];
        let filters = "";
        if (this.filters.wallet_id) {
            filters += `&wallet_id=${this.filters.wallet_id}`;
        }
        if (this.filters.category_id) {
            filters += `&category_id=${this.filters.category_id}`;
        }

        if (this.filters.dateFrom) {
            filters += `&date_start=${this.filters.dateFrom}`;
        }

        if (this.filters.dateTo) {
            filters += `&date_end=${this.filters.dateTo}`;
        }

        await this.$axios
            .$get(`/transaction?page=${this.currentPage + filters}`)
            .then((res) => {
                if (res.transactions) {
                    this.pages = res.pages;
                    res.transactions.forEach((e) => {
                        if (e.category == null) {
                            e.category = {
                                id: "",
                                description: "",
                                type: "",
                                color: "",
                                wallet_id: "",
                                user_id: "",
                            };
                        }
                        this.transactions.push(e);
                    });
                }
            })
            .finally(() => {
                this.loading = false;
            });
    },
    watch: {
        "filters.dateFrom"() {
            this.$fetch();
        },
        "filters.dateTo"() {
            this.$fetch();
        },
    },
    methods: {
        swatchStyle(color) {
            return {
                display: "inline-block",
                backgroundColor: color,
                marginBottom: "-7px",
                height: "25px",
                width: "25px",
                borderRadius: "10px",
            };
        },
        changePagination() {
            this.$fetch();
        },
        cleanCategory() {
            if (this.filters.category_id) {
                this.filters.category_id = null;
                this.categories = [];
                this.searchCategoryTxt = "";
            }
        },

        searchCategory(val) {
            if (val && val.length >= 2) {
                this.searchCategoryTxt = val;
                this.listCategories(val);
            } else this.listCategories(null);
        },
        async listCategories(search) {
            if (!this.filters.wallet_id) {
                return;
            }
            let filter = ``;
            let walletId = this.filters.wallet_id;
            if (search) {
                filter += `?description=${search}`;
            }

            await this.$axios
                .$get(`/wallet/${walletId}/category${filter}`)
                .then((res) => {
                    this.categories = res.categories;
                });
        },

        searchWallet(val) {
            if (val && val.length >= 2) {
                this.searchWalletTxt = val;
                this.listWallets(val);
            } else this.listWallets(null);
        },
        async listWallets(search) {
            let filter = "";
            if (search) {
                filter = `?description=${search}`;
            }
            await this.$axios.$get(`/wallet${filter}`).then((res) => {
                this.wallets = res.wallets;
            });
        },

        removeTransaction(transaction) {
            let walletId = transaction.wallet_id;
            let tId = transaction.id;

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
                        .delete(`wallet/${walletId}/transaction/${tId}`)
                        .then(() => {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The Transaction has been deleted.",
                                icon: "info",
                                showConfirmButton: false,
                                toast: true,
                                position: "top-end",
                                timer: 3000,
                                timerProgressBar: true,
                            });
                            this.$fetch();
                        });
                }
            });
        },
        openModal(transaction) {
            this.showModal = true;
            this.transactionToEdit = transaction;
        },
    },
};
</script>

<style>
input[type="date"]::-webkit-calendar-picker-indicator {
    display: none !important;
    -webkit-appearance: none !important;
}
input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
    display: none !important;
    -webkit-appearance: none !important;
}
</style>
