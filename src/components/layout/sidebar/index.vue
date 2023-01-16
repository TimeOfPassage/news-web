<script lang="ts" setup>
import { ref, reactive, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
const sidebarCollapse = ref(inject("sidebarCollapse"));
interface IMenuItem {
  id: number;
  name: string;
  icon: string;
  url?: string;
  children?: IMenuItem[];
}
const data = reactive<{
  defaultActiveId: number;
  menus: IMenuItem[];
}>({
  defaultActiveId: 0,
  menus: [
    {
      id: 0,
      name: "首页",
      icon: "House",
      url: "/home",
      children: [],
    },
    {
      id: 1,
      name: "系统管理",
      icon: "Setting",
      children: [
        {
          id: 11,
          name: "菜单管理",
          icon: "Operation",
          url: "/menus",
        },
        {
          id: 12,
          name: "角色管理",
          icon: "User",
          url: "/roles",
        },
        {
          id: 13,
          name: "用户管理",
          icon: "User",
          url: "/users",
        },
      ],
    },
    {
      id: 2,
      name: "文章管理",
      icon: "Document",
      url: "/documents",
      children: [
        {
          id: 21,
          name: "我的文章",
          icon: "Document",
          url: "/my_articles",
        },
        {
          id: 22,
          name: "草稿箱",
          icon: "DocumentRemove",
          url: "/drafts",
        },
      ],
    },
    {
      id: 3,
      name: "素材管理",
      icon: "Picture",
      children: [
        {
          id: 31,
          name: "素材分类",
          icon: "Guide",
          url: "/categories",
        },
        {
          id: 32,
          name: "素材信息",
          icon: "Picture",
          url: "/materials",
        },
      ],
    },
    {
      id: 4,
      name: "Demo",
      icon: "House",
      url: "/demo",
      children: [],
    },
  ],
});
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const router = useRouter();
const toPage = (menu: any) => {
  router.push(menu.url);
};
const filterId = (currentPath: number | string, menus: IMenuItem[]) => {
  if (currentPath == "/") {
    data.defaultActiveId = 0;
    return;
  }
  menus.map((m) => {
    if (m.url && m.url == currentPath) {
      data.defaultActiveId = m.id;
    } else {
      if (m.children && m.children.length > 0) {
        filterId(currentPath, m.children);
      }
    }
  });
};
onMounted(() => {
  filterId(router.currentRoute.value.path, data.menus);
});
</script>

<template>
  <div class="sidebar">
    <el-menu
      :default-active="data.defaultActiveId + ''"
      class="menu"
      @open="handleOpen"
      @close="handleClose"
      :collapse="sidebarCollapse"
    >
      <div class="logo">
        <img
          src="https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg"
        />
        <span v-show="!sidebarCollapse"> MIZAR SYSTEM</span>
      </div>
      <!-- 菜单 -->
      <template v-for="menu in data.menus" :key="menu.id">
        <el-sub-menu
          :index="menu.id + ''"
          v-if="menu.children != null && menu.children.length > 0"
        >
          <template #title>
            <el-icon>
              <Icon :icon="menu.icon"></Icon>
            </el-icon>
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item
            v-for="child in menu.children"
            :index="child.id + ''"
            :key="child.id"
            @click="toPage(child)"
          >
            <el-icon><Icon :icon="child.icon"></Icon></el-icon>
            <span>{{ child.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.id + ''" @click="toPage(menu)">
          <el-icon><Icon :icon="menu.icon"></Icon></el-icon>
          <span>{{ menu.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  box-shadow: 2px 0px 6px 0px rgba(0, 0, 0, 0.1);
  .menu {
    border-right: unset;
    .logo {
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      overflow: hidden;
      img {
        vertical-align: middle;
        margin-left: 6px;
        width: 32px;
        height: 32px;
        border-radius: 32px;
      }
      span {
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
  .menu:not(.el-menu--collapse) {
    width: 240px;
  }
}
</style>