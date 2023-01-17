<script setup>
import { ref, reactive, onMounted } from "vue";
import { apiDetail } from "@/api/document/articleApi";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor } from "@wangeditor/editor-for-vue";
const data = reactive({
  title: "",
  contentHtml: "",
});
const router = useRouter();
onMounted(() => {
  // console.log(router.currentRoute.value.query.id);
  apiDetail(router.currentRoute.value.query.id)
    .then((res) => {
      data.title = res.data.title;
      data.contentHtml = res.data.contentHtml;
    })
    .catch((error) => ElMessage.error("服务开小差了,请稍后再试"));
});
const doBack = () => {
  router.back();
}
</script>

<template>
  <div class="content">
    <div class="editor-container">
      <div class="title-container">
        <h1>{{ data.title }}</h1>
      </div>
      <Editor
        class="editor-text-area"
        v-model="data.contentHtml"
        :defaultConfig="{
          readOnly: true,
        }"
        mode="default"
      />
    </div>
    <el-row justify="end" style="padding-right: 40px">
      <el-col :span="1">
        <el-affix target=".content" position="bottom" :offset="40">
          <el-button type="info" size="small" @click="doBack"> 返回上一级 </el-button>
        </el-affix>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.content {
  height: 100%;
  /* background-color: rgb(245, 245, 245); */
  overflow-y: auto;
  position: relative;
  padding: 0;
  margin: 0;
}

.editor-container {
  width: 850px;
  margin: 30px auto;
  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}

.title-container {
  border-bottom: 1px solid #e8e8e8;
}

.title-container input {
  font-size: 30px;
  border: 0;
  outline: none;
  width: 100%;
  line-height: 1;
}

.editor-text-area {
  min-height: 800px;
  margin-top: 20px;
}
</style>