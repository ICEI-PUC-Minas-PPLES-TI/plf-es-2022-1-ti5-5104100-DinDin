<template>
  <b-row class="vh-100 vw-100">
    <b-col>
      <div class="container">
        <form class="formLogin" @submit.prevent="handleSubmit">
          <img src="@/static/logoComEscrito.svg" />
          <div class="form-group">
            <input
              type="text"
              v-model="email"
              name="email"
              class="form-control"
              placeholder="Email"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="password"
              name="password"
              class="form-control"
              placeholder="Password"
            />
          </div>
          <div class="buttonArea">
            <button class="btn btn-primary">Login</button>
          </div>
          <div>
            <input type="checkbox" id="checkbox" v-model="rememberPass" />
            <span>LEMBRAR SENHA</span>
          </div>
        </form>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import image from "/static/logo.svg";
export default {
  name: "login",
  layout: "clear",
  data() {
    return {
      email: "",
      password: "",
      rememberPass: false,
      submitted: false,
    };
  },
};
</script>

<style lang="css" scoped>
  .container{
    background-color: black;
  }
  .formLogin {
    background-color: white;
  }
  .form-group input{
    width:80%;
    margin-bottom:10px;
  }
  button{
    width:80%;
    margin-bottom:10px;
    border:0px;
    height:30px;
  }
</style>
