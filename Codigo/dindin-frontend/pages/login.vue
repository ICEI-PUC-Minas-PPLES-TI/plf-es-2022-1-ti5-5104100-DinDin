<template>
  <div class="container">
    <form class="formLogin" @submit.prevent="handleSubmit">
      <div class="imgPlace">
        <img src="@/static/logoComEscrito.svg" />
      </div>
      <div class="formActions">
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
            ACESSAR
          </button>
        </div>
        <div class="check">
          <input type="checkbox" id="checkbox" v-model="rememberPass" />
          <span>LEMBRAR SENHA</span>
        </div>
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
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap");
.container {
  width: 50%;
  height: 50%;
  margin: auto;
  padding: 5%;
}
.formLogin {
  background-color: white;
  font-family: "Roboto", sans-serif;
}
.imgPlace {
  display: flex;
  justify-content: center;
}
.imgPlace img {
  width: 60%;
}
.formActions{
  display:grid;
}

.form-group input {
  grid-row:1;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid grey;
  height: 5vh;
}

.check{
  display:flex;
}
button {
  width: 100%;
  margin-bottom: 10px;
  border: 0px;
  height: 5vh;
  background-color: #5bd098;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
}
</style>
