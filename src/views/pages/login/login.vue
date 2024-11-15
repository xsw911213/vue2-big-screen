<style lang="scss">
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  // background: linear-gradient(-190deg, rgb(30, 34, 105) 65%, #e884a1);

  #iframe{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .login-box{
    position: absolute;
    width: 450px;
    top: 50%;
    left: 50%;
    // height: 300px;
    background-color: #fff;
    transform: translate(-50%,-55%);

    .ant-card-head-title{
      padding: 15px 0;
    }

    .ant-card-body{
      padding: 20px;
    }
  }
}
</style>

<template>
  <div class="login">
    <iframe ref="iframe" src="https://wellwell.wang/canvas_galaxy/" id="iframe" frameborder="0"></iframe>
    <a-card v-show="boxShow" title="登录" class="login-box">
      <a-form :form="form">
         <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="用户名" >
          <a-input v-decorator="[ 'username', {rules: [{ required: true, message: '用户名不能为空' }]} ]" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="密码" >
          <a-input v-decorator="[ 'nickname', {rules: [{ required: true, message: '密码不能为空' }]} ]" placeholder="请输入密码" type="password"/>
        </a-form-item>
        <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol" style="margin-bottom:5px;">
          <a-checkbox :checked="rememberPassword" @change="handleChange" >
            记住密码
          </a-checkbox>
        </a-form-item>
        <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol" style="margin-bottom:5px;">
          <a-button type="primary" @click="submit" block>
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18, offset: 4 }
}

export default {
  name: 'login',
  data () {
    return {
      boxShow: false,
      rememberPassword: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleChange (e) {
      this.rememberPassword = e.target.checked
    },
    submit () {
      this.form.validateFields((err) => {
        if (!err) {
          console.info('success')
          this.$router.push({ name: 'list' })
        }
      })
    }
  },
  mounted () {
    this.$refs.iframe.onload = () => {
      this.boxShow = true
    }
  }
}
</script>
