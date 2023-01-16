<script setup>
import { ElMessage } from "element-plus";
import { reactive } from "vue";
import { apiAdd, apiModify } from "../../api/material/categoryApi";
// 接受属性
const props = defineProps(["visible", "editForm"]);
// 接受事件
const emit = defineEmits(["closeDialog"]);
// cancelVisible事件
const cancelVisible = (flag) => {
  emit("closeDialog", flag);
};
// confirmCategory
const confirmCategory = () => {
  if (props.editForm) {
    apiModify({
      id: props.editForm.id,
      name: data.form.name,
    })
      .then((res) => {
        if (res.success) {
          cancelVisible(1);
        } else {
          ElMessage.error(res.message);
        }
      })
      .catch((error) => {
        ElMessage.error("服务繁忙，请稍后再试");
      });
  } else {
    apiAdd({
      name: data.form.name,
    })
      .then((res) => {
        if (res.success) {
          cancelVisible(1);
        } else {
          ElMessage.error(res.message);
        }
      })
      .catch((error) => {
        ElMessage.error("服务繁忙，请稍后再试");
      });
  }
};
const resetForm = () => {
  data.form.name = "";
};
const doOpen = () => {
  if (props.editForm) {
    data.form.name = props.editForm.name;
  } else {
    resetForm();
  }
};
const data = reactive({
  form: {
    name: "",
  },
});
</script>

<template>
  <el-dialog
    :model-value="props.visible"
    :title="props.editForm ? '编辑分类' : '新增分类'"
    width="480"
    @open="doOpen"
  >
    <el-form :model="data.form">
      <el-form-item label="分类名称" :label-width="80">
        <el-input v-model="data.form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelVisible(0)">取消</el-button>
        <el-button type="primary" @click="confirmCategory"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>