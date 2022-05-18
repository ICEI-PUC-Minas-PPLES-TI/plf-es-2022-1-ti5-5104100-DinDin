<template>
    <v-dialog
        v-model="show"
        max-width="600px"
        @click:outside="$emit('input', false)"
        @keydown.esc="$emit('input', false)"
    >
        <v-card class="pa-2">
            <v-card-title class="text-h5 transactions-modal-title">
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
                <!-- Transaction Form -->
                <v-container fluids>
                    <v-form
                        ref="form"
                        v-on:submit.prevent="saveTransaction"
                        lazy-validation
                    >
                        <v-row>
                            <v-radio-group
                                row
                                v-model="transaction.type"
                                @change="
                                    searchCategoryTxt = '';
                                    transaction.category_id = null;
                                "
                                mandatory
                            >
                                <v-radio label="Income" value="IN"> </v-radio>
                                <v-radio label="Outcome" value="OUT"> </v-radio>
                            </v-radio-group>
                            <!--active-class="v-icon notranslate mdi mdi-checkbox-marked theme--light primary--text" -->
                        </v-row>

                        <v-row class="pb-2">
                            <v-text-field
                                label="Value"
                                :rules="[rules.required]"
                                v-model="transaction.value"
                                prepend-inner-icon="mdi-currency-usd"
                                outlined
                                type="number"
                                hide-details="auto"
                                :clearable="true"
                                placeholder="0,00"
                                maxlength="40"
                            />
                        </v-row>
                        <v-row class="pb-2">
                            <v-text-field
                                :rules="[rules.required]"
                                prepend-inner-icon="mdi-tag"
                                outlined
                                v-model="transaction.description"
                                hide-details="auto"
                                :clearable="true"
                                label="Description"
                                maxlength="40"
                            />
                        </v-row>
                        <v-row class="pb-2">
                            <v-menu
                                v-model="menu"
                                :close-on-content-click="true"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        :rules="[rules.required]"
                                        prepend-inner-icon="mdi-calendar-range"
                                        outlined
                                        hide-details="auto"
                                        type="date"
                                        v-model="transaction.date"
                                        v-bind="attrs"
                                        v-on="on"
                                        label="Date"
                                    />
                                </template>
                                <v-date-picker
                                    v-model="transaction.date"
                                    @input="menu = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-row>
                        <v-row class="pb-2">
                            <v-autocomplete
                                :rules="[rules.required]"
                                :disabled="transactionToEdit != null"
                                prepend-inner-icon="mdi-wallet"
                                outlined
                                hide-details="auto"
                                v-model="transaction.wallet_id"
                                :items="wallets"
                                :search-input="searchWalletTxt"
                                @update:search-input="searchWallet"
                                @focus="listWallets(null)"
                                item-text="description"
                                item-value="id"
                                label="Wallet"
                            ></v-autocomplete>
                        </v-row>
                        <v-row class="pb-2">
                            <v-autocomplete
                                prepend-inner-icon="mdi-tag"
                                outlined
                                hide-details="auto"
                                :disabled="!transaction.wallet_id"
                                clearable
                                @click:clear="transaction.category_id = 0"
                                v-model="transaction.category_id"
                                :items="categories"
                                :search-input="searchCategoryTxt"
                                @update:search-input="searchCategory"
                                @focus="listCategories(null)"
                                item-text="description"
                                item-value="id"
                                label="Category"
                            ></v-autocomplete>
                        </v-row>

                        <v-row
                            v-show="
                                transactionToEdit != null &&
                                transaction.recurrent == true
                            "
                        >
                            <v-btn
                                text
                                color="primary"
                                @click="openModalTransactionRecurrencie()"
                            >
                                See origin transaction
                            </v-btn>
                        </v-row>
                        <v-row v-if="transactionToEdit == null">
                            <v-checkbox
                                label="Recurrent"
                                v-model="transaction.recurrent"
                            >
                            </v-checkbox>
                        </v-row>

                        <v-row
                            class="mb-0 pb-2"
                            v-show="
                                transaction.recurrent &&
                                transactionToEdit == null
                            "
                        >
                            <v-col cols="12" class="pl-0 py-2">
                                <v-btn-toggle
                                    v-model="transaction.interval"
                                    outlined
                                    mandatory
                                >
                                    <v-btn value="D"> Daylly </v-btn>
                                    <v-btn value="M"> Monthly </v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>

                        <v-row
                            v-show="
                                transaction.recurrent &&
                                transaction.interval == 'M' &&
                                transactionToEdit == null
                            "
                            class="pb-2"
                        >
                            <v-text-field
                                label="Day"
                                :rules="[
                                    (value) =>
                                        value <= 31 ||
                                        `Day canno't be more than 31`,
                                ]"
                                v-model="transaction.day"
                                prepend-inner-icon="mdi-calendar-today"
                                outlined
                                type="number"
                                hide-details="auto"
                                :hint="hintWarningDate"
                                :clearable="true"
                                placeholder="1"
                                min="1"
                                max="31"
                            />
                        </v-row>

                        <v-row
                            class="pb-2"
                            v-show="
                                transaction.recurrent &&
                                transactionToEdit == null
                            "
                        >
                            <v-menu
                                v-model="menu2"
                                :close-on-content-click="true"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        prepend-inner-icon="mdi-calendar-range"
                                        outlined
                                        hide-details="auto"
                                        type="date"
                                        v-model="transaction.expired_at"
                                        v-bind="attrs"
                                        v-on="on"
                                        label="End Date"
                                        persistent-hint
                                    />
                                </template>
                                <v-date-picker
                                    v-model="transaction.expired_at"
                                    @input="menu2 = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-row>
                    <v-col cols="4" align="center">
                        <v-btn
                            text
                            color="black"
                            @click.stop="$emit('input', false)"
                            >Cancel</v-btn
                        >
                    </v-col>
                    <v-col v-if="transaction.id" class="mr-2">
                        <v-btn
                            block
                            color="primary"
                            @click.stop="editTransaction()"
                            >Edit</v-btn
                        >
                    </v-col>
                    <v-col v-else class="mr-2">
                        <v-btn
                            block
                            color="primary"
                            @click.stop="saveTransaction()"
                            >Save</v-btn
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
        modalEdit: Boolean,
        transactionToEdit: Object,
    },
    data() {
        return {
            title: "New Transaction",
            transaction: {
                id: "",
                value: "",
                description: "",
                date: "",
                type: "",
                category_id: null,
                wallet_id: "",
                recurrent: false,
                interval: "",
                day: null,
                expired_at: null,
            },
            // transactionRecurrency: {
            //     category_id: "",
            //     day: "",
            //     description: "",
            //     expired_at: null,
            //     id: "",
            //     interval: "",
            //     updated_at: "",
            //     user_id: "",
            //     value: "",
            //     wallet_id: "",
            // },
            hintWarningDate: "",
            today: "",
            menu: false,
            menu2: false,
            rules: {
                required: (value) => !!value || "Required.",
                // wrongDate: (value) =>
                //   this.compareDates(value, this.today) || "Date expired.",
            },

            searchWalletTxt: "",
            wallets: [],
            searchCategoryTxt: "",
            categories: [],
            errors: [],
        };
    },
    watch: {
        transactionToEdit(val) {
            if (val) {
                this.title = "Edit transaction";
                let tForm = this.transaction;

                tForm.id = val.id;
                tForm.value = val.value;
                tForm.description = val.description;
                tForm.date = new Date(val.date).toISOString().split("T")[0];
                this.wallets.push(val.wallet);
                tForm.wallet_id = val.wallet_id;

                if (val.category != null) {
                    this.categories.push(val.category);
                    tForm.category_id = val.category.id;
                    tForm.type = val.category.type;
                } else {
                    this.categories = [];
                    tForm.category_id = null;
                    tForm.type = "IN";
                }
                if (val.transaction_recurrencies) {
                    //this.transactionRecurrency = val.transaction_recurrencies;
                    tForm.recurrent = true;
                    tForm.day = val.transaction_recurrencies.day;
                    tForm.interval = val.transaction_recurrencies.interval;
                } else {
                    tForm.recurrent = false;
                    tForm.day = null;
                    tForm.interval = "D";
                }
            } else {
                this.title = "New Transaction";
                this.cleanForm();
                //this.setCurrentDate();
            }
        },
        "transaction.day"(val) {
            if (val && val > 28) {
                this.hintWarningDate =
                    "Warning, because your transaction has a monthly recurrence day above the 28th, it will not occur in some months of the year.";
            } else {
                this.hintWarningDate = "";
            }
        },
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
    methods: {
        setCurrentDate() {
            this.transaction.date = new Date().toLocaleDateString();
        },
        cleanCategory() {
            if (this.transaction.category_id) {
                this.transaction.category_id = null;
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
            if (!this.transaction.wallet_id || !this.transaction.type) {
                return;
            }
            let filter = `?type=${this.transaction.type}`;
            let walletId = this.transaction.wallet_id;
            if (search) {
                filter += `&description=${search}`;
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
        saveTransaction() {
            this.errors = [];
            let endPoint = `wallet/${this.transaction.wallet_id}/`;
            if (this.transaction.recurrent == false) {
                endPoint += "transaction";
            } else {
                endPoint += "transactionrecurrencies";
                this.transaction.day = parseInt(
                    new Date(this.transaction.expired_at)
                        .toLocaleDateString()
                        .split("/")[0]
                );
            }

            if (this.transaction.type == "OUT") {
                if (this.transaction.value > 0) {
                    this.transaction.value *= -1;
                }
            }
            if (this.$refs.form.validate()) {
                this.$axios
                    .post(endPoint, this.transaction)
                    .then(() => {
                        Swal.fire({
                            title: "Transaction Created",
                            icon: "success",
                            showConfirmButton: false,
                            toast: true,
                            position: "top-end",
                            timer: 3000,
                            timerProgressBar: true,
                        });
                        this.$refs.form.reset();
                        this.$emit("input", false);
                        this.$emit("created", this.transaction);
                    })
                    .catch((err) => {
                        this.erroLogin = err.response.data.message;
                        if (err.response.status == 500) {
                            this.erroLogin = "Erro interno do servidor";
                        }
                    });
            } else {
                this.errors = ["Fields have invalid input"];
            }
        },
        editTransaction() {
            this.errors = [];
            let walletId = this.transaction.wallet_id;

            if (this.transaction.type == "OUT") {
                if (this.transaction.value > 0) {
                    this.transaction.value *= -1;
                }
            }

            if (this.$refs.form.validate()) {
                this.$axios
                    .put(
                        `wallet/${walletId}/transaction/${this.transaction.id}`,
                        this.transaction
                    )
                    .then(() => {
                        Swal.fire({
                            title: "Transaction Edited",
                            icon: "success",
                            showConfirmButton: false,
                            toast: true,
                            position: "top-end",
                            timer: 3000,
                            timerProgressBar: true,
                        });
                        this.$refs.form.reset();
                        this.$emit("input", false);
                        this.$emit("created", this.transaction);
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: "Error!",
                            html: err.response.data.message,
                            icon: "error",
                        });
                    });
            } else {
                this.errors = ["Fields have invalid input"];
            }
        },
        compareDates(date1, date2) {
            if (date1 == null || date2 == null) {
                return false;
            }
            let date1Split = date1.split("/");
            let date2Split = date2.split("/");
            let resp = false;
            if (parseInt(date1Split[2]) > parseInt(date2Split[2])) {
                return true;
            }
            if (parseInt(date1Split[2]) == parseInt(date2Split[2])) {
                if (parseInt(date1Split[1]) >= parseInt(date2Split[1])) {
                    if (parseInt(date1Split[0]) >= parseInt(date2Split[0])) {
                        resp = true;
                    }
                }
            }
            return resp;
        },
        cleanForm() {
            this.$refs.form.reset();
            this.transaction = {
                id: "",
                value: "",
                description: "",
                date: "",
                type: "IN",
                category_id: null,
                wallet_id: "",
                recurrent: false,
                interval: "",
                day: null,
                expired_at: null,
            };
        },

        openModalTransactionRecurrencie() {
            this.$emit("showTransactionRecurrencie");
        },
    },
};
</script>

<style>
.transactions-modal-title h4 {
    width: calc(100% - 37px);
    text-align: left;
    line-height: 0.1em;
    margin: 20px 0 20px;
}
</style>
