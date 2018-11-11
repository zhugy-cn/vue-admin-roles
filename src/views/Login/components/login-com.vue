<template>
  <div>
    <div class="login-title">智售客总后台</div>
    <el-form class="form-con" :model="formData" size="small" :rules="rules" ref="ruleForm">
      <el-form-item prop="phone">
        <el-input maxlength="11" v-model="formData.phone" clearable placeholder="请输入手机号">
          <template slot="prepend">
            <i class="el-icon-z-mobile"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input maxlength="20" v-model="formData.password" clearable placeholder="请输入密码" type="password">
          <template slot="prepend">
            <i class="el-icon-z-lock"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" @click="login" style="width: 100%" type="primary">登录</el-button>
      </el-form-item>
      <div class="reset-password" @click="changeCurrentCom('ResetPassCom')">忘记密码</div>
    </el-form>
  </div>
</template>
<script>
import { getToken_api } from '_api/login';
import { mapActions } from 'vuex';
import mixin from './mixin';
export default {
  name: 'loginCom',
  props: ['currentCom'],
  mixins: [mixin],
  data() {
    let checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        const phoneReg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
        if (!phoneReg.test(value)) {
          callback(new Error('手机号格式不正确'));
          return false;
        }
        callback();
      }
    };
    return {
      formData: {},
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          { validator: checkPhone, trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions('user', ['loginAct']),
    login() {
      this.$refs['ruleForm'].validate(async valid => {
        if (valid) {
          this.$global.openLoading('登录中...');
          let { token } = await getToken_api(this.formData);
          await this.loginAct(token);
          // await this.getUserInfoAct(token);
          this.$router.push('/');
          this.$global.closeLoading();
        }
      });
    },
    watchChanged() {
      const { password, phone } = this.userInput;
      this.formData = {
        password,
        phone
      };
    }
  }
};
</script>