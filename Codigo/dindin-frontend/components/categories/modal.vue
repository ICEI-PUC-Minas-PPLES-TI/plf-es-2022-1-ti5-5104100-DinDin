<template>
  <v-dialog
    v-model="show"
    max-width="600px"
    @click:outside="$emit('input', false)"
    @keydown.esc="$emit('input', false)"
  >
    <v-card class="pa-2">
      <v-card-title class="text-h5 categories-modal-title">
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
        <!-- Categorie Add Form -->
        <v-container fluids>
          <v-form ref="form" v-on:submit.prevent="saveCategory" lazy-validation>
            <v-row class="pb-2">
              <v-text-field
                :rules="[rules.required]"
                prepend-inner-icon="mdi-tag"
                outlined
                v-model="category.description"
                hide-details="auto"
                :clearable="true"
                label="Games"
                maxlength="40"
              />
            </v-row>
            <v-row class="mb-0 pb-2">
              <v-col cols="12" class="py-2">
                <p>Type</p>
                <v-btn-toggle
                  v-model="category.type"
                  tile
                  color="deep-purple accent-3"
                  group
                >
                  <v-btn value="IN"> Incoming </v-btn>
                  <v-btn value="OUT"> Outcome </v-btn>

                </v-btn-toggle>
              </v-col>
            </v-row>
            <v-row class="mb-0 pb-2">
              <v-text-field
                label="Color"
                prepend-inner-icon="mdi-format-paint"
                v-model="category.color"
                v-mask="mask"
                outlined
                hide-details
                class="ma-0 pa-0"
              >
                <template v-slot:append>
                  <v-menu
                    v-model="menu"
                    top
                    nudge-bottom="110"
                    nudge-left="-50"
                    :close-on-content-click="false"
                  >
                    <template v-slot:activator="{ on }">
                      <div :style="swatchStyle" v-on="on" />
                    </template>
                    <v-card>
                      <v-card-text class="pa-0">
                        <v-color-picker v-model="category.color" flat />
                      </v-card-text>
                    </v-card>
                  </v-menu>
                </template>
              </v-text-field>
              <!-- <v-color-picker v-model="category.color"></v-color-picker> -->
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="4" align="center">
            <v-btn text color="black" @click.stop="$emit('input', false)"
              >Cancel</v-btn
            >
          </v-col>
          <v-col v-if="categoryId" class="mr-2">
            <v-btn block color="primary" @click.stop="editCategory()"
              >Edit</v-btn
            >
          </v-col>
          <v-col v-else class="mr-2">
            <v-btn block color="primary" @click.stop="saveCategory()"
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
    categoryId: Number,
  },
  data() {
    return {
      title: "New Goal",
      category: {
        id: "",
        description: "",
        color: "#FF0000FF",
      },
      menu: false,
      mask: "!#XXXXXXXX",
      rules: {
        required: (value) => !!value || "Required.",
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
    swatchStyle() {
      const menu = this.menu;
      const color = this.category.color ?? "#FF0000FF";
      return {
        backgroundColor: color,
        cursor: "pointer",
        height: "30px",
        width: "30px",
        borderRadius: menu ? "50%" : "4px",
        transition: "border-radius 200ms ease-in-out",
      };
    },
  },
  watch: {
    categoryId: function (modalEdit) {
      if (modalEdit) {
        this.title = "Edit Category";
      } else {
        this.title = "New Category";
        this.cleanForm();
      }
    },
  },
  methods: {
    saveCategory() {
      this.errors = [];
      if (this.$refs.form.validate()) {
        this.$axios
          .post("/goal", this.goal)
          .then((res) => {
            Swal.fire({
              title: "Category Created",
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
    editCategory() {
      this.errors = [];
      if (this.$refs.form.validate()) {
        this.$axios
          .put("/goal/" + this.goal.id, this.goal)
          .then((res) => {
            Swal.fire({
              title: "Category Edited",
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
    fillForm(data) {
      this.category.id = data.id;
      this.category.description = data.description;
    },
    cleanForm() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
.categories-modal-title h4 {
  width: calc(100% - 37px);
  text-align: left;
  line-height: 0.1em;
  margin: 20px 0 20px;
}
</style>
