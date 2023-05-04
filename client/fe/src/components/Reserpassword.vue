<template>
    <div>
      <h2>Reset Password</h2>
      <form>
        <div>
          <label for="password">New Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div>
          <label for="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required>
        </div>
        <div>
          <label>Token:</label>
          <input type="token" id="token" v-model="token" required>
        </div>
        <button type="button" @click="resetPassword">Reset Password</button>
      </form>
      <div v-if="successMessage">{{ successMessage }}</div>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        password: '',
        confirmPassword: '',
        successMessage: '',
        errorMessage: '',
        token: '',
      }
    },
    mounted() {
        console.log('flag') 
        console.log(this.token) //
    },
    methods: {
      async resetPassword() {
        if (this.password !== this.confirmPassword) {
          console.log(this.token);
          this.errorMessage = 'Passwords do not match';
          return;
        }
  
        try {
          console.log({
            token: this.token,
            password: this.password
          });
          
          const response = await axios.post('http://localhost:2000/reset', {
            token: this.token,
            password: this.password
          });
          
          this.successMessage = response.data.message;
        } catch (error) {
          this.errorMessage = error.response.data.message;
        }
      }
    }
  }
  </script>
  