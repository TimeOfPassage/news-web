<script setup>
import { apiDetail } from "@/api/document/articleApi";
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
const data = reactive({
  article: {
    title: "",
    content: "",
  },
});
const router = useRouter();
onMounted(() => {
  // 获取ID
  const articleId = router.currentRoute.value.query["id"];
  apiDetail(articleId)
    .then((res) => {
      //   console.log(res);
      if (res.success) {
        data.article.title = res.data.title;
        data.article.content = JSON.parse(res.data.content);
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((err) => {
      ElMessage.error("服务繁忙，请稍后再试");
    });
});
</script>

<template>
  <el-row justify="center">
    <h1>{{ data.article.title }}</h1>
  </el-row>
  <el-row justify="end">
    <el-col :span="2" style="color: #999">作者: <span>admin</span></el-col>
    <el-col :span="4" style="color: #999"
      >创建时间: <span>2022-11-20 12:20:30</span>
    </el-col>
  </el-row>
  <el-divider />
  <div class="editor-render">
    <template v-for="block in data.article.content.blocks" :key="block.id">
      <!-- 段落解析 -->
      <div v-if="block.type == 'paragraph'">
        <p v-html="block.data.text"></p>
      </div>
      <!-- 引用解析 -->
      <div
        v-if="block.type == 'quote'"
        style="
          border: 1px solid #eee;
          border-left: 5px solid black;
          min-height: 80px;
          padding: 10px;
          background: #eee;
          position: relative;
        "
      >
        <p style="padding-bottom: 10px">
          {{ block.data.text }}
        </p>
        <br />
        <div
          style="
            position: absolute;
            right: 10px;
            bottom: 5px;
            color: rgba(0, 0, 0, 0.6);
            font-size: 10px;
          "
        >
          -- {{ block.data.caption }}
        </div>
      </div>
      <!-- 分割解析 -->
      <div
        v-if="block.type == 'delimiter'"
        style="text-align: center; padding: 30px 0px"
      >
        <el-icon><Icon icon="StarFilled" /></el-icon>
        <el-icon><Icon icon="StarFilled" /></el-icon>
        <el-icon><Icon icon="StarFilled" /></el-icon>
      </div>
      <!-- 警告解析 -->
      <div v-if="block.type == 'warning'">
        <el-alert
          :title="block.data.title"
          :description="block.data.message"
          type="warning"
          show-icon
          :closable="false"
          style="padding-left: 5px"
        />
      </div>
      <!-- header解析 -->
      <div v-if="block.type == 'header'">
        <h1 v-if="block.data.level == 1">{{ block.data.text }}</h1>
        <h2 v-if="block.data.level == 2">{{ block.data.text }}</h2>
        <h3 v-if="block.data.level == 3">{{ block.data.text }}</h3>
        <h4 v-if="block.data.level == 4">{{ block.data.text }}</h4>
        <h5 v-if="block.data.level == 5">{{ block.data.text }}</h5>
        <h6 v-if="block.data.level == 6">{{ block.data.text }}</h6>
      </div>
      <!-- 列表解析 -->
      <div v-if="block.type == 'list'">
        <ol v-if="block.data.style == 'ordered'" style="padding-left: 40px">
          <li v-for="(item, idx) in block.data.items" :key="idx">
            {{ item }}
          </li>
        </ol>
      </div>
      <!-- 链接解析 -->
      <!-- <p v-if="block.type == 'paragraph'" style="margin: 10px 0px">
        {{ block.data.text }}
      </p> -->
      <!-- 图像解析 -->
      <div
        v-if="block.type == 'image'"
        :style="{
          background: block.data.withBackground ? '#ccc' : 'none',
          display: block.data.withBackground ? 'flex' : 'block',
          justifyContent: block.data.withBackground ? 'center' : 'none',
          alignItems: block.data.withBackground ? 'center' : 'none',
        }"
      >
        <el-image
          :style="{
            boxSizing: block.data.withBorder ? 'border-box' : 'content-box',
            border: block.data.withBorder ? '5px solid #eee' : 'none',
            width: block.data.stretched ? '100%' : '300px',
            height: block.data.stretched ? '400px' : 'auto',
          }"
          v-if="block.type == 'image'"
          :src="block.data.file.url"
          :alt="block.data.caption"
        />
      </div>
    </template>
  </div>
  <!-- {{ data.article.content }} -->
</template>

<style lang="scss" scoped>
.editor-render {
  width: 68%;
  height: 100%;
  /* background: lightgray; */
  margin: 0px auto;
  div {
    padding: 10px 0px;
  }
//   &::mark {
//     background-color: yellow;
//   }
//   &::code {
//     background-color: orange;
//     color: pink;
//     font-weight: 400;
//   }
}
</style>