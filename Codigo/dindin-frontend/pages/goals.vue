<template>
  <v-container fluid>
    <!-- Page Title -->
    <v-row>
      <v-col>
        <h2 class="page-title">
          Goals
        </h2>
      </v-col>
    </v-row>
    <!-- Table Section -->
    <v-row>
      <v-col>
        <v-card elevation="0" class="p-20">
          <!-- Table top toolbar -->
          <v-row>
            <v-col cols="2" offset="10">
              <v-btn block color="success">
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
                      <th class="text-left">Date Limit</th>
                      <th class="text-left">Status</th>
                      <th class="text-left">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Be biquinis
                      </td>
                      <td>Saving</td>
                      <td>R$1500</td>
                      <td>25/05/2022</td>
                      <td>In progress</td>
                      <td>btns</td>
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
                v-model="page"
                class="my-4"
                :length="20"
              ></v-pagination>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "home",
  data(){
    return {
      page: 1
    }
  }
};
</script>

<style>
</style>