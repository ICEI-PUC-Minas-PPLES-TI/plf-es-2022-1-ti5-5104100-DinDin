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
          <v-row>
            <v-col cols="2" offset="10">
              <v-btn block color="success" @click.stop="showModal = true;modalEdit=false">
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
                    <tr v-if="loading">
                      <td colspan="6">Loading...</td>
                    </tr>
                    <tr v-for="(goal, gidx) in goals" :key="gidx">
                      <td>
                        {{ goal.description }}
                      </td>
                      <td>{{ goal.type }}</td>
                      <td>R${{ goal.value }}</td>
                      <td>{{ dateFormat(goal.expire_at) }}</td>
                      <td class="table-goals-status">{{ goal.status }}</td>
                      <td>
                        <!-- <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn elevation="0" small v-bind="attrs" v-on="on">
                              <i class="fa-solid fa-eye"></i>
                            </v-btn>
                          </template>
                          <span>View</span>
                        </v-tooltip> -->
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              elevation="0"
                              small
                              v-bind="attrs"
                              v-on="on"
                              @click="editGoal(goal)"
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
                            </v-btn>
                          </template>
                          <span>Edit</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              elevation="0"
                              small
                              color="error"
                              v-bind="attrs"
                              v-on="on"
                              @click="removeGoal(goal)"
                            >
                              <i class="fa-solid fa-trash"></i>
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
    <modal :goalToEdit="this.goalToEdit" :modalEdit="this.modalEdit" v-model="showModal" @created="$fetch" />
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
          this.$axios.delete("/goal/" + goal.id).then((res) => {
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
          });
        }
        this.$fetch();
      });
    },
    editGoal(goal) {
      this.goalToEdit = goal;
      this.modalEdit=true;
      this.showModal = true;
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
