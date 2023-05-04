<template>
    <div>
      <form>
        <input name="excelFile" type="file" @change="handleFileUpload" accept=".xlsx,.xls,.csv">
        <button type="button" @click="uploadFile">Upload</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import moment from 'moment-timezone';

  export default {
    name: 'UploadExcel',
    data() {
      return {
        selectedFile: null
      }
    },
    methods: {
      handleFileUpload(event) {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile)
      },
      uploadFile() {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
  
        axios.post('http://localhost:2000/api/import', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    mounted() {
      const dtStr = "2002-05-20T17:00:00.000+00:00";
const dtUtc = moment.utc(dtStr).toDate();
const tzVn = 'Asia/Ho_Chi_Minh';
const dtVn = moment.tz(dtUtc, tzVn);

console.log(dtVn.format('DD/MM/YYYY'));


    }
  }
  </script>
  