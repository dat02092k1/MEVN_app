   <template>
    <div>
        <ul>
        <li class="post-item " v-for="post in state.posts" :key="post._id">
            <span>{{ post.title }}</span>
            <span>{{ post.content }}</span>
        </li>
      </ul>

      <div class="page-container">
        <div v-for="pageNumber in state.totalPages" :key="pageNumber">
          <button @click="fetchPosts(pageNumber)"
          :class="{ active: pageNumber === state.currentPage }">{{ pageNumber }}</button>
        </div>
      </div>
  
      
    </div>
  </template>
  
  <script>
  import { reactive } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const state = reactive({
        currentPage: 1,
        totalPages: 1,
        posts: []
      });
  
      async function fetchPosts(page) {
        try {
          const response = await axios.get(`https://mevnapp-server.up.railway.app/api/posts-pagination?page=${page}`); 
          console.log(response)
          state.currentPage = page;
          state.totalPages = response.data.totalPages;
          state.posts = response.data.posts;
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchPosts(state.currentPage);
  
      return {
        state,
        fetchPosts
      };
    }
  };
  </script>
  
  <style scoped>
  .page-container {
    display: flex;
  }

  .active {
  background-color: yellow;
}

  
</style>