<script setup>
import EditorJS from "@editorjs/editorjs";
import Header from "@/components/editor/heading";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import inlineCode from "@editorjs/inline-code";
import embed from "@editorjs/embed";
import quote from "@editorjs/quote";
import marker from "@editorjs/marker";
import code from "@editorjs/code";
import link from "@editorjs/link";
import delimiter from "@editorjs/delimiter";
import raw from "@editorjs/raw";
import table from "@editorjs/table";
import warning from "@editorjs/warning";
import paragraph from "@editorjs/paragraph";
import checklist from "@editorjs/checklist";
import AttachesTool from "@editorjs/attaches";
//
import { apiUpload, apiOuterDownloadUrl } from "@/api/material/materialApi";
import { apiAdd } from "@/api/document/articleApi";
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
const data = reactive({
  readOnly: false,
  state: "",
  title: "",
  content: {},
});
const doPreview = () => {
  editor.readOnly = true;
};
const doSave = () => {
  editor.save().then((savedData) => {
    data.content = savedData;
    apiAdd({
      title: data.title,
      content: JSON.stringify(data.content),
    })
      .then((res) => {
        if (res.success) {
          ElMessage.success({
            message:
              "新增文章成功, 三秒后自动关闭当前窗口，如果没有关闭，请手动关闭.",
          });
          setTimeout(() => {
            window.close();
          }, 3000);
        } else {
          ElMessage.error(res.message);
        }
      })
      .catch((err) => {
        ElMessage.error("服务器繁忙，请稍后再试");
      });
  });
};
const editor = new EditorJS({
  holder: "editorjs",
  data: {},
  placeholder: "请在这里开始输入你的正文...",
  tools: {
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        placeholder: "Enter a header",
      },
    },
    list: {
      class: List,
    },
    code: {
      class: code,
    },
    inlineCode: {
      class: inlineCode,
    },
    embed: {
      class: embed,
    },
    link: {
      class: link,
      inlineToolbar: true,
    },
    marker: {
      inlineToolbar: true,
      class: marker,
    },
    table: {
      class: table,
    },
    raw: {
      class: raw,
    },
    delimiter: {
      inlineToolbar: true,
      class: delimiter,
    },
    quote: {
      inlineToolbar: true,
      class: quote,
    },
    image: {
      class: ImageTool,
      config: {
        uploader: {
          uploadByFile(file) {
            return apiUpload(file).then((response) => {
              console.log(response);
              if (response.success) {
                return {
                  success: 1,
                  file: {
                    url: apiOuterDownloadUrl(response.data.id),
                    name: response.data.fileName,
                    size: response.data.size,
                    title: response.data.fileName,
                  },
                };
              } else {
                return {
                  success: 0,
                };
              }
            });
          },
        },
      },
    },
    warning: {
      class: warning,
    },
    paragraph: {
      class: paragraph,
    },
    checklist: {
      class: checklist,
    },
    attaches: {
      class: AttachesTool,
      config: {
        // endpoint: apiUploadUrl(),
        buttonText: "选择上传文件",
        errorMessage: "文件上传失败",
        additionalRequestHeaders: {
          Authorization: localStorage.getItem("token"),
        },
        uploader: {
          uploadByFile(file) {
            return apiUpload(file).then((response) => {
              console.log(response);
              if (response.success) {
                return {
                  success: 1,
                  file: {
                    url: apiOuterDownloadUrl(response.data.id),
                    name: response.data.fileName,
                    size: response.data.size,
                    title: response.data.fileName,
                  },
                };
              } else {
                return {
                  success: 0,
                };
              }
            });
          },
        },
      },
    },
  },
  onReady: () => {
    console.log("Editor.js is ready to work!");
  },
  // onChange: (api, event) => {
  //   doSave();
  // },
});
onMounted(() => {});
</script>

<template>
  <el-row style="padding: 0px 20px">
    <el-col :span="12" class="col">
      <el-input v-model="data.title" placeholder="请在这里输入文章标题" />
    </el-col>
    <el-col :span="6"></el-col>
    <el-col :span="6" align="right" class="col">
      <el-button type="primary" @click="doPreview"> 预览 </el-button>
      <!-- <el-button type="primary"> 存草稿 </el-button> -->
      <el-button type="danger" @click="doSave"> 提交审核 </el-button>
    </el-col>
  </el-row>
  <el-divider border-style="dashed" style="margin: 5px 0px" />
  <div id="editorjs"></div>
</template>

<style scoped>
.col {
  height: 44px;
  line-height: 44px;
}
</style>