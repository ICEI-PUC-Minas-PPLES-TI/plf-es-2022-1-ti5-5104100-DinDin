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
                            <v-select
                                v-model="filters.wallet"
                                :items="listWalletsFilter"
                                label="Wallet"
                                item-value="id"
                                item-text="description"
                                outlined
                            ></v-select>
                        </v-col>
                        <v-col cols="9" md="4" sm="12" lg="2">
                            <v-select
                                v-model="filters.category"
                                :disabled="!filters.wallet"
                                :items="listCategoriesFilter"
                                label="Category"
                                item-value="id"
                                item-text="description"
                                outlined
                            ></v-select>
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
                                @click.stop="openModal(0)"
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
                                            <th class="text-left">Amount</th>
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
                                                            : 'error'
                                                    "
                                                    size="30"
                                                >
                                                    <v-icon color="white">
                                                        mdi-arrow-{{
                                                            transaction.category
                                                                .type == "IN"
                                                                ? "up"
                                                                : "down"
                                                        }}-thin
                                                    </v-icon>
                                                </v-avatar>
                                                &nbsp;
                                                {{ transaction.description }}
                                            </td>
                                            <td>
                                                {{ transaction.date }}
                                            </td>
                                            <td>
                                                {{ transaction.amount }}
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
                                                                    transaction.id
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
            :transactionId="transactionId"
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
            transactions: [
                {
                    id: "1",
                    description: "Be Biquinis",
                    date: "30/04/2022",
                    amount: "+R$1000",
                    category: {
                        id: "",
                        description: "Category X",
                        type: "IN",
                        color: "0079bf",
                        wallet_id: "",
                        user_id: "",
                    },
                    wallet: {
                        id: "",
                        description: "Wallet X",
                    },
                },
                {
                    id: "2",
                    description: "Uber Monthly",
                    date: "30/04/2022",
                    amount: "+R$2000",
                    category: {
                        id: "",
                        description: "Category Y",
                        type: "IN",
                        color: "344563",
                        wallet_id: "",
                        user_id: "",
                    },
                    wallet: {
                        id: "",
                        description: "Wallet Y",
                    },
                },
                {
                    id: "3",
                    description: "Verdemar",
                    date: "30/04/2022",
                    amount: "-R$2000",
                    category: {
                        id: "",
                        description: "Category Z",
                        type: "OUT",
                        color: "c377e0",
                        wallet_id: "",
                        user_id: "",
                    },
                    wallet: {
                        id: "",
                        description: "Wallet Z",
                    },
                },
            ],
            listWalletsFilter: [
                {
                    id: "1",
                    description: "Wallet X",
                },
                {
                    id: "2",
                    description: "Wallet Y",
                },
            ],
            listCategoriesFilter: [
                {
                    id: "1",
                    description: "Category X",
                },
                {
                    id: "2",
                    description: "Category Y",
                },
            ],
            menuData1: false,
            menuData2: false,
            loading: false,
            showModal: false,
            transactionId: "",
            filters: {
                wallet: "",
                category: "",
                dateFrom: "",
                dateTo: "",
            },
        };
    },
    async fetch() {
        // this.loading = true;
        // await this.$axios
        //   .$get(`/category?page=${this.currentPage}`)
        //   .then((res) => {
        //     this.pages = res.pages;
        //     this.transactions = res.transactions;
        //   })
        //   .finally(() => {
        //     this.loading = false;
        //   });
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
        // parseDate(date) {
        //   //console.log("oii");
        //   if (!date) return null;
        //   const [year, month, day] = date.split("-");
        //   this.transaction.date = `${day}/${month}/${year}`;
        // },
        removeTransaction(id) {
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
                    this.$axios.delete("/transaction/" + id).then(() => {
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
        openModal(id) {
            this.showModal = true;
            this.transactionId = id;
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
