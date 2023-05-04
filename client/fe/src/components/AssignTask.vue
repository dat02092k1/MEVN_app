<template>
    <div>
      <h2>Group Members</h2>
      <ul>
        <li>
          <input type="checkbox" v-model="selectAll"> Select All
        </li>
        <li v-for="(member, index) in members" :key="index">
          <input type="checkbox" :value="member" v-model="selectedMembers"> {{ member.name }} - {{ member.email }}
        </li>
      </ul>
      <div>
        <button type="button" @click="addToGroup">Add to Group</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { axiosIns } from '../api/api.js';

  export default {
    data() {
      return {
        members: [
          { name: 'John', email: 'john@example.com' },
          { name: 'Jane', email: 'jane' },
          { name: 'Bob', email: 'bob@example.com' },
          { name: 'Alice', email: 'alice@example.com' },
        ],
        selectAll: false,
        selectedMembers: [],
      };
    },
    watch: {
      selectAll(value) {
        if (value) {
          this.selectedMembers = [...this.members];
        } else {
          this.selectedMembers = [];
        }
      }
    },
    methods: {
      addToGroup() {
        console.log(this.selectedMembers);
        // do something with the response
      }
    }
  }
  </script>
  