<template>
  <div class="home">
    <todolist/>
  </div>
</template>

<script>
import Todolist from '@/components/TodoList.vue'

export default {
  name: 'Home',
  components: {
    Todolist
  }
}
</script>
