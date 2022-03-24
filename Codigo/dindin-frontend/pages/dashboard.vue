<template>
  <v-container fluid>
    <v-row>
      <v-col md="9">
        <v-row>
          <v-col>
            Welcome Back Name
          </v-col>
        </v-row>
        <v-row>
          <v-col md="3">
            <v-row>
              <v-col md="3">

              </v-col>
              <v-col md="9">
                Current
                <br>
                <b>R$2000,00</b>
              </v-col>
            </v-row>
          </v-col>
          <v-col md="3">
            <v-row>
              <v-col md="3">

              </v-col>
              <v-col md="9">
                Incomes
                <br>
                <b>R$2400,00</b>
              </v-col>
            </v-row>
          </v-col>
          <v-col md="3">
            <v-row>
              <v-col md="3">

              </v-col>
              <v-col md="9">
                Expenses
                <br>
                <b>R$400,00</b>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="3">
        <div style="width: 250px; height: 250px">
          <canvas id="chartMain"></canvas>
        </div>
      </v-col>
    </v-row>
    <!-- Transações Recentes -->
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
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
                <td>Be biquinis</td>
                <td>01/01/1111 23:59</td>
                <td>+ R$1000</td>
                <td>Wallet X</td>
              </tr>
              <tr>
                <td>Cinemark</td>
                <td>01/01/1111 23:59</td>
                <td>+ R$2000</td>
                <td>Wallet X</td>
              </tr>
              <tr>
                <td>Uber Monthly</td>
                <td>01/01/1111 23:59</td>
                <td>- R$460</td>
                <td>Wallet Y</td>
              </tr>
              <tr>
                <td>Verdemar</td>
                <td>01/01/1111 23:59</td>
                <td>- R$240</td>
                <td>Wallet X</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <!-- Gráficos de entrada/saida, saida por categoria -->
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-tabs v-model="tabWallets" align-with-title>
              <v-tabs-slider color="#85DFB4"></v-tabs-slider>

              <v-tab> Wallet X </v-tab>
              <v-tab> Wallet Y </v-tab>
              <v-tab> Wallet Z </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="4">
            <br><br><br>
            <div style="width: 250px; height: 250px">
              <canvas id="chart1"></canvas>
            </div>
          </v-col>
          <v-col md="4">
            <div style="width: 250px; height: 250px">
              <canvas id="chart2"></canvas>
            </div>
          </v-col>
          <v-col md="4">
            <div style="width: 250px; height: 250px">
              <canvas id="chart3"></canvas>
            </div>
          </v-col>
        </v-row>
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
    const myChart = new Chart(ctx, {
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
    const myChart2 = new Chart(ctx2, {
      type: "pie",
      data: {
        labels: ["Food", "Transportation","Education","House"],
        datasets: [
          {
            label: "Categories Overview",
            data: [12, 19, 5, 11],
            backgroundColor: ["#EC6433", "#a3726f","#753192","#0E4D8D"],
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
    var labels = ["24/03", "25/03","26/03","27/03","28/03","29/03","30/03","31/03"];
    var dataset = [ 
                {
                  label: "Incoming",
                  data: [1, 2, 1, 3,1, 2, 1, 3],
                  backgroundColor: '#60AB6C'
                },
                {
                  label: "Expenses",
                  data: [5, 1, 3, 0,5, 1, 3, 0],
                  backgroundColor: '#E15151'
                }
            ];
    const myChart3 = new Chart(ctx3, {
      type: "bar",
      data: {
        labels: labels,
        datasets: dataset
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
            stacked: true
          }
        },
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });

    const ctxMain = document.getElementById("chartMain");
    const myChartMain = new Chart(ctxMain, {
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
    })
    
  },
};
</script>

<style>
</style>