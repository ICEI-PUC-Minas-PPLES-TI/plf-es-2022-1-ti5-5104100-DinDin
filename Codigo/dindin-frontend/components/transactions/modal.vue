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
                                mandatory
                            >
                                <v-radio label="Income" value="IN"> </v-radio>
                                <v-radio label="Outcome" value="OUT"> </v-radio>
                            </v-radio-group>
                            <!--active-class="v-icon notranslate mdi mdi-checkbox-marked theme--light primary--text" -->
                        </v-row>

                        <v-row class="pb-2">
                            <v-text-field
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
                            <v-select
                                :rules="[rules.required]"
                                v-model="transaction.wallet_id"
                                prepend-inner-icon="mdi-wallet"
                                outlined
                                hide-details="auto"
                                :items="[
                                    { text: 'Personal', value: 1 },
                                    { text: 'Public', value: 2 },
                                ]"
                                label="Wallet"
                            />
                        </v-row>
                        <v-row class="pb-2">
                            <v-select
                                v-model="transaction.walletId"
                                prepend-inner-icon="mdi-tag"
                                outlined
                                hide-details="auto"
                                :items="[
                                    { text: 'Personal', value: 1 },
                                    { text: 'Public', value: 2 },
                                ]"
                                label="Category"
                            />
                        </v-row>
                        <v-row>
                            <v-checkbox
                                label="Recurrent"
                                v-model="transaction.recurrent"
                            >
                            </v-checkbox>
                        </v-row>

                        <v-row class="mb-0 pb-2" v-show="transaction.recurrent">
                            <v-col cols="12" class="pl-0 py-2">
                                <v-btn-toggle
                                    v-model="transaction.recurrentType"
                                    outlined
                                    mandatory
                                >
                                    <v-btn value="D"> Daylly </v-btn>
                                    <v-btn value="M"> Monthly </v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>

                        <v-row class="pb-2" v-show="transaction.recurrent">
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
                                        v-model="transaction.endDate"
                                        v-bind="attrs"
                                        v-on="on"
                                        label="End Date"
                                        :hint="hintWarningDate"
                                        persistent-hint
                                    />
                                </template>
                                <v-date-picker
                                    v-model="transaction.endDate"
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
                    <v-col v-if="transactionId" class="mr-2">
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
        transactionId: Number,
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
                recurrentType: "",
                category_id: "",
                wallet_id: "",
                recurrent: false,
            },
            hintWarningDate: "",
            today: "",
            date: "",
            menu: false,
            menu2: false,
            rules: {
                required: (value) => !!value || "Required.",
                // wrongDate: (value) =>
                //   this.compareDates(value, this.today) || "Date expired.",
            },
            errors: [],
        };
    },
    watch: {
        transactionId(val) {
            if (val) {
                //load transaction
            } else {
                this.cleanForm();
                //this.setCurrentDate();
            }
        },
        "transaction.endDate"(val) {
            if (this.transaction.recurrentType == "M") {
                if (val && val.length >= 10 && val.split("-")[2] >= 28) {
                    this.hintWarningDate =
                        "Warning, because your transaction has a monthly recurrence day above the 28th, it will not occur in some months of the year.";
                } else {
                    this.hintWarningDate = "";
                }
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
        // setCurrentDate() {
        //     console.log("oi");
        //     this.transaction.date = new Date().toLocaleDateString();
        // },
        saveTransaction() {
            this.errors = [];
            if (this.$refs.form.validate()) {
                this.$axios
                    .post("/transaction", this.transaction)
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
            if (this.$refs.form.validate()) {
                this.$axios
                    .put(
                        "/transaction/" + this.transaction.id,
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
            //this.$refs.form.reset();
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
