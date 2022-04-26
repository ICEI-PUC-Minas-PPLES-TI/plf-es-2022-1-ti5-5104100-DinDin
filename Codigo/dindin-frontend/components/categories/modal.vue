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
                placeholder="Games"
                maxlength="40"
              />
            </v-row>
            <v-row class="mb-0 pb-2">
              <v-col cols="12" class="py-2">
                <p>Type</p>
                <v-btn-toggle v-model="category.type" outlined mandatory>
                  <v-btn value="IN"> Incoming </v-btn>
                  <v-btn value="OUT"> Outcome </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
            <v-row class="mb-0 pb-2">
              <v-combobox
                :rules="[rules.required]"
                v-model="category.color"
                :filter="filter"
                :items="colors"
                label="Color"
                item-text="text"
                item-value="hex"
                outlined
              >
                <template v-slot:selection="{ attrs, item, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    :color="`${item.hex}`"
                    :input-value="selected"
                    label
                    small
                  >
                  </v-chip>
                  <span class="pr-2">
                    {{ item.text }}
                  </span>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip :color="`${item.hex}`" dark label small> </v-chip>
                  <span class="pl-2">
                    {{ item.text }}
                  </span>
                </template>
              </v-combobox>
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
          <v-col v-if="category.id" class="mr-2">
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
      title: "New Category",
      category: {
        id: "",
        description: "",
        type: "",
        color: {
          hex: "",
          text: "",
        },
        wallet_id: "",
        user_id: "",
      },
      menu: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
      errors: [],

      activator: null,
      attach: null,
      colors: [
        {
          text: "Red",
          hex: "#EB5A46",
        },
        {
          text: "Orange",
          hex: "#FF9F1A",
        },
        {
          text: "Blue",
          hex: "#0079bf",
        },
        {
          text: "Green",
          hex: "#61bd4f",
        },
        {
          text: "Purple",
          hex: "#c377e0",
        },
        {
          text: "Yellow",
          hex: "#f2d600",
        },
        {
          text: "Dark Blue",
          hex: "#344563",
        },
        {
          text: "Pink",
          hex: "#ff78cb",
        },
      ],
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
      const color = this.category.color.hex ?? "#FF0000FF";
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
    categoryId: function (id) {
      if (id) {
        this.title = "Edit Category";
        this.getCategory(id);
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
        const category = {
          description: this.category.description,
          type: this.category.type,
          color: this.category.color.hex.replace("#", ""),
          wallet_id: 1,
          user_id: 1,
        };

        this.$axios
          .post("/category", category)
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
            this.$emit("created");
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
        const category = {
          description: this.category.description,
          type: this.category.type,
          color: this.category.color.hex.replace("#", ""),
          wallet_id: 1,
          user_id: 1,
        };

        this.$axios
          .put("/category/" + this.category.id, category)
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
            this.$emit("created");
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
    getCategory(id) {
      this.$axios
        .get("/category/" + id)
        .then((res) => {
          let data = res.data;
          console.log(data);
          this.category.id = id;
          this.category.description = data.description;
          this.category.type = data.type;
          //this.category.user_id = data.user_id;
          this.category.wallet_id = data.wallet_id;
          this.category.color.hex = "#" + data.color;
          let color = this.colors.filter(function (val) {
            return val.hex == ("#"+data.color).replace(" ", "");
          });
          if (color && color[0]?.text) {
            this.category.color.text = color[0].text;
          } else {
            this.category.color.text = "";
          }
        })
        .catch((err) => {
          this.erroLogin = err.response.data.message;
          if (err.response.status == 500) {
            this.erroLogin = "Erro interno do servidor";
          }
        });
    },
    fillForm(data) {
      this.category.id = data.id;
      this.category.description = data.description;
    },
    cleanForm() {
      this.category = {
        id: "",
        description: "",
        type: "",
        color: {
          hex: "",
          text: "",
        },
        wallet_id: "",
        user_id: "",
      };
      this.$refs.form.reset();
    },
    getNameByHex(hex) {
      console.log(hex);
      let index = this.colors.indexOf((val) => {
        return val.hex == "#344563";
      });
      console.log(index);
      if (index == -1) {
        this.colors.push({ text: "Personalized", hex: hex });
      } else {
        return this.colors[index].text;
      }
      return "Personalized";
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
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
