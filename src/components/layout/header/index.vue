<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
// 接受传入属性
const props = defineProps({
  sidebarCollapse: {
    type: Boolean,
  },
});
// 用户基础信息
const { userInfo } = reactive({
  userInfo: {
    baseInfo: {
      avatar: "https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg",
    },
  },
});
// 切换侧边栏状态
const emit = defineEmits(["updateSidebarCollapse"]);
const toggle = () => {
  emit("updateSidebarCollapse", !props.sidebarCollapse);
};
// 退出
const router = useRouter();
const signout = () => {
  router.replace({ path: "/login" });
};
</script>

<template>
  <div class="header">
    <div class="fold-icon" @click="toggle">
      <el-icon v-if="!props.sidebarCollapse" :size="24" color="#909399">
        <Icon icon="Fold" />
      </el-icon>
      <el-icon v-else :size="24" color="#909399">
        <Icon icon="Expand" />
      </el-icon>
    </div>
    <el-dropdown trigger="click">
      <div class="avatar">
        <el-avatar :src="userInfo.baseInfo.avatar"></el-avatar>
        <el-icon>
          <Icon icon="CaretBottom" />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon><Icon icon="User" /></el-icon>个人中心
          </el-dropdown-item>
          <el-dropdown-item divided @click="signout">
            <el-icon><Icon icon="Right" /></el-icon> 用户登出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  box-shadow: 3px 1px 4px 0px rgba(0, 0, 0, 0.1);
  .fold-icon {
    padding: 11px 13px;
  }
  .avatar {
    padding: 5px;
    margin-right: 20px;
    display: inline-flex;
    align-items: center;
    .el-avatar {
      margin-right: 5px;
    }
  }
  .fold-icon:hover,
  .avatar:hover {
    cursor: pointer;
    background: #f7f7f7;
  }
}
</style>