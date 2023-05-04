<template>
  <div class="" style="display: flex;">
    <input type="file" @change="onFileChange" multiple>
    <input type="text" v-model="title">
    <input type="text" v-model="content">
    <button @click="uploadPost">Upload Post</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      files: [],
      title: '',
      content: '',
    };
  },
  methods: {
    onFileChange(event) {
      this.files = event.target.files;
    },
    uploadPost() {
      if (this.files.length === 0) {
        alert('Please select at least one file.');
        return;
      }

      if (this.files.length > 3) {
        alert('You can only upload up to 3 files.');
        return;
      }

      let formData = new FormData();
      const id = '64232ec246b02f163b8524cc';

      for (let i = 0; i < this.files.length; i++) {
        formData.append('docs', this.files[i]);
      }
      formData.append('docs', this.file);
      formData.append('title', this.title);
      formData.append('content', this.content);
      formData.append('poster', id);
      axios.post('http://localhost:2000/api/upload-docs', formData)
        .then(response => {
          // handle success response
          console.log(response.data);
        })
        .catch(error => {
          // handle error response
          console.log(error.response.data);
        });
    },
  },
};
</script>
