<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-card elevation="0" class="p-20">
                    <v-row>
                        <v-col cols="12" md="9">
                            <v-row>
                                <v-col>
                                    <b>Welcome Back {{ name }} </b>
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
                                            <b
                                                >R${{
                                                    (
                                                        ioValues.incoming -
                                                        ioValues.outcoming
                                                    )
                                                        .toFixed(2)
                                                        .replace(".", ",")
                                                }}</b
                                            >
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
                                            <b
                                                >R${{
                                                    ioValues.incoming
                                                        .toFixed(2)
                                                        .replace(".", ",")
                                                }}</b
                                            >
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
                                            <b
                                                >R${{
                                                    ioValues.outcoming
                                                        .toFixed(2)
                                                        .replace(".", ",")
                                                }}</b
                                            >
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
                                        <tr
                                            v-for="(t, tidx) in transactions"
                                            :key="tidx"
                                        >
                                            <td>
                                                <i
                                                    class="dash-table-icon"
                                                    :class="
                                                        t.value > 0
                                                            ? 'dash-table-icon-green'
                                                            : 'dash-table-icon-red'
                                                    "
                                                ></i>
                                                <span
                                                    class="dash-table-description"
                                                    >{{ t.description }}</span
                                                >
                                            </td>
                                            <td>{{ formatDate(t.date) }}</td>
                                            <td>
                                                {{ t.value > 0 ? "+" : "-" }}
                                                R${{ Math.abs(t.value) }}
                                            </td>
                                            <td>{{ t.wallet.description }}</td>
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
                        <v-col v-if="wallets.length > 0">
                            <v-row>
                                <v-col>
                                    <v-tabs
                                        v-model="tabWallets"
                                        align-with-title
                                        @change="changeChartTab"
                                    >
                                        <v-tabs-slider
                                            color="#85DFB4"
                                        ></v-tabs-slider>

                                        <v-tab
                                            v-for="(w, widx) in wallets"
                                            :key="widx"
                                            >{{ w.description }}</v-tab
                                        >
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
                        <v-col v-else>
                            You do not have any wallets created
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
            name: "Name",
            tabWallets: null,
            wallets: [],
            chartWalletBalance: null,
            chartWalletWeekBalance: null,
            chartWalletCategoryBalance: null,
            ioValues: {
                incoming: 0,
                outcoming: 0,
            },
            transactions: [],
        };
    },
    async fetch() {
        await this.$axios.get("/wallet").then((res) => {
            this.wallets = res.data.wallets;
        });
        await this.$axios.get("/user").then((res) => {
            this.name = res.data.name;
        });
        await this.$axios.get("/transaction?limit=5").then((res) => {
            this.transactions = res.data.transactions;
        });
    },
    mounted() {
        this.$axios.get(`/report/balance`).then((res) => {
            this.ioValues.incoming = res.data.incoming;
            this.ioValues.outcoming = res.data.outcoming;
            const ctxMain = document.getElementById("chartMain");
            new Chart(ctxMain, {
                type: "pie",
                data: {
                    labels: ["Incomes", "Expenses"],
                    datasets: [
                        {
                            label: "Overview",
                            data: [res.data.incoming, res.data.outcoming],
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
        });

        if (this.wallets.length > 0) this.changeChartTab(0);
    },
    methods: {
        changeChartTab(tab) {
            // Wallet General Balance
            this.$axios
                .get(`/report/balance?wallet_id=${this.wallets[tab].id}`)
                .then((res) => {
                    if (this.chartWalletBalance)
                        this.chartWalletBalance.destroy();

                    const ctx = document.getElementById("chart2");
                    this.chartWalletBalance = new Chart(ctx, {
                        type: "pie",
                        data: {
                            labels: ["Incomes", "Expenses"],
                            datasets: [
                                {
                                    label: "Overview",
                                    data: [
                                        res.data.incoming,
                                        res.data.outcoming,
                                    ],
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
                });
            // Wallet Week Balance
            this.$axios
                .get(`/report/dailybalance?wallet_id=${this.wallets[tab].id}`)
                .then((res) => {
                    if (this.chartWalletWeekBalance)
                        this.chartWalletWeekBalance.destroy();

                    var labels = [];
                    var dataset = [
                        {
                            label: "Incoming",
                            data: [],
                            backgroundColor: "#60AB6C",
                        },
                        {
                            label: "Expenses",
                            data: [],
                            backgroundColor: "#E15151",
                        },
                    ];
                    res.data.forEach((element) => {
                        let dt = new Date(element.dt);
                        labels.push(`${dt.toLocaleDateString()}`);
                        dataset[0].data.push(element.incoming);
                        dataset[1].data.push(element.outcoming);
                    });
                    const ctx3 = document.getElementById("chart1");
                    this.chartWalletWeekBalance = new Chart(ctx3, {
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
                });
            // Wallet Category Balance
            this.$axios
                .get(`/report/category?wallet_id=${this.wallets[tab].id}`)
                .then((res) => {
                    let label = [];
                    let data = [];
                    let color = [];
                    res.data.forEach((element) => {
                        label.push(element.description);
                        data.push(element.total);
                        color.push(this.getDarkColor());
                    });
                    if (this.chartWalletCategoryBalance)
                        this.chartWalletCategoryBalance.destroy();
                    const ctx2 = document.getElementById("chart3");
                    this.chartWalletCategoryBalance = new Chart(ctx2, {
                        type: "pie",
                        data: {
                            labels: label,
                            datasets: [
                                {
                                    label: "Categories Overview",
                                    data: data,
                                    backgroundColor: color,
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
                });
        },
        getDarkColor() {
            let color = "#";
            for (let i = 0; i < 6; i++) color += Math.floor(Math.random() * 10);
            return color;
        },
        formatDate(date) {
            const dt = new Date(date);
            return dt.toLocaleDateString() + " " + dt.toLocaleTimeString();
        },
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
    &-table {
        &-icon {
            font-size: 0.7rem;
            border-radius: 100%;
            height: 25px;
            width: 25px;
            display: inline-block;
            text-align: center;
            color: #fff;
            padding: 5px 5px 3px 5px;
            &-green {
                background: #60ab6c;
            }
            &-red {
                background: #e15151;
            }
        }
        &-description {
            margin-left: 10px;
            display: inline-block;
            transform: translateY(-50%);
        }
    }

    &-chart {
        width: 250px;
        height: 250px;
        margin: 0 auto;
    }
}
</style>
