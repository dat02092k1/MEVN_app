<template>
    <div class="login-page">
      <h1>Login</h1>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username">
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
        <br>
        <button @click="login">Login</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
 
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
            console.log(this.username);
          const response = await axios.post('http://localhost:2000/user/login', {
            address: this.username,
            password: this.password,
          });
          console.log(response.data[0]);
  
          if (response.status === 200) {
             
            // sessionStorage.setItem("flag", response.data[0].flag);
            // let flag = sessionStorage.getItem("flag");
            // joinRoom(flag);
            sessionStorage.setItem("role", response.data[0].role);
             
            this.$router.push('/post');
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  