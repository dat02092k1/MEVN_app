<template>
    <div>
        <h1>GET POST</h1>
        <h2>
            {{ this.post.title }}
        </h2>
        <p>{{ this.post.content }}</p>
        <div class="post-img">
            <img :src="this.post.imageUrl" alt="post image">
        </div>
      <!-- <h2>{{ post.title }}</h2>
      <p>{{ this.post.content }}</p>
      <img :src="post.imageUrl" alt="post image"> -->
    </div>
  </template>
  
  <script>
  import {axiosIns} from '../api/api';  
  // import socket from "../socket";
  // import { sendNoti } from "../socket";
  export default {
    name: 'PostDetail',
    data() {
      return {
        post: [],
        socket: ''
      }
    },
    mounted() {
      // Lấy dữ liệu bài viết từ API
      this.fetchPost();
      
    },
    methods: {
      async fetchPost() {
        const postId = "641132ce39d48d897e424654";

        const token = '8b2ztn3x93x';
        const refreshToken = '38n3cnbd8'; 
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

        const response = await axiosIns.get(`post/${postId}`);
         console.log(response);
        this.post = response.data.post;
        console.log(this.post.title);
      }
    }
  }
  </script>
  
  <style scoped>
  .post-img img {
    height: 300px;
    width: 400px;
  }
</style>