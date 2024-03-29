<template>
    <v-container fluid>
        <!-- Page Title -->
        <v-row>
            <v-col>
                <h2 class="page-title">Goals</h2>
            </v-col>
        </v-row>
        <!-- Table Section -->
        <v-row>
            <v-col>
                <v-card elevation="0" class="p-20">
                    <!-- Table top toolbar -->
                    <v-row class="pr-6">
                        <v-col
                            cols="12"
                            md="2"
                            sm="2"
                            lg="2"
                            offset-lg="10"
                            offset-md="10"
                            offset-sm="10"
                        >
                            <v-btn
                                block
                                color="success"
                                @click.stop="
                                    showModal = true;
                                    modalEdit = false;
                                    goalToEdit = null;
                                "
                            >
                                New Goal
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
                                            <th class="text-left">Type</th>
                                            <th class="text-left">Amount</th>
                                            <th class="text-left">
                                                Date Limit
                                            </th>
                                            <th class="text-left">Status</th>
                                            <th class="text-left">Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="loading">
                                            <td colspan="6">Loading...</td>
                                        </tr>
                                        <tr
                                            v-for="(goal, gidx) in goals"
                                            :key="gidx"
                                        >
                                            <td>
                                                {{ goal.description }}
                                            </td>
                                            <td>
                                                {{
                                                    goal.type == "A"
                                                        ? "Achievement"
                                                        : "Saving"
                                                }}
                                            </td>
                                            <td>
                                                R${{
                                                    parseFloat(goal.value)
                                                        .toFixed(2)
                                                        .toString()
                                                        .replace(".", ",")
                                                }}
                                            </td>
                                            <td>
                                                {{ dateFormat(goal.expire_at) }}
                                            </td>
                                            <td class="table-goals-status">
                                                {{ goal.status }}
                                            </td>
                                            <td style="width: 200px">
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
                                                                viewGoal(goal)
                                                            "
                                                        >
                                                            <i
                                                                class="fa-solid fa-eye"
                                                            ></i>
                                                        </v-btn>
                                                    </template>
                                                    <span>View</span>
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
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            @click="
                                                                editGoal(goal)
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
                                                                removeGoal(goal)
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
            :goalToEdit="this.goalToEdit"
            :modalEdit="this.modalEdit"
            v-model="showModal"
            @created="$fetch"
        />

        <v-dialog v-model="viewGoalDetails" max-width="600px">
            <v-card v-if="goalToView != null">
                <v-card-title
                    class="text-h6 goals-modal-title mt-0 ml-3 mb-0 pt-3 pa-6 pb-0"
                >
                    <h4>
                        <span> {{ goalToView.description }}</span>
                    </h4>
                    <v-btn icon @click="viewGoalDetails = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text elevation="4">
                    <v-container fluid>
                        <v-row>
                            <v-col>
                                <p
                                    class="text-subtitle-2 mb-1"
                                    :style="{ color: viewStatusColor }"
                                >
                                    Status: {{ goalToView.status }}
                                </p>
                                <v-progress-linear
                                    :value="this.goalProgressBarValue"
                                    color="#28FF8B"
                                    height="35"
                                    rounded
                                >
                                    <strong
                                        >{{
                                            this.goalProgressBarValue
                                        }}%</strong
                                    >
                                </v-progress-linear>
                                <p
                                    class="text-subtitle-2 mt-1 text-center black--text"
                                >
                                    R${{
                                        parseFloat(goalProgressValue)
                                            .toFixed(2)
                                            .toString()
                                            .replace(".", ",")
                                    }}
                                </p>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" sm="6" xs="12" md="6" ld="6">
                                <v-row>
                                    <v-col cols="3">
                                        <v-icon
                                            x-large
                                            dense
                                            color="#DED370"
                                            class="mr-1 fa-solid fa-bullseye"
                                        ></v-icon>
                                    </v-col>
                                    <v-col>
                                        <p class="mb-0 black--text">
                                            Goal Type
                                        </p>
                                        <h5
                                            class="mt-0 text-subtitle-2 font-weight-black"
                                        >
                                            {{
                                                goalToView.type == "A"
                                                    ? "Achievement"
                                                    : "Saving"
                                            }}
                                        </h5>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" sm="6" xs="12" md="6" ld="6">
                                <v-row>
                                    <v-col cols="3">
                                        <v-icon
                                            x-large
                                            dense
                                            color="#E15151"
                                            class="mr-1 fa-solid fa-wallet"
                                        ></v-icon>
                                    </v-col>
                                    <v-col>
                                        <p class="mb-0 black--text">Wallet</p>
                                        <h5
                                            class="mt-0 text-subtitle-2 font-weight-black"
                                        >
                                            {{ goalToView.wallet.description }}
                                        </h5>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" sm="6" xs="12" md="6" ld="6">
                                <v-row>
                                    <v-col cols="3">
                                        <v-icon
                                            x-large
                                            dense
                                            color="#59A6ED"
                                            class="mr-1 fa-solid fa-dollar-sign"
                                        ></v-icon>
                                    </v-col>
                                    <v-col>
                                        <p class="mb-0 black--text">Amount</p>
                                        <h5
                                            class="mt-0 text-subtitle-2 font-weight-black"
                                        >
                                            R${{
                                                parseFloat(goalToView.value)
                                                    .toFixed(2)
                                                    .toString()
                                                    .replace(".", ",")
                                            }}
                                        </h5>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" sm="6" xs="12" md="6" ld="6">
                                <v-row>
                                    <v-col cols="3">
                                        <v-icon
                                            x-large
                                            dense
                                            color="#60AB6C"
                                            class="mr-1 fa-solid fa-calendar-day"
                                        ></v-icon>
                                    </v-col>
                                    <v-col>
                                        <p class="mb-0 black--text">
                                            Limit date
                                        </p>
                                        <h5
                                            class="mt-0 text-subtitle-2 font-weight-black"
                                        >
                                            {{
                                                dateFormat(goalToView.expire_at)
                                            }}
                                        </h5>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="text-right">
                                <v-btn
                                    color="#5BD098"
                                    dark
                                    large
                                    @click="editGoal(goalToView)"
                                >
                                    Edit
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import modal from "@/components/goals/modal.vue";
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
            goals: [],
            loading: false,
            showModal: false,
            goalToEdit: null,
            modalEdit: false,
            viewGoalDetails: false,
            goalToView: null,
            goalProgressValue: 0,
            goalProgressBarValue: 0,
        };
    },
    async fetch() {
        this.loading = true;
        await this.$axios
            .$get(`/goal?page=${this.currentPage}`)
            .then((res) => {
                this.pages = res.pages;
                this.goals = res.goals;
            })
            .finally(() => {
                this.loading = false;
            });
    },
    methods: {
        dateFormat(date) {
            if (date) {
                const dt = new Date(date);
                return dt.toLocaleString();
            } else return null;
        },
        changePagination() {
            this.$fetch();
        },
        removeGoal(goal) {
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
                    this.$axios.delete("/goal/" + goal.id).then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The goal has been deleted.",
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
        editGoal(goal) {
            this.viewGoalDetails = false;
            this.goalToEdit = goal;
            this.modalEdit = true;
            this.showModal = true;
        },
        viewGoal(goal) {
            this.goalToView = goal;
            this.viewGoalDetails = true;

            this.$axios.get(`/report/goal/${goal.id}`).then((res) => {
                console.log(res);
                if (res.data?.value) {
                    this.goalProgressValue = res.data.value;
                    this.goalProgressBarValue = Math.ceil(
                        (this.goalProgressValue / this.goalToView.value) * 100
                    );
                    if (this.goalProgressBarValue > 100) {
                        this.goalProgressBarValue = 100;
                    } else if (this.goalProgressBarValue < 0) {
                        this.goalProgressBarValue = 0;
                    }
                } else {
                    this.goalProgressValue = 0;
                    this.goalProgressBarValue = 0;
                }
            });
        },
    },
    computed: {
        viewStatusColor() {
            return this.goalToView.status == "PENDING"
                ? "#DED370" /* Yellow == PENDING */
                : this.goalToView.status == "FINISHED"
                ? "#5BD098" /* Green == FINISHED */
                : "#FF4B55"; /* Red == LOST */
        },
    },
};
</script>

<style lang="scss" scoped>
.table-goals-status {
    text-transform: lowercase;
    &::first-letter {
        text-transform: uppercase;
    }
}
</style>
