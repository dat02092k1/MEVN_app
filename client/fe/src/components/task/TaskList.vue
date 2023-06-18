<template>
    <div>
      <div v-for="(task, index) in tasks" :key="index">
        <h1>{{ task.task }}</h1>
        <p>{{ task.description }}</p>
        <div>
          Time remaining: {{ formatTime(getTimeRemaining(task)) }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tasks: [],
        intervalIds: []
      }
    },
    async mounted() {
      const res = await axios.get('https://mevnapp-server.up.railway.app/user/view-task');
      this.tasks = res.data.tasks;
  
      this.tasks.forEach((task) => {
        const timeRemaining = this.getTimeRemaining(task);
        this.intervalIds.push(setInterval(() => {
          this.updateTimeRemaining(task);
        }, 1000));
      });
    },
    beforeUnmount() {
      this.intervalIds.forEach((id) => {
        clearInterval(id);
      });
    },
    methods: {
      getTimeRemaining(task) {
        const now = new Date();
        const duration = new Date(task.duration);
        const timeRemaining = duration.getTime() - now.getTime();
        return Math.max(0, timeRemaining);
      },
      updateTimeRemaining(task) {
        this.timeRemaining = this.getTimeRemaining(task);
        const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
        this.tasks[taskIndex].timeRemaining = this.getTimeRemaining(task);
      },
      formatTime(time) {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return `${days}d ${hours}h`;
      }
    }
  };
</script>  