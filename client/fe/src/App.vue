<script setup>
import ListEmp from './components/ListEmp.vue'
import ShowPost from './components/ShowPost.vue'
import AssignTask from './components/AssignTask.vue'
import UploadExcel from './components/UploadExcel.vue'
import Mess from './components/Mess.vue'

// import { receiveNoti, receiveMessage, joinRoom } from "./socket";
import { onMounted } from 'vue'

// onMounted(() => {
//   receiveMessage(msg => alert('u have msg ' + msg));
//   let flag = sessionStorage.getItem("flag");
//             joinRoom(flag);
//   receiveNoti(noti => alert('post new: ' + noti));
// })
</script>

<template>
  <div>
   <!-- <Mess/> -->
   <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
