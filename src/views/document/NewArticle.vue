<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, reactive, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { ElMessage } from "element-plus";
import { apiAdd, apiModify, apiDetail } from "@/api/document/articleApi";
import { useRouter } from "vue-router";
export default {
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    const data = reactive({
      mode: "default", // 或 'simple'
      articleId: undefined,
      article: {
        title: "",
        contentHtml: "<p></p>",
        contentJson: {},
      },
    });

    const toolbarConfig = {};

    toolbarConfig.excludeKeys = ["undo", "redo"];

    const editorConfig = {
      placeholder: "请在这里开始写下你的故事...",
    };
    const router = useRouter();
    //
    onMounted(() => {
      // 获取文章详情，如果存在id，则是编辑模式
      const id = router.currentRoute.value.query.id;
      if (id) {
        apiDetail(id)
          .then((res) => {
            data.article.title = res.data.title;
            data.article.contentHtml = res.data.contentHtml;
            data.article.contentJson = res.data.contentJson;
            data.articleId = id;
          })
          .catch((error) => ElMessage.error("服务开小差了,请稍后再试"));
      }
    });

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    const doBack = () => {
      router.back();
    };
    // 新增 or 更新
    const doSave = () => {
      // console.log(editorRef);
      const _contentJson = editorRef.value.children;
      const _contentHtml = editorRef.value.getHtml();
      // debugger
      if (data.articleId) {
        apiModify({
          id: data.articleId,
          title: data.article.title,
          content: JSON.stringify(_contentJson),
          contentHtml: _contentHtml,
        })
          .then((res) => {
            if (res.success) {
              ElMessage.success("修改文章成功");
              router.back();
            } else {
              ElMessage.error(res.message);
            }
          })
          .catch((err) => ElMessage.error("服务器繁忙，请稍后再试"));
      } else {
        apiAdd({
          title: data.article.title,
          content: JSON.stringify(_contentJson),
          contentHtml: _contentHtml,
        })
          .then((res) => {
            if (res.success) {
              ElMessage.success("新增文章成功");
              router.back();
            } else {
              ElMessage.error(res.message);
            }
          })
          .catch((err) => ElMessage.error("服务器繁忙，请稍后再试"));
      }
    };

    return {
      editorRef,
      toolbarConfig,
      editorConfig,
      handleCreated,
      doSave,
      doBack,
      data,
    };
  },
};
</script>

<template>
  <div>
    <Toolbar
      class="editor-toolbar"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="data.mode"
    />
  </div>
  <div class="content">
    <div class="editor-container">
      <div class="title-container">
        <input
          placeholder="请在这里输入故事名字"
          v-model="data.article.title"
        />
      </div>
      <Editor
        class="editor-text-area"
        v-model="data.article.contentHtml"
        :defaultConfig="editorConfig"
        :mode="data.mode"
        @onCreated="handleCreated"
      />
      <el-row justify="end" style="padding-right: 40px">
        <el-col :span="1">
          <el-affix target=".content" position="bottom" :offset="100">
            <el-button type="info" size="small" @click="doBack">
              返回
            </el-button>
          </el-affix>
          <el-affix target=".content" position="bottom" :offset="70">
            <el-button type="primary" size="small"> 预览 </el-button>
          </el-affix>
          <el-affix target=".content" position="bottom" :offset="40">
            <el-button type="danger" size="small" @click="doSave">
              保存
            </el-button>
          </el-affix>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.editor-toolbar {
  /* width: 100%; */
  background-color: #fcfcfc;
  margin: 0 auto;
}

.content {
  height: calc(100% - 40px);
  background-color: rgb(245, 245, 245);
  overflow-y: auto;
  position: relative;
}

.editor-container {
  width: 850px;
  margin: 30px auto 150px auto;
  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}

.title-container {
  padding: 20px 0;
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
  min-height: 900px;
  margin-top: 20px;
}
</style>