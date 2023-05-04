<template>
  <div>
    <div v-if="!connected">Connecting...</div>
    <div v-else>
      <div v-for="(message, index) in messages" :key="index">
        {{ message.content }}
      </div>
      <form @submit.prevent="sendMessage">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import socket from "../socket";
import { joinRoom, leaveRoom, sendMessage, receiveMessage } from "../socket";

import { ref, watchEffect } from "vue";

export default {
  data() {
    return {
      socket: socket,
      connected: false,
      messages: [],
      newMessage: "",
    };
  },

  mounted() {
    this.socket.on("connect", () => {
      this.connected = true;
    });

    this.socket.on("disconnect", () => {
      this.connected = false;
    });

    receiveMessage((msg) => {
        this.messages.push(msg)
    });

    
  },
  computed: {
    latestMessage() {
      return this.messages[this.messages.length - 1];
    },
  },
  methods: {
    sendMessage() {
      if (this.newMessage !== "") {
        console.log(this.newMessage);
        sendMessage({
            content: this.newMessage
        });
        this.newMessage = "";
      }
    },

    joinRoom(roomId) {
        joinRoom(roomId);
    },

    leaveRoom(roomId) {
        leaveRoom(roomId);
    },
  } 

};
</script>
