<template>
    <form id="student-form" @submit.prevent="handleSubmit">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="formData.name" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="formData.email" required>
      <br>
      <label for="phone">Phone:</label>
      <input type="tel" id="phone" v-model="formData.phone" required>
      <br>
      <button type="submit">Submit</button>
    </form>
  </template>
  
  <script>
  import html2pdf from 'html2pdf.js'
  
  export default {
    data() {
      return {
        formData: {
          name: '',
          email: '',
          phone: ''
        }
      }
    },
    methods: {
      handleSubmit() {
        const form = document.getElementById('student-form')
        const html = form.outerHTML
        const options = {
          margin: [0, 0, 0, 0],
          filename: 'student-form.pdf',
          jsPDF: { unit: 'px', format: 'letter', orientation: 'portrait' }
        }
  
        html2pdf().from(html).set(options).save()
      }
    }
  }
  </script>