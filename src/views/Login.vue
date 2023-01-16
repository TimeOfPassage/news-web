<script setup>
import { ref, reactive, onMounted } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { login } from "@/api/user/user";
import { ElMessage } from "element-plus";
const { form } = reactive({
  form: {
    username: "",
    password: "",
  },
});
const router = useRouter();
const onSubmit = () => {
  login({
    phone: form.username,
    password: form.password,
  })
    .then((res) => {
      console.log(res);
      if (res.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        router.push("/");
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((error) => {
      console.error(error);
      ElMessage.error("服务繁忙，请稍后再试");
    });
};
</script>

<template>
  <div class="login-bg">
    <div class="login-title">MIZAR</div>
    <div class="login-div">
      <div class="login-form">
        <el-form :model="form" label-width="0px">
          <el-form-item>
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              size="large"
              :prefix-icon="User"
              input-style="font-weight: 700;"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
              :prefix-icon="Lock"
              size="large"
              input-style="font-weight: 700;"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%"
              type="primary"
              size="large"
              @click="onSubmit"
              >登陆</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top left,
    rgba(0, 160, 160, 0.6),
    rgba(0, 0, 160, 0.7),
    rgba(110, 0, 160, 0.6)
  );
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-title {
  width: 400px;
  height: 100px;
  text-align: center;
  font-size: 34px;
  font-weight: 700;
  color: white;
  line-height: 100px;
}
.login-div {
  width: 400px;
  height: 240px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.login-form {
  padding: 0px 38px;
  padding-top: 16px;
}
</style>