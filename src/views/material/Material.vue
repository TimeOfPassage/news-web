<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import { apiPage, apiDelete, apiDownloadUrl, apiOuterDownloadUrl } from "@/api/material/materialApi";
import { apiCategories } from "@/api/material/categoryApi";
import UploadMaterial from "./UploadMaterial.vue";
import { time2format } from "@/utils/time";
const data = reactive({
  clientHeight: window.innerHeight - 150,
  content: [],
  page: 0,
  pageSize: 12,
  pages: 0,
  total: 0,
  categories: [],
  currentSelectCategoryId: null,
});
// 计算客户端高度
const load = () => {
  if (data.pages == 1) {
    return;
  }
  if (data.page < data.pages) {
    data.page += 1;
    findPictureList(true);
  }
};
// tab被选中出触发
const doTabClick = (pane, e) => {
  let currentId = data.currentSelectCategoryId;
  const label = pane.props.label;
  if (label == "默认") {
    data.currentSelectCategoryId = null;
  } else {
    if (data.categories) {
      data.categories.map((category) => {
        if (category.name == label) {
          data.currentSelectCategoryId = category.id;
        }
      });
    }
  }
  // 说明切换tab了
  if (currentId != data.currentSelectCategoryId) {
    data.page = 0;
    findPictureList();
  }
};
// copy event
const doCopySuccess = (e) => {
  ElMessage.success("图片访问链接已复制到剪贴板");
};
const doCopyError = (e) => {
  ElMessage.error("复制失败，请重试");
};
// 删除图片
const doDelete = (id) => {
  apiDelete(id)
    .then((res) => {
      if (res.success) {
        ElMessage.success("图片删除成功");
        findPictureList();
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((error) => {
      console.error(error);
      ElMessage.error("服务繁忙，请稍后再试");
    });
};
// 打开右侧上传抽屉
const drawerSwitch = ref(false);
const openUploadDrawer = () => {
  drawerSwitch.value = true;
};
// 关闭上传抽屉
const closeUploadDrawer = (flag) => {
  if (flag == 1) {
    // invoke refresh api
    findPictureList();
  }
  drawerSwitch.value = false;
};
const fetchAllCategories = () => {
  apiCategories()
    .then((res) => {
      if (res.success) {
        data.categories.push({
          id: null,
          name: "全部",
        });
        if (res.data) {
          res.data.map((category) => {
            data.categories.push(category);
          });
        }
        data.currentSelectCategoryId = data.categories[0].id;
        findPictureList();
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((error) => {
      console.error(error);
      ElMessage.error("服务繁忙，请稍后再试");
    });
};
const findPictureList = (isLoadMore = false) => {
  apiPage({
      page: data.page,
      pageSize: data.pageSize,
      categoryId: data.currentSelectCategoryId,
    })
    .then((res) => {
      if (res.success) {
        if (isLoadMore) {
          data.content = [...data.content, ...res.data.content];
        } else {
          data.content = res.data.content;
        }
        data.pages = res.data.pages;
        data.total = res.data.total;
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((error) => {
      console.error(error);
      ElMessage.error("服务繁忙，请稍后再试");
    });
};
const isMounted = ref(false);
onMounted(() => {
  fetchAllCategories();
  isMounted.value = true;
  // 窗口大小变化
  window.onresize = () => {
    data.clientHeight = window.innerHeight - 150;
  };
});
</script>

<template>
  <div :style="{ height: data.clientHeight }">
    <!-- 工具区域 -->
    <el-row style="margin-bottom: 10px">
      <el-button type="primary" @click="openUploadDrawer">
        <el-icon class="el-icon--left"><Icon icon="Upload" /></el-icon> 上传素材
      </el-button>
    </el-row>
    <!-- 图片显示区域 -->
    <el-tabs tab-position="left" @tab-click="doTabClick">
      <el-tab-pane
        v-for="category in data.categories"
        :key="category.id"
        :label="category.name"
        :category-id="category.id"
        v-if="isMounted"
      >
        <el-row
          v-if="data.content.length > 0"
          v-infinite-scroll="load"
          :style="{ height: data.clientHeight - 20 + 'px', overflow: 'auto' }"
        >
          <el-col
            v-for="item in data.content"
            :key="item.id"
            :span="6"
            style="padding-top: 10px; padding-right: 10px"
          >
            <el-card
              :body-style="{
                padding: '0px',
                width: '100%',
                height: '240px',
                display: 'flex',
                flexDirection: 'column',
              }"
            >
              <el-image :src="apiDownloadUrl(item.id)" fit="cover" />
              <div style="padding: 10px">
                <span> {{ item.fileName }}</span>
                <div style="padding-top: 10px">
                  <time style="font-size: 12px; color: #a3a3a3">
                    {{ time2format(item.createTime) }}
                  </time>
                </div>
                <div style="padding-top: 10px; text-align: left">
                  <el-button
                    link
                    type="primary"
                    v-clipboard:copy="apiOuterDownloadUrl(item.id)"
                    v-clipboard:success="doCopySuccess"
                    v-clipboard:error="doCopyError"
                  >
                    复制
                  </el-button>
                  <el-button link type="danger" @click="doDelete(item.id)">
                    移除
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- 图片空状态 -->
        <el-empty v-else description="当前分类下空空如也" />
      </el-tab-pane>
    </el-tabs>
    <UploadMaterial
      :drawerSwitch="drawerSwitch"
      :categoryId="data.currentSelectCategoryId"
      @closeUploadDrawer="closeUploadDrawer"
    />
  </div>
</template>

<style scoped>
</style>