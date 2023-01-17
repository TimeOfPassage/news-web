<script setup>
import { Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { apiPage, apiDelete } from "@/api/document/articleApi";
import { time2format } from "@/utils/time";
const data = reactive({
  // 查询表单参数
  form: {
    title: "",
  },
  // 查询结果
  content: [],
  // 页码
  page: 0,
  // 每页查询条数
  pageSize: 10,
  // 总页数
  pages: 0,
  // 总条数
  total: 0,
});
const router = useRouter();
// 分页事件
const doPageChange = (value) => {
  data.page = value - 1;
  findRowList();
};
// 重置查询条件并在此查询
const onReset = () => {
  data.form.title = "";
  findRowList();
};
// 删除
const deleteRow = (row) => {
  apiDelete(row.id)
    .then((res) => {
      if (res.success) {
        findRowList();
        ElMessage.success("删除成功");
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((error) => {
      ElMessage.error("服务繁忙，请稍后再试");
    });
};
// 新增
const addRow = () => {
  router.push({ name: "NewArticle" });
};
// 详情页面
const toDetail = (row) => {
  router.push({
    name: "ArticleDetail",
    query: {
      id: row.id,
    },
  });
};
// 编辑
const editRow = (row) => {};
// 查询
const findRowList = () => {
  apiPage({
    page: data.page,
    pageSize: data.pageSize,
    name: data.form.name,
  })
    .then((res) => {
      // console.log(res);
      if (res.success) {
        data.content = res.data.content;
        data.pages = res.data.pages;
        data.total = res.data.total;
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((err) => {
      ElMessage.error("服务繁忙，请稍后再试");
    });
};
// 表格col配置
const options = [
  {
    label: "序号",
    prop: "id",
  },
  {
    label: "文章标题",
    prop: "title",
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
  {
    label: "操作",
    prop: "action",
  },
];
// 页面初始化
onMounted(() => {
  findRowList();
});
</script>

<template>
  <!-- 搜索区域 -->
  <el-card shadow="never">
    <el-form :inline="true" :model="data.form">
      <el-row>
        <el-col :span="6">
          <el-form-item label="标题:">
            <el-input
              v-model.trim="data.form.title"
              placeholder="输入文章标题进行查询"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="findRowList">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <!-- 工具区域 -->
  <el-row>
    <el-button type="primary" @click="addRow">
      <el-icon class="el-icon--left"><Edit /></el-icon> 新建文章
    </el-button>
  </el-row>
  <!-- 表格内容区域 -->
  <el-row>
    <el-container>
      <el-table :data="data.content" empty-text="暂无数据" stripe>
        <el-table-column
          v-for="option in options"
          :key="option.prop"
          :prop="option.prop"
          :label="option.label"
        >
          <template #default="scope">
            <template v-if="option.prop == 'id'">
              {{ scope.$index + 1 }}
            </template>
            <template v-if="option.prop == 'title'">
              <a
                @click.prevent="toDetail(scope.row)"
                style="cursor: pointer; text-decoration: underline; color: blue"
              >
                {{ scope.row.title }}
              </a>
            </template>
            <template v-if="option.prop == 'createTime'">
              {{ time2format(scope.row.createTime) }}
            </template>
            <el-space v-if="option.prop == 'action'">
              <el-button
                link
                type="primary"
                @click.prevent="editRow(scope.row)"
              >
                [编辑]
              </el-button>
              <el-button
                link
                type="danger"
                @click.prevent="deleteRow(scope.row)"
              >
                [删除]
              </el-button>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </el-row>
  <el-row justify="center">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="data.total"
      @current-change="doPageChange"
    />
  </el-row>
</template>

<style scoped>
.el-row {
  margin-top: 15px;
}
</style>