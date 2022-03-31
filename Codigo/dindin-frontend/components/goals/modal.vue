<template>
  <v-dialog
    v-model="show"
    max-width="600px"
    @click:outside="$emit('input', false)"
    @keydown.esc="$emit('input', false)"
  >
    <v-card height="130%" class="pa-2">
      <v-card-title class="text-h5 goals-modal-title">
        <h4>
          <span> Goals</span>
        </h4>
        <v-btn icon @click="$emit('input', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container fluids>
          <v-form>
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
                :rules="[rules.required]"
                v-model="goal.value"
                prepend-inner-icon="mdi-currency-usd"
                outlined
                type="number"
                hide-details="auto"
                :clearable="true"
                label="0,00"
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
                    :rules="[rules.required]"
                    prepend-inner-icon="mdi-calendar-range"
                    outlined
                    hide-details="auto"
                    type="text"
                    :value="date"
                    v-bind="attrs"
                    v-on="on"
                    label="Date"
                  />
                </template>
                <v-date-picker
                  v-model="goal.date"
                  @click.native="parseDate(goal.date)"
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
                  { text: 'Saving', value: 1 },
                  { text: 'Achievement', value: 2 },
                ]"
                label="Goal Type"
              />
            </v-row>
            <v-row class="mt-0 pt-0">
              <v-select
                :rules="[rules.required]"
                v-model="goal.walletId"
                prepend-inner-icon="mdi-wallet"
                outlined
                hide-details="auto"
                :items="[
                  { text: 'Personal', value: 1 },
                  { text: 'Public', value: 2 },
                ]"
                label="Wallet"
              />
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="4" align="center">
            <v-btn text color="black" @click.stop="show = false">Cancel</v-btn>
          </v-col>
          <v-col class="mr-2">
            <v-btn
              block
              color="primary"
              @click.stop="saveGoal(), (show = false)"
              >Save</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data(){
    return{
      goal: {
        description: "",
        date: "",
        value: "",
        type: 0,
        walletId: 0,
      },
      date: "",
      menu: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
    }
  },
  props: {
    value: Boolean,
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
  methods: {
    saveGoal() {
      console.log(this.goal);
    },
    editGoal() {},
    parseDate(date) {
      const [year, month, day] = date.split('-')
      this.date = `${day}/${month}/${year}`
    },
  },
};
</script>

<style>
.goals-modal-title {
  margin-left: 0px;
}
.goals-modal-title h4 {
  width: calc(100% - 37px);
  text-align: left;
  line-height: 0.1em;
  margin: 20px 0 20px;
}
.goals-modal-title h4 span {
  background: #fff;
  padding: 0 10px;
}
</style>
