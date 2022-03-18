<template>
  <div class="container">
    <form class="formLogin" @submit.prevent="handleSubmit">
      <img src="@/static/logoComEscrito.svg" />
      <div class="form-group">
        <input
          type="text"
          v-model="email"
          name="email"
          class="form-control"
          placeholder="EMAIL"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="senha"
          name="senha"
          class="form-control"
          placeholder="SENHA"
        />
      </div>
      <div class="buttonArea">
        <button v-on:click="handleSubmit()" class="btn btn-primary">
          Acessar
        </button>
      </div>
      <div>
        <input type="checkbox" id="checkbox" v-model="rememberPass" />
        <span>LEMBRAR SENHA</span>
      </div>
    </form>
  </div>
</template>

<script>
import image from "/static/logo.svg";
export default {
  name: "login",
  layout: "clear",
  data() {
    return {
      email: "",
      senha: "",
      rememberPass: false,
      submitted: false,
    };
  },
  methods: {
    handleSubmit() {
      console.log("email:" + this.email);
      console.log("senha:" + this.senha);
    },
  },
};
</script>

<style lang="css" scoped>
.container {
  background-color: black;
}
.formLogin {
  background-color: white;
}
.form-group input {
  width: 80%;
  margin-bottom: 10px;
}
button {
  width: 80%;
  margin-bottom: 10px;
  border: 0px;
  height: 30px;
  background-color: #5bd098;
  color: white;
}
</style>
