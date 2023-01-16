<template>
  <div class="red">Axios Demo</div>
  <div>
    <h1>HTTP请求</h1>
    <button @click="httpGet">get请求</button>
    <button @click="httpPost">post请求</button>
    <VueJsonPretty
      :data="message"
      :show-length="true"
      :show-line="true"
      :show-icon="true"
    >
    </VueJsonPretty>
  </div>
</template>
<script setup>
import { defineComponent, reactive, ref } from "vue";
import http from "@/utils/http/index";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

let message = ref({});

const httpGet = () => {
  http
    .get("https://httpbin.org/get")
    .then((response) => {
      message.value = JSON.parse(JSON.stringify(response));
      console.log(message);
    })
    .catch((error) => {
      alert(error);
    });
};

const httpPost = () => {
  http
    .post("https://httpbin.org/post")
    .then((response) => {
      message.value = response;
    })
    .catch((error) => {
      alert(error);
    });
};
</script>
<style scoped>
</style>