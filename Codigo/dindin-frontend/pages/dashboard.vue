<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-card elevation="0" class="p-20">
                    <v-row>
                        <v-col cols="12" md="9">
                            <v-row>
                                <v-col>
                                    <b>Welcome Back Name</b>
                                </v-col>
                            </v-row>
                            <v-row class="dash-welcome-main">
                                <v-col cols="4">
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <i
                                                class="dash-welcome-icon dash-welcome-icon-blue fa-solid fa-money-bill-1-wave"
                                            ></i>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            Current
                                            <br />
                                            <b>R$2000,00</b>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="4">
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <i
                                                class="dash-welcome-icon dash-welcome-icon-green fa-solid fa-arrow-up-long"
                                            ></i>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            Incomes
                                            <br />
                                            <b>R$2400,00</b>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="4">
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <i
                                                class="dash-welcome-icon dash-welcome-icon-red fa-solid fa-arrow-down-long"
                                            ></i>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            Expenses
                                            <br />
                                            <b>R$400,00</b>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="6" offset="3" offset-md="0" md="3">
                            <div class="dash-welcome-dash">
                                <canvas id="chartMain"></canvas>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <!-- Transações Recentes -->
        <v-row>
            <v-col>
                <v-card elevation="0" class="p-20">
                    <v-row>
                        <v-col>
                            <b>Last transactions </b>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-simple-table>
                                <template #default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">Name</th>
                                            <th class="text-left">Date</th>
                                            <th class="text-left">Amount</th>
                                            <th class="text-left">Wallet</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <i
                                                    class="dash-table-icon fa-solid fa-utensils"
                                                ></i>
                                                Be biquinis
                                            </td>
                                            <td>01/01/1111 23:59</td>
                                            <td>+ R$1000</td>
                                            <td>Wallet X</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <i
                                                    class="dash-table-icon fa-solid fa-utensils"
                                                ></i>
                                                Cinemark
                                            </td>
                                            <td>01/01/1111 23:59</td>
                                            <td>+ R$2000</td>
                                            <td>Wallet X</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <i
                                                    class="dash-table-icon fa-solid fa-utensils"
                                                ></i>
                                                Uber Monthly
                                            </td>
                                            <td>01/01/1111 23:59</td>
                                            <td>- R$460</td>
                                            <td>Wallet Y</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <i
                                                    class="dash-table-icon fa-solid fa-utensils"
                                                ></i>
                                                Verdemar
                                            </td>
                                            <td>01/01/1111 23:59</td>
                                            <td>- R$240</td>
                                            <td>Wallet X</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <!-- Gráficos de entrada/saida, saida por categoria -->
        <v-row>
            <v-col>
                <v-card elevation="0" class="p-20">
                    <v-row>
                        <v-col>
                            <b>Wallet Overview</b>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-row>
                                <v-col>
                                    <v-tabs
                                        v-model="tabWallets"
                                        align-with-title
                                    >
                                        <v-tabs-slider
                                            color="#85DFB4"
                                        ></v-tabs-slider>

                                        <v-tab> Wallet X </v-tab>
                                        <v-tab> Wallet Y </v-tab>
                                        <v-tab> Wallet Z </v-tab>
                                    </v-tabs>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="4">
                                    <br /><br /><br />
                                    <div class="dash-chart">
                                        <canvas id="chart1"></canvas>
                                    </div>
                                </v-col>
                                <v-col md="4">
                                    <div class="dash-chart">
                                        <canvas id="chart2"></canvas>
                                    </div>
                                </v-col>
                                <v-col md="4">
                                    <div class="dash-chart">
                                        <canvas id="chart3"></canvas>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {
    Chart,
    ArcElement,
    BarElement,
    PieController,
    BarController,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    CategoryScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
} from "chart.js";

Chart.register(
    ArcElement,
    BarElement,
    PieController,
    BarController,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    CategoryScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
);

export default {
    layout: "home",
    data() {
        return {
            tabWallets: "Wallet X",
        };
    },
    mounted() {
        const ctx = document.getElementById("chart2");
        new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Incomes", "Expenses"],
                datasets: [
                    {
                        label: "Overview",
                        data: [12, 19],
                        backgroundColor: ["#60AB6C", "#E15151"],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        display: false,
                        grid: {
                            display: false,
                        },
                    },
                },
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
            },
        });
        const ctx2 = document.getElementById("chart3");
        new Chart(ctx2, {
            type: "pie",
            data: {
                labels: ["Food", "Transportation", "Education", "House"],
                datasets: [
                    {
                        label: "Categories Overview",
                        data: [12, 19, 5, 11],
                        backgroundColor: [
                            "#EC6433",
                            "#a3726f",
                            "#753192",
                            "#0E4D8D",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        display: false,
                        grid: {
                            display: false,
                        },
                    },
                },
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
            },
        });

        const ctx3 = document.getElementById("chart1");
        var labels = [
            "24/03",
            "25/03",
            "26/03",
            "27/03",
            "28/03",
            "29/03",
            "30/03",
            "31/03",
        ];
        var dataset = [
            {
                label: "Incoming",
                data: [1, 2, 1, 3, 1, 2, 1, 3],
                backgroundColor: "#60AB6C",
            },
            {
                label: "Expenses",
                data: [5, 1, 3, 0, 5, 1, 3, 0],
                backgroundColor: "#E15151",
            },
        ];
        new Chart(ctx3, {
            type: "bar",
            data: {
                labels: labels,
                datasets: dataset,
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        stacked: true,
                        display: false,
                        grid: {
                            display: false,
                        },
                    },
                    x: {
                        stacked: true,
                    },
                },
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
            },
        });

        const ctxMain = document.getElementById("chartMain");
        new Chart(ctxMain, {
            type: "pie",
            data: {
                labels: ["Incomes", "Expenses"],
                datasets: [
                    {
                        label: "Overview",
                        data: [10, 14],
                        backgroundColor: ["#60AB6C", "#E15151"],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        display: false,
                        grid: {
                            display: false,
                        },
                    },
                },
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
            },
        });
    },
};
</script>

<style lang="scss" scoped>
.dash {
    &-welcome {
        &-main {
            margin-top: 30px;
        }
        &-icon {
            margin-top: 10px;
            color: #fff;
            padding: 9px 5px 5px 5px;
            border-radius: 100%;
            height: 35px;
            width: 35px;
            text-align: center;
            &-blue {
                background: #59a6ed;
            }
            &-green {
                background: #60ab6c;
            }
            &-red {
                background: #e15151;
            }
        }
        &-chart {
            width: 200px;
            height: 200px;
            margin: 0 auto;
        }
    }
    &-table-icon {
        font-size: 0.7rem;
        border-radius: 100%;
        height: 25px;
        width: 25px;
        background: #60ab6c;
        text-align: center;
        color: #fff;
        padding: 5px 5px 3px 5px;
    }
    &-chart {
        width: 250px;
        height: 250px;
        margin: 0 auto;
    }
}
</style>
