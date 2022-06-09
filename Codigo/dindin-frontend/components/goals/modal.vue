<template>
    <v-dialog
        v-model="show"
        max-width="600px"
        @click:outside="$emit('input', false)"
        @keydown.esc="$emit('input', false)"
    >
        <v-card v-if="this.wallets.length > 0" class="pa-2">
            <v-card-title class="text-h5 goals-modal-title">
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
                <!-- Goal Add Form -->
                <v-container fluids>
                    <v-form
                        ref="form"
                        v-on:submit.prevent="saveGoal"
                        lazy-validation
                    >
                        <v-row class="pb-2">
                            <v-text-field
                                :rules="[rules.required]"
                                prepend-inner-icon="mdi-tag"
                                outlined
                                v-model="goal.description"
                                hide-details="auto"
                                :clearable="true"
                                label="Description"
                                maxlength="40"
                            />
                        </v-row>
                        <v-row class="pb-2">
                            <v-text-field
                                :rules="[rules.required, rules.higherThanZero]"
                                v-model="goal.value"
                                prepend-inner-icon="mdi-currency-usd"
                                outlined
                                type="number"
                                hide-details="auto"
                                :clearable="true"
                                label="Target value"
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
                                        :rules="[
                                            rules.required,
                                            rules.wrongDate,
                                        ]"
                                        prepend-inner-icon="mdi-calendar-range"
                                        outlined
                                        hide-details="auto"
                                        type="text"
                                        :value="date"
                                        v-bind="attrs"
                                        v-on="on"
                                        label="Expire at"
                                    />
                                </template>
                                <v-date-picker
                                    v-model="goal.expire_at"
                                    @click.native="parseDate(goal.expire_at)"
                                    @input="menu = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-row>
                        <v-row class="mb-0 pb-2">
                            <v-select
                                :rules="[rules.required]"
                                prepend-inner-icon="mdi-bullseye"
                                v-model="goal.type"
                                hide-details="auto"
                                outlined
                                :items="[
                                    { text: 'Saving', value: 'B' },
                                    { text: 'Achievement', value: 'A' },
                                ]"
                                label="Goal Type"
                            />
                        </v-row>
                        <v-row v-if="goalToEdit == null" class="mt-0 pt-0">
                            <v-select
                                :rules="[rules.required]"
                                v-model="goal.wallet_id"
                                name="wallets"
                                prepend-inner-icon="mdi-wallet"
                                outlined
                                hide-details="auto"
                                :items="wallets"
                                item-text="description"
                                item-value="id"
                                label="Wallet"
                            />
                        </v-row>
                        <v-row v-else class="mt-0 pt-0">
                            <v-select
                                :rules="[rules.required]"
                                v-model="goal.wallet_id"
                                name="wallets"
                                prepend-inner-icon="mdi-wallet"
                                outlined
                                disabled
                                hide-details="auto"
                                :items="wallets"
                                item-text="description"
                                item-value="id"
                                label="Wallet"
                            />
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
                    <v-col v-if="goalToEdit != null" class="mr-2">
                        <v-btn block color="primary" @click.stop="editGoal()"
                            >Edit</v-btn
                        >
                    </v-col>
                    <v-col v-else class="mr-2">
                        <v-btn block color="primary" @click.stop="saveGoal()"
                            >Save</v-btn
                        >
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
        <v-card v-else class="pa-2">
            <v-card-title class="text-h5 goals-modal-title">
                <h4>
                    You must create a wallet first!
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
                    <v-col>
                        <v-btn block color="primary" to="/wallets"
                            >Create Wallet</v-btn
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
        goalToEdit: Object,
        modalEdit: Boolean,
    },
    data() {
        return {
            title: "New Goal",
            goal: {
                description: "",
                expire_at: "",
                value: "",
                type: "",
                wallet_id: "",
                status: "PENDING",
            },
            wallets: [],
            choosenGoal: "",
            today: "",
            date: "",
            menu: false,
            rules: {
                required: (value) => !!value || "Required.",
                wrongDate: (value) =>
                    this.compareDates(value, this.today) || "Date expired.",
                higherThanZero: (value) => {
                    if (value <= 0) {
                        return "Target value must be higer than 0";
                    }
                },
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
                this.title = "Edit Goal";
            } else {
                this.choosenGoal = null;
                let emptyGoal = {
                    description: "",
                    expire_at: this.goal.expire_at,
                    value: "",
                    type: "",
                    wallet_id: "",
                    status: "PENDING",
                };
                this.fillForm(emptyGoal);
                this.cleanForm();
                this.title = "New Goal";
            }
        },
        goalToEdit: function (goalToEdit) {
            if (goalToEdit) {
                this.choosenGoal = goalToEdit;
                this.fillForm(this.choosenGoal);
            }
        },
    },
    methods: {
        saveGoal() {
            this.errors = [];
            this.goal.value = parseFloat(this.goal.value);
            this.goal.wallet_id = parseFloat(this.goal.wallet_id);
            if (this.$refs.form.validate()) {
                this.$axios
                    .post("/goal", this.goal)
                    .then(() => {
                        Swal.fire({
                            title: "Goal Created",
                            icon: "success",
                            showConfirmButton: false,
                            toast: true,
                            position: "top-end",
                            timer: 3000,
                            timerProgressBar: true,
                        });
                        this.$refs.form.reset();
                        this.$emit("input", false);
                        this.$emit("created", this.goal);
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
        editGoal() {
            this.errors = [];
            if (this.$refs.form.validate()) {
                this.$axios
                    .put("/goal/" + this.goal.id, this.goal)
                    .then(() => {
                        Swal.fire({
                            title: "Goal Edited",
                            icon: "success",
                            showConfirmButton: false,
                            toast: true,
                            position: "top-end",
                            timer: 3000,
                            timerProgressBar: true,
                        });
                        this.$refs.form.reset();
                        this.$emit("input", false);
                        this.$emit("created", this.goal);
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
        parseDate(date) {
            if (!date) return null;
            const [year, month, day] = date.split("-");
            this.date = `${day}/${month}/${year}`;
        },
        shortDate(date) {
            if (!date) {
                return null;
            }
            let parse = date.substring(0, 10);
            const [year, month, day] = parse.split("-");
            return `${day}/${month}/${year}`;
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
            if (parseInt(date1Split[1]) > parseInt(date2Split[1])) {
                return true;
            }
            if (parseInt(date1Split[0]) >= parseInt(date2Split[0])) {
                return true;
            }
            return resp;
        },
        fillForm(data) {
            this.goal.id = data.id;
            this.goal.description = data.description;
            this.goal.value = data.value;
            this.date = this.shortDate(data.expire_at);
            this.goal.expire_at = data.expire_at.substring(0, 10);
            this.goal.type = data.type;
            this.goal.wallet_id = data.wallet_id;
        },
        cleanForm() {
            this.$refs.form.reset();
        },
        async getWallets() {
            await this.$axios.$get(`/wallet`).then((res) => {
                this.wallets = res.wallets;
            });
        },
    },
    mounted() {
        let dateToday = new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
        )
            .toISOString()
            .substr(0, 10);
        const [year, month, day] = dateToday.split("-");
        this.today = `${day}/${month}/${year}`;
        this.getWallets();
    },
};
</script>

<style>
.goals-modal-title h4 {
    width: calc(100% - 37px);
    text-align: left;
    margin: 20px 0 20px;
}
</style>
