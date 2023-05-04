import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

const app = createApp(App);
app.use(router)
app.use(createPinia());

app.config.globalProperties.$socket = socket; // Add socket instance to the global properties

app.mount('#app');
