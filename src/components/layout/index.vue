<script setup>
import { ref, provide } from "vue";
const sidebarCollapse = ref(false);
// ↓提供给sidebar注入
provide("sidebarCollapse", sidebarCollapse);
const updateSidebarCollapse = (val) => {
  sidebarCollapse.value = val;
};
let clientHeight = window.innerHeight - 50 - 35 + "px";
window.onresize = function temp() {
  clientHeight = window.innerHeight - 50 - 35 + "px";
};
</script>

<template>
  <el-container>
    <Sidebar />
    <el-container>
      <el-header height="50px">
        <Header
          :sidebarCollapse="sidebarCollapse"
          @updateSidebarCollapse="updateSidebarCollapse"
        />
      </el-header>
      <el-scrollbar :max-height="clientHeight" style="width: 100%">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-scrollbar>
      <Footer />
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
</style>