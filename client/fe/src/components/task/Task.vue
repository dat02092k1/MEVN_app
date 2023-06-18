<template>
    <div>
      <h1>Add Task</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="task">Task</label>
          <input type="text" id="task" v-model="task" required>
        </div>
        <div>
          <label for="description">Description</label>
          <textarea id="description" v-model="description"></textarea>
        </div>
        <div>
          <label for="assignedStudents">Assigned Students</label>
          <select id="assignedStudents" v-model="assignedStudents" multiple required>
            <option v-for="student in students" :key="student._id" :value="student._id">{{ student.name }}</option>
          </select>
        </div>
        <div>
          <label for="duration">Deadline</label>
          <input type="date" id="duration" v-model="duration" required>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
import axios from 'axios';
  export default {
    data() {
      return {
        task: '',
        description: '',
        assignedStudents: [],
        students: [], // List of available students
        duration: null
      };
    },
    mounted() {
      // Retrieve list of students from API
      this.fetchStudents();
    },
    methods: {
      async fetchStudents() {
        try {
          const response = await axios.get('http://localhost:2000/user/getAll');
          console.log(response.data.data);
          this.students = response.data.data;
        } catch (error) {
          console.log(error);
        }
      },
      async submitForm() {
        try {
          const response = await fetch('https://mevnapp-server.up.railway.app/user/assign-task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              task: this.task,
              description: this.description,
              assignedStudents: this.assignedStudents.map(studentId => ({
                student: studentId,
                isCompleted: false
              })),
              duration: new Date(this.duration)
            })
          });
          const data = await response.json();
          console.log(data);
          // Clear form fields after successful submission
          this.task = '';
          this.description = '';
          this.assignedStudents = [];
          this.duration = null;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  