<script setup>
import { apiUploadUrl } from "@/api/material/materialApi";
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
const props = defineProps(["drawerSwitch", "categoryId"]);
const data = reactive({
  token: localStorage.getItem("token"),
});
// handle event
const emit = defineEmits(["closeUploadDrawer"]);
const cancelClick = () => {
  emit("closeUploadDrawer", 0);
  // 清除
  uploadRef.value.clearFiles();
};
const currentUploadCount = ref(0);
const uploadRef = ref();
const startUpload = () => {
  // 获取一共本次上传张数
  uploadRef.value.submit();
};
// 添加文件会回调，可以计算本次上传数量
const doUploadChange = (uploadFile, uploadFiles) => {
  if (uploadFile.status == "ready") {
    currentUploadCount.value += 1;
  }
};
// 计算次数
const doUploadSuccess = (res, uploadFile, uploadFiles) => {
  currentUploadCount.value -= 1;
  if (!res.success) {
    for (const i in uploadFiles) {
      if (uploadFile == uploadFiles[i]) {
        uploadFiles[i].status = "fail";
        break;
      }
    }
    ElMessage.error(uploadFile.name + "上传失败!");
  }
  if (currentUploadCount.value <= 0) {
    // 清除
    uploadRef.value.clearFiles();
    emit("closeUploadDrawer", 1);
  }
};
onMounted(() => {});
</script>

<template>
  <el-drawer
    :model-value="props.drawerSwitch"
    :close-on-click-modal="false"
    direction="rtl"
    :show-close="false"
  >
    <template #header>
      <h4>素材上传</h4>
    </template>
    <template #default>
      <el-upload
        ref="uploadRef"
        drag
        :action="apiUploadUrl()"
        multiple
        :limit="5"
        list-type="picture"
        :auto-upload="false"
        accept=".jpg,.png,.jpeg"
        :data="{
          categoryId: props.categoryId,
        }"
        :headers="{
          Authorization: data.token,
        }"
        :on-change="doUploadChange"
        :on-success="doUploadSuccess"
      >
        <el-icon class="el-icon--upload"><Icon icon="UploadFilled" /></el-icon>
        <div class="el-upload__text">拖拽文件至这里 或 <em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip" style="color: red">
            只支持上传jpg/png类型文件, 最大一次上传五张, 并且文件大小需小于500kb
          </div>
        </template>
      </el-upload>
    </template>
    <template #footer>
      <div style="flex: auto; text-align: left">
        <el-button @click="cancelClick">关闭</el-button>
        <el-button type="primary" @click="startUpload">开始上传</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped>
</style>