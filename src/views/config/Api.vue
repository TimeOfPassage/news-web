<template>
  <div class="red"> Api </div>
  <router-link to="/">Go to Home</router-link>
  <br>
  <router-link to="/login">Exit</router-link>
</template>
<script setup>
import { ref, reactive, toRefs, onMounted } from 'vue';
const data = reactive({})
onMounted(() => {
  //console.log('组件挂载到页面之后执行-------onMounted')

})
</script>
<style scoped>

</style>