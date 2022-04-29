<template>
  <v-container fluid>
    <!-- Page Title -->
    <v-row>
      <v-col>
        <h2 class="page-title">Categories</h2>
      </v-col>
    </v-row>
    <!-- Table Section -->
    <v-row>
      <v-col>
        <v-card elevation="0" class="p-20">
          <!-- Table top toolbar -->
          <v-row>
            <v-col cols="2" offset="10">
              <v-btn block color="success" @click.stop="showModalCategory(0)">
                New Category
              </v-btn>
            </v-col>
          </v-row>
          <!-- Table -->
          <v-row>
            <v-col>
              <v-simple-table>
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-right">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="loading">
                      <td colspan="6">Loading...</td>
                    </tr>
                    <tr v-for="(category, idx) in categories" :key="idx">
                      <td>
                        <div :style="swatchStyle('#' + category.color)" />
                        &nbsp; {{ category.description }}
                      </td>
                      <td class="text-right">
                        <v-tooltip top>
                          <template #activator="{ on, attrs }">
                            <v-btn
                              elevation="0"
                              small
                              v-bind="attrs"
                              v-on="on"
                              @click="showModalCategory(category.id)"
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
                            </v-btn>
                          </template>
                          <span>Edit</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template #activator="{ on, attrs }">
                            <v-btn
                              elevation="0"
                              small
                              color="error"
                              v-bind="attrs"
                              v-on="on"
                              @click="removeCategory(category.id)"
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
    <modal v-model="showModal" :category-id="categoryId" @created="$fetch" />
  </v-container>
</template>

<script>
import modal from "@/components/categories/modal.vue";
import Swal from "sweetalert2";
export default {
  components: {
    modal,
  },
  layout: "home",
  data() {
    return {
      currentPage: 1,
      pages: 1,
      categories: [],
      loading: false,
      showModal: false,
      categoryId: 0,
    };
  },

  async fetch() {
    this.loading = true;
    await this.$axios
      .$get(`/category?page=${this.currentPage}`)
      .then((res) => {
        this.pages = res.pages;
        this.categories = res.categories;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    swatchStyle(color) {
      return {
        display: "inline-block",
        backgroundColor: color,
        height: "25px",
        width: "25px",
        borderRadius: "10px",
      };
    },
    changePagination() {
      this.$fetch();
    },
    removeCategory(id) {
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
          this.$axios.delete("/category/" + id).then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "The category has been deleted.",
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
    showModalCategory(id) {
      this.showModal = true;
      this.categoryId = parseInt(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-categories-status {
  text-transform: lowercase;
  &::first-letter {
    text-transform: uppercase;
  }
}
</style>
