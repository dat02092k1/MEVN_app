<template>
    <div>
      <button @click="downloadFile">Download File</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fileUrl: '' // the URL of the uploaded file will be stored here
      }
    },
    methods: {
      downloadFile() {
        window.open(this.fileUrl, '_blank');
      }
    },
    mounted() {
      // here you would make a request to your server to get the URL of the uploaded file from the database
      // for the sake of simplicity, I'm hardcoding the URL here
      this.fileUrl = "https://res.cloudinary.com/dpnjutbws/raw/upload/v1679602503/File%20up-loads/v1qdoytojcsejimtbvqr.pdf";
    }
  }
  </script>
  