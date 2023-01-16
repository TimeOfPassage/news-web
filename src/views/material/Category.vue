<script setup>
import { Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import { apiPage, apiDelete } from "@/api/material/categoryApi";
import { time2format } from "@/utils/time";
import CategoryEdit from "./CategoryEdit.vue";
const data = reactive({
  form: {},
  content: [],
  page: 0,
  pageSize: 10,
  pages: 0,
  total: 0,
});
const onSubmit = () => {
  findList();
};
const onReset = () => {
  data.form.name = "";
  findList();
};
const deleteRow = (row) => {
  apiDelete(row.id)
    .then((res) => {
      if (res.success) {
        findList();
        ElMessage.info("删除成功");
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((error) => {
      ElMessage.error("服务繁忙，请稍后再试");
    });
};
// 新增 or 编辑 显示开关
const visible = ref(false);
const editForm = ref(null);
const editRow = (row) => {
  editForm.value = row;
  visible.value = true;
};
// 添加新Item
const addNew = () => {
  editForm.value = null;
  visible.value = true;
};
// 关闭新增or编辑框事件
const closeDialog = (flag) => {
  if (flag == 1) {
    findList();
  }
  visible.value = false;
};
// 分页事件
const doPageChange = (value) => {
  data.page = value - 1;
  findList();
};
// 初始化
onMounted(() => {
  findList();
});
// 获取所有数据
const findList = () => {
  apiPage({
    page: data.page,
    pageSize: data.pageSize,
    name: data.form.name,
  })
    .then((res) => {
      // console.log(res);
      if (res.success) {
        data.tableData = res.data.content;
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
const options = [
  {
    label: "序号",
    prop: "id",
  },
  {
    label: "名称",
    prop: "name",
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
  {
    prop: "action",
  },
];
</script>

<template>
  <!-- 搜索区域 -->
  <el-card class="box-card" shadow="never">
    <el-form :inline="true" :model="data.form">
      <el-row>
        <el-col :span="6">
          <el-form-item label="名称:">
            <el-input
              v-model.trim="data.form.name"
              placeholder="输入分类名称进行查询"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <!-- 工具区域 -->
  <el-row style="margin-top: 15px">
    <el-button type="primary" @click="addNew">
      <el-icon class="el-icon--left"><Edit /></el-icon> 新建分类
    </el-button>
  </el-row>
  <!-- 表格内容区域 -->
  <el-container style="margin-top: 15px">
    <el-table
      :data="data.tableData"
      empty-text="暂无数据"
      stripe
      style="width: 100%"
      size="large"
    >
      <el-table-column
        v-for="option in options"
        :key="option.prop"
        :prop="option.prop"
        :label="option.prop == 'action' ? '操作' : option.label"
      >
        <template #default="scope">
          <template v-if="option.prop == 'id'">
            {{ scope.$index + 1 }}
          </template>
          <template v-if="option.prop == 'createTime'">
            {{ time2format(scope.row.createTime) }}
          </template>
          <el-space v-if="option.prop == 'action'">
            <el-button link type="primary" @click.prevent="editRow(scope.row)">
              [编辑]
            </el-button>
            <el-button link type="danger" @click.prevent="deleteRow(scope.row)">
              [删除]
            </el-button>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
  <el-row justify="end" style="margin-top: 10px">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="data.total"
      @current-change="doPageChange"
    />
  </el-row>
  <!-- 添加 or 编辑 -->
  <CategoryEdit
    :visible="visible"
    :editForm="editForm"
    @closeDialog="closeDialog"
  />
</template>

<style scoped>
</style>