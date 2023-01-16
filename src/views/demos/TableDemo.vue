<!-- <script setup>
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { ref, reactive, toRefs, onMounted } from "vue";
import configApi from "@/api/config/config";
const { formInline } = reactive({
  formInline: {},
});
const onSubmit = () => {};
const onReset = () => {};
const deleteRow = (row) => {
  console.log(row);
  debugger;
};
onMounted(() => {
  //console.log('组件挂载到页面之后执行-------onMounted')
  configApi
    .page({})
    .then((res) => {
      ElNotification({
        message: "请求成功",
      });
    })
    .catch((error) => {
      console.error(error);
      ElNotification({
        message: "请求失败",
      });
    });
});
const options = [
  {
    label: "日期",
    prop: "date",
    width: "180",
  },
  {
    label: "日期",
    prop: "date",
    width: "180",
  },
  {
    label: "日期",
    prop: "date",
    width: "180",
  },
  {
    label: "用户名",
    prop: "name",
    width: "180",
  },
  {
    label: "地址",
    prop: "address",
    width: "180",
  },
  {
    prop: "action",
  },
];
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<template>
  <!-- 搜索区域 -->
  <el-card class="box-card" shadow="never">
    <el-form :inline="true" :model="formInline" size="large">
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户名:">
            <el-input
              v-model="formInline.user"
              placeholder="输入用户名进行查询"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="选择区域">
            <el-select
              v-model="formInline.region"
              placeholder="选择区域进行过滤"
            >
              <el-option label="上海" value="shanghai" />
              <el-option label="北京" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户名:">
            <el-input
              v-model="formInline.user"
              placeholder="输入用户名进行查询"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="选择区域">
            <el-select
              v-model="formInline.region"
              placeholder="选择区域进行过滤"
            >
              <el-option label="上海" value="shanghai" />
              <el-option label="北京" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="end">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-card>
  <!-- 工具区域 -->
  <el-row style="margin: 15px 0px">
    <el-button type="primary" size="middle">
      <el-icon class="el-icon--left"><Edit /></el-icon> 新建
    </el-button>
    <el-button type="primary" size="middle">
      <el-icon class="el-icon--left"><Edit /></el-icon> 编辑
    </el-button>
    <el-button type="danger" size="middle">
      <el-icon class="el-icon--left"><Edit /></el-icon> 删除
    </el-button>
  </el-row>
  <!-- 表格内容区域 -->
  <el-container style="margin-top: 20px; background: white">
    <el-table :data="tableData" stripe style="width: 100%" size="large">
      <el-table-column
        v-for="option in options"
        :key="option.prop"
        :prop="option.prop"
        :label="option.prop == 'action' ? '操作' : option.label"
      >
        <template v-if="option.prop == 'action'" #default="scope">
          <el-space>
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="deleteRow(scope.row)"
            >
              [详情]
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="deleteRow(scope)"
            >
              [编辑]
            </el-button>
            <el-button
              link
              type="danger"
              size="small"
              @click.prevent="deleteRow(scope)"
            >
              [删除]
            </el-button>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
  <el-row justify="end" style="margin-top: 10px">
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </el-row>
</template>

<style scoped>
</style> -->